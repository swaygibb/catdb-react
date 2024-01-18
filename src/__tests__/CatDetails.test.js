import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CatDetails from '../CatDetails';

jest.mock('node-fetch');

test('renders cat details and navigates back to the list', async () => {
    const mockCatDetails = {
        id: '1',
        name: 'Cat1',
        status: 'Available',
    };

    global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve({ cat: mockCatDetails }),
    });

    render(
        <MemoryRouter initialEntries={['/details/1']}>
            <Routes>
                <Route path="/details/:id" element={<CatDetails />} />
            </Routes>
        </MemoryRouter>
    );

    // Loading state should be displayed initially
    expect(screen.getByText(/Cat Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // Wait for the API response and check if cat details are displayed
    await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Cat ID: 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Name: Cat1/i)).toBeInTheDocument();
        expect(screen.getByText(/Status: Available/i)).toBeInTheDocument();
    });

    // Click on the "Go Back to List" button
    userEvent.click(screen.getByText(/Go Back to List/i));
});
