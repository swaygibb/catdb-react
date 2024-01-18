import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

global.fetch = require('jest-fetch-mock');

beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(
        JSON.stringify({
            cats: [
                { id: 1, name: 'Cat1', status: 'Available' },
                { id: 2, name: 'Cat2', status: 'Adopted' },
            ],
        })
    );
});

afterEach(() => {
    jest.clearAllMocks();
});

test('renders cats table with loading state and then displays cat data', async () => {
    render(<App />);

    expect(screen.getByText(/Cats Table/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Cat1/i)).toBeInTheDocument();
        expect(screen.getByText(/Cat2/i)).toBeInTheDocument();
    });
});

test('navigates to cat details page when "Details" button is clicked', async () => {
    render(<App />);

    await waitFor(() => screen.getByText(/Cat1/i));

    userEvent.click(screen.getAllByText(/Details/i)[0]);
});
