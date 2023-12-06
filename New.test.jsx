// Test navigation when a DataTable row is clicked
it("navigates to the DB level trend dashboard when a DataTable row is clicked", async () => {
  const navigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

  // Mock the fetch call to return some data
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: () => Promise.resolve({
      columns: ['APPL_SYS_ID', 'APPL_SYS_NM', 'LGL_HLD_STS'],
      rows: [
        ['123', 'Test Application', 'No'],
      ],
    }),
  });

  const { obj } = render(
    <BrowserRouter>
      <AppLevelTrend />
    </BrowserRouter>
  );

  // Wait for the data to be displayed
  await waitFor(() => expect(screen.getByTestId("mds-datatable")).toBeInTheDocument());

  // Simulate clicking on the first row of the DataTable
  fireEvent.click(screen.getByText('Test Application'));

  // Assert that navigation was called with the correct path
  expect(navigate).toHaveBeenCalledWith("/db-level-trend-dashboard", expect.anything());

  jest.restoreAllMocks();
});

// Test state changes for the search by application ID
it("updates state on appID search", async () => {
  const { obj } = render(
    <BrowserRouter>
      <AppLevelTrend />
    </BrowserRouter>
  );

  const appIDQuery = screen.getByPlaceholderText("Search By Application ID");
  fireEvent.change(appIDQuery, { target: { value: "12345" } });

  // Assert that the appIDQuery state has been updated
  expect(appIDQuery.value).toBe("12345");
});

// Test state changes for the search by application name
it("updates state on appName search", async () => {
  const { obj } = render(
    <BrowserRouter>
      <AppLevelTrend />
    </BrowserRouter>
  );

  const appNameQuery = screen.getByPlaceholderText("Search By Application Name");
  fireEvent.change(appNameQuery, { target: { value: "app_name" } });

  // Assert that the appNameQuery state has been updated
  expect(appNameQuery.value).toBe("app_name");
});

// Test state changes for the legal hold filter toggle
it("toggles legal hold filter state", async () => {
  const { obj } = render(
    <BrowserRouter>
      <AppLevelTrend />
    </BrowserRouter>
  );

  const legalHoldFilterSwitch = screen.getByTestId("mds-switch");
  fireEvent.click(legalHoldFilterSwitch);

  // Assert that the legalHoldFilter state has been toggled
  // Note: You will need to check how the state is updated in your component when the switch is toggled
  // and assert the expected state change here.
});
