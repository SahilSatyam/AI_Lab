import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import DBLevelTrend from './DBLevelTrend'; // Import your component

describe('DBLevelTrend Component', () => {
  it('renders without crashing', () => {
    render(<DBLevelTrend />);
  });

  it('initially shows a loading spinner', () => {
    const { getByTestId } = render(<DBLevelTrend />);
    const spinner = getByTestId('mds-progress-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('fetches data and displays it when data is loaded', async () => {
    // Mock fetch requests to return sample data
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ rows: [], columns: [] }),
    });

    const { getByTestId } = render(<DBLevelTrend />);
    
    // Simulate data fetch
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Verify that the loading spinner disappears
    const spinner = getByTestId('mds-progress-spinner');
    expect(spinner).not.toBeInTheDocument();

    // Add more assertions here to validate the rendered data.
  });

  it('handles filtering correctly', () => {
    // Render the component
    const { getByTestId, getByText } = render(<DBLevelTrend />);

    // Simulate user input for filtering
    const inputDbId = getByTestId('input-for-db-id');
    fireEvent.change(inputDbId, { target: { value: 'filterValue' } });

    // Verify that the input value has changed
    expect(inputDbId).toHaveValue('filterValue');

    // You can add more filtering test cases for other inputs
  });

  it('handles chart click', async () => {
    // Mock fetch request for the chart data
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ rows: [], columns: [] }),
    });

    const { getByTestId, getByText } = render(<DBLevelTrend />);

    // Simulate a user click on the chart button
    fireEvent.click(getByTestId('mds-table-for-db-details').querySelector('.button'));

    // Verify that the loading spinner appears
    const spinner = getByTestId('mds-progress-spinner');
    expect(spinner).toBeInTheDocument();

    // Simulate data fetch
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Verify that the loading spinner disappears
    expect(spinner).not.toBeInTheDocument();

    // Add more assertions to validate the chart data rendering.
  });

  // You can add more test cases for different parts of your component as needed.
});
