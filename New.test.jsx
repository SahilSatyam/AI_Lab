// mock data 
const mockData = {
  rows: [
    {id: 1, name: 'App 1'},
  ],
  columns: ['id', 'name']
};

const mockNavigate = jest.fn(); 

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate 
}));

describe('handleAppLevelClick', () => {
  it('fetches db data and navigates on click', async () => {
    // mock fetch call
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });

    // call handleAppLevelClick
    const index = 0; 
    handleAppLevelClick(index + 1);

    // assert fetch called with correct params
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('?appl_sys_id=1')
    );

    // assert loading spinner 
    expect(setSpinnerOn).toHaveBeenCalledWith(true);

    // assert navigation after fetch resolves
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/db-level-trend-dashboard', {
        state: [
          {id: 1, name: 'App 1'} 
        ]  
      });
    });
    
    // assert spinner off
    expect(setSpinnerOn).toHaveBeenCalledWith(false);
  });

});
