import React, { useState, useEffect } from 'react';
import { Table, Header, Segment, Button, Loader, Image } from 'semantic-ui-react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CatDetails from './CatDetails';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/`);
                const data = await response.json();
                setCats(data.cats);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Router>
            <div className="App" style={{ padding: '20px', background: '#1b1c1d', minHeight: '100vh' }}>
                {loading ? (
                    <>
                        <Segment inverted>
                            <Header as="h1" inverted>Cats Table</Header>
                        </Segment>
                        <Loader active inline="centered" size="large" inverted>
                            Loading...
                        </Loader>
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Segment inverted>
                                    <Header as="h1" inverted>Cats Table</Header>
                                </Segment>
                                <Table inverted celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell textAlign="center">Thumbnail</Table.HeaderCell>
                                            <Table.HeaderCell>Name</Table.HeaderCell>
                                            <Table.HeaderCell>Status</Table.HeaderCell>
                                            <Table.HeaderCell>Details</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {cats.map((cat, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell textAlign="center">
                                                    <Image src={`https://placekitten.com/50/50?image=${index + 1}`} avatar centered />
                                                </Table.Cell>
                                                <Table.Cell>{cat.name}</Table.Cell>
                                                <Table.Cell>{cat.status}</Table.Cell>
                                                <Table.Cell>
                                                    <Link to={`/details/${cat.id}`}>
                                                        <Button primary>Details</Button>
                                                    </Link>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </>
                        } />
                        <Route path="/details/:id" element={<CatDetails />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
