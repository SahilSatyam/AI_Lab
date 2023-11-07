import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('should display data in DB Level Page', () => {
  const mockData = {
    // Your mock data here
  };

  // Render the AppLevelTrend within a MemoryRouter
  render(
    <MemoryRouter initialEntries={['/app-level-trend']}>
      <Routes>
        <Route path="/app-level-trend" element={<AppLevelTrend />} />
        <Route path="/db-level-trend-dashboard" element={<DBLevelTrend />} />
      </Routes>
    </MemoryRouter>
  );

  // Simulate the navigation to DB Level Page (e.g., by clicking a button)
  const moreDetailsButton = screen.getByText('DB Level Details');
  userEvent.click(moreDetailsButton);

  // Check if the data is displayed in the DBLevelTrend component
  const dataElement = screen.getByText('Your Data Label'); // Replace with a label or content specific to your data

  // Assert that the data is present in the DBLevelTrend component
  expect(dataElement).toBeInTheDocument();
});
