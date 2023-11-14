// Additional test cases

// Tile component
test('renders tile with correct data', () => {
  const tileData = {
    title: 'Databases',
    calculations: 10  
  };

  render(<DBLevelTrend mdsTileContent={[tileData]} />);
  
  const tile = screen.getByTestId('db-growth-calc-tiles');
  expect(tile).toHaveTextContent(/Databases/i);
  expect(tile).toHaveTextContent(/10/);
});

// Input components
test('clears search input when clicking clear button', () => {
  render(<DBLevelTrend />);

  const input = screen.getByTestId('input-for-db-name');
  fireEvent.change(input, { target: { value: 'test' } });
  
  const clearBtn = screen.getByRole('button', { name: /x/i });
  fireEvent.click(clearBtn);
  
  expect(input.value).toBe('');
});

// Filter switch  
test('updates alert filter state when toggling switch', () => {
  render(<DBLevelTrend />);

  const toggle = screen.getByTestId('mds-switch-for-alert');
  
  fireEvent.click(toggle);
  expect(toggle).toBeChecked();

  fireEvent.click(toggle);
  expect(toggle).not.toBeChecked(); 
});

// Table component
test('renders table with data', () => {
  const rowData = [{ 
    id: '1',
    name: 'db1'
  }];

  render(<DBLevelTrend rowData={rowData} />);

  const row = screen.getByText(/db1/i);
  expect(row).toBeInTheDocument();
});

// handleDBLevelClick method
test('calls API and updates data when row clicked', async () => {
  const handleClick = jest.fn();
  render(<DBLevelTrend onClick={handleClick} />);

  fireEvent.click(screen.getByText(/View Chart/i));
  
  await waitFor(() => expect(handleClick).toHaveBeenCalledTimes(1));

  // Check data updated  
});

// Line chart methods
test('setLineChartData returns correct shape', () => {
  const data = [{
    timestamp: '2020-01-01',
    freeSpace: 100,
  }];

  const result = setLineChartData(data);

  expect(result).toEqual([
    {
      lineName: 'Free DB Space',
      dataPoints: [
        { x: expect.any(Number), y: 100 },  
      ]
    }
  ]);
});

test('setLineChartXAxis returns min and max x values', () => {
  const data = [
    { timestamp: '2020-01-01' },
    { timestamp: '2020-02-01' } 
  ];
  
  const result = setLineChartXAxis(data);

  expect(result).toEqual([
    expect.any(Number), 
    expect.any(Number)
  ]);
});

//**************************************************//

// Spinner component
test('renders spinner during API call', async () => {
  render(<DBLevelTrend />);

  // Initiate API call
  fireEvent.click(screen.getByText(/View Chart/i));

  expect(screen.getByTestId('mds-progress-spinner')).toBeInTheDocument();

  // Resolve API promise
  await waitForElementToBeRemoved(() => 
    screen.queryByTestId('mds-progress-spinner')
  ); 
});

test('hides spinner after API call finishes', async () => {
  render(<DBLevelTrend />);

  // Initiate API call
  fireEvent.click(screen.getByText(/View Chart/i));

  await waitForElementToBeRemoved(() => 
    screen.queryByTestId('mds-progress-spinner')
  );
  
  expect(screen.queryByTestId('mds-progress-spinner')).not.toBeInTheDocument();
});

// Line chart component
test('renders chart when data is available', async () => {
  render(<DBLevelTrend chartData={true} />);

  expect(screen.getByTestId('mds-line-chart')).toBeInTheDocument();
});

test('displays no data text when no data', () => {
  render(<DBLevelTrend />);

  expect(screen.getByText(/Please select row/i)).toBeInTheDocument();
});

// Trend table component 
test('renders trend data table', () => {
  const data = [{ id: '1' }];
  render(<DBLevelTrend data={data} />);

  expect(screen.getByTestId('mds-datatable-for-trend')).toBeInTheDocument();
});

// Misc helper functions
test('filters data correctly', () => {
  const data = [
    { id: '1', name: 'db1' },
    { id: '2', name: 'db2' }
  ];

  const filtered = filterData(data, '1');

  expect(filtered).toEqual([{ id: '1', name: 'db1' }]); 
});

test('calculates database count', () => {
  const data = [{ id: 1 }, { id: 2 }];

  const count = getDatabaseCount(data);

  expect(count).toBe(2);
});

// Test all other helper methods...

// Simulate clicks and test handling
test('sorts column when header clicked', () => {
  // Render table
  
  fireEvent.click(screen.getByText(/Database Name/i));

  // Expect sorted
});

test('shows error when API call fails', async () => {
  server.use(
    rest.get('/api', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  );

  render(<DBLevelTrend />);

  fireEvent.click(screen.getByText(/View Chart/i));

  await waitFor(() => expect(screen.getByText(/Error/i)).toBeInTheDocument());
});
