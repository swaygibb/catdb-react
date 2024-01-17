import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Loader } from 'semantic-ui-react';

function CatDetails() {
    const { id } = useParams();
    const [catDetails, setCatDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCatDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/cats/${id}`);
                const data = await response.json();
                setCatDetails(data.cat);
            } catch (error) {
                console.error('Error fetching cat details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCatDetails();
    }, [id]);

    return (
        <div style={{ color: 'white' }}>
            <h2>Cat Details</h2>
            {loading ? (
                <Loader active inline="centered" size="large">
                    Loading...
                </Loader>
            ) : (
                <>
                    <p>Cat ID: {id}</p>
                    {catDetails && (
                        <>
                            <p>Name: {catDetails.name}</p>
                            <p>Status: {catDetails.status}</p>
                            <div>
                                <img
                                    src={`https://placekitten.com/300/200?image=${id % 16 + 1}`}
                                    alt="Placeholder Kitten"
                                    style={{ marginTop: '10px', maxWidth: '100%' }}
                                />
                            </div>
                        </>
                    )}
                    <Button as="a" href="/" style={{ marginTop: '10px' }}>Go Back to List</Button>
                </>
            )}
        </div>
    );
}

export default CatDetails;
