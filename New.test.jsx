import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import DBLevelTrend from './DBLevelTrend';

describe('DBLevelTrend Component', () => {
  it('should render the component', () => {
    const { getByTestId } = render(<DBLevelTrend />);
    const dbPage = getByTestId('db-page');
    expect(dbPage).toBeInTheDocument();
  });

  it('should fetch and display data', async () => {
    // Mock the fetch function and response data
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });

    const { getByTestId, queryByText } = render(<DBLevelTrend />);
    await waitFor(() => {
      expect(queryByText('No Data Found')).toBeNull();
    });
  });

  it('should handle filtering based on input values', async () => {
    const { getByPlaceholderText, queryByText } = render(<DBLevelTrend />);
    const dbIDInput = getByPlaceholderText('Search By Databse ID');
    const dbNameInput = getByPlaceholderText('Search By Database Name');

    fireEvent.change(dbIDInput, { target: { value: '123' } });
    fireEvent.change(dbNameInput, { target: { value: 'DB' } });

    await waitFor(() => {
      // Assert the filtered data is displayed correctly
      expect(queryByText('Filtered Data')).toBeInTheDocument();
    });
  });

  it('should show chart on "View Chart" click', async () => {
    // Mock the fetch function and response data
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ rows: [], columns: [] }),
    });

    const { getByText, getByTestId } = render(<DBLevelTrend />);
    const viewChartButton = getByText('View Chart');

    fireEvent.click(viewChartButton);

    await waitFor(() => {
      const lineChart = getByTestId('mds-line-chart');
      expect(lineChart).toBeInTheDocument();
    });
  });

  it('should show spinner during data fetching', async () => {
    global.fetch = jest.fn().mockResolvedValue(new Promise(() => {}));
    const { getByTestId } = render(<DBLevelTrend />);
    await waitFor(() => {
      const spinner = getByTestId('mds-progress-spinner');
      expect(spinner).toBeInTheDocument();
    });
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<DBLevelTrend />);
    expect(asFragment()).toMatchSnapshot();
  });
});
