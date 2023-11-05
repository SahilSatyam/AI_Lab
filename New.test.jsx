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








import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import AppLevelTrend from './AppLevelTrend';

describe('AppLevelTrend', () => {

  it('renders page heading', () => {
    render(<AppLevelTrend />);
    expect(screen.getByTestId('page-heading')).toHaveTextContent('DB Growth Trend Report (Application Level)');
  });

  it('renders spinner on initial load', () => {
    render(<AppLevelTrend />);
    expect(screen.getByTestId('mds-progress-spinner')).toBeInTheDocument();
  });

  it('fetches and displays data on load', async () => {
    render(<AppLevelTrend />);

    await waitFor(() => expect(screen.queryByTestId('mds-progress-spinner')).not.toBeInTheDocument());
    
    expect(screen.getByTestId('mds-datatable')).toBeInTheDocument();
    expect(screen.queryByText('No Data Found')).not.toBeInTheDocument();
  });

  it('filters data based on search queries', async () => {
    // mock API response
    const mockData = [{
      APPL_SYS_ID: '123', 
      APPL_SYS_NM: 'App 1'
    }];
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        rows: mockData,
        columns: Object.keys(mockData[0])
      })
    });

    render(<AppLevelTrend />);

    await waitFor(() => expect(screen.queryByTestId('mds-progress-spinner')).not.toBeInTheDocument());

    // type search queries
    userEvent.type(screen.getByPlaceholderText('Search By Application ID'), '123');
    userEvent.type(screen.getByPlaceholderText('Search By Application Name'), 'App 1');

    // expect filtered row to show
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('App 1')).toBeInTheDocument();

    // clear filters
    userEvent.click(screen.getByText('X')); 
    userEvent.click(screen.getAllByText('X')[1]);

    // expect full data to show again
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('App 1')).toBeInTheDocument();
  });

  it('renders null state when no data matches filters', async () => {
    // mock API response
    const mockData = [{
      APPL_SYS_ID: '123', 
      APPL_SYS_NM: 'App 1'
    }];
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        rows: mockData,
        columns: Object.keys(mockData[0])  
      })
    });

    render(<AppLevelTrend />);

    await waitFor(() => expect(screen.queryByTestId('mds-progress-spinner')).not.toBeInTheDocument());

    // filter with non-matching search query
    userEvent.type(screen.getByPlaceholderText('Search By Application ID'), '456');

    expect(screen.queryByText('No Data Found')).toBeInTheDocument();
  });

  it('toggles legal hold filter', async () => {
    // mock API response
    const mockData = [{
      APPL_SYS_ID: '123', 
      APPL_SYS_NM: 'App 1',
      LGL_HLD_STS: 'Yes'
    }];
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        rows: mockData,
        columns: Object.keys(mockData[0])
      })  
    });

    render(<AppLevelTrend />);

    await waitFor(() => expect(screen.queryByTestId('mds-progress-spinner')).not.toBeInTheDocument());

    // toggle legal hold filter on
    userEvent.click(screen.getByTestId('mds-switch'));

    // expect legal hold data to show
    expect(screen.getByText('Yes')).toBeInTheDocument();

    // toggle legal hold filter off
    userEvent.click(screen.getByTestId('mds-switch'));

    // expect full data to show again
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('navigates to DB level page on row click', async () => {
    // mock API response
    const mockData = [{
      APPL_SYS_ID: '123',
    }];

    const mockDbData = [{
      DB_NM: 'Db 1'  
    }];
    
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          rows: mockData,
          columns: Object.keys(mockData[0])
        })
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          rows: mockDbData,  
          columns: Object.keys(mockDbData[0])
        })
      });

    const {history} = render(<AppLevelTrend />);

    await waitFor(() => expect(screen.queryByTestId('mds-progress-spinner')).not.toBeInTheDocument());

    // click row
    userEvent.click(screen.getByText('123'));

    // expect navigation to db page with data
    expect(history.location.pathname).toBe('/db-level-trend-dashboard');
    expect(history.location.state).toEqual(mockDbData);
  });

});
