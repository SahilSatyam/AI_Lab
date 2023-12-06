import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AppLevelTrend from './AppLevelTrend'; // Import your component

test('handleAppLevelClick receives filteredData correctly', async () => {
  // Mocking the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rows: [], columns: [] }),
    })
  );

  // Mocking the navigate function from your routing library (e.g., React Router)
  const mockNavigate = jest.fn();

  // Mocking the filteredData
  const filteredData = [{ APPL_SYS_ID: 'some_id' }];

  // Spy on the handleAppLevelClick function
  const spyHandleAppLevelClick = jest.spyOn(AppLevelTrend.prototype, 'handleAppLevelClick');

  // Rendering your component with the necessary context
  render(
    <BrowserRouter>
      <AppLevelTrend filteredData={filteredData} navigate={mockNavigate} />
    </BrowserRouter>
  );

  // Triggering the function that should be tested
  userEvent.click(/* some element that triggers handleAppLevelClick */);

  // Asserting that the handleAppLevelClick function was called with the correct arguments
  expect(spyHandleAppLevelClick).toHaveBeenCalledWith(filteredData);
});
