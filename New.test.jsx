import { render } from '@testing-library/react';
import { exportToExcel } from './yourFile'; // Replace with path to your function

jest.mock('xlsx', () => ({
  // Mock XLSX functions for testing
  utils: {
    book_new: jest.fn(),
    json_to_sheet: jest.fn(),
    sheet_add_aoa: jest.fn(),
    sheet_add_json: jest.fn(),
    book_append_sheet: jest.fn(),
    writeFile: jest.fn(),
    rename_sheet_column: jest.fn(), // Not used in this example
  },
}));

describe('exportToExcel function', () => {
  it('should create and download an Excel file with custom headers and data', () => {
    const data = [
      { firstName: 'Jack', lastName: 'Sparrow', email: 'abc@example.com' },
      { firstName: 'Harry', lastName: 'Potter', email: 'abc@example.com' },
    ];
    const fileName = 'test_data.xlsx';
    const customHeaders = ['Full Name', 'Email Address'];

    render(() => exportToExcel(data, fileName, customHeaders));

    // Assertions
    expect(XLSX.utils.book_new).toHaveBeenCalledTimes(1);
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledTimes(1);
    expect(XLSX.utils.sheet_add_aoa).toHaveBeenCalledWith(
      expect.any(),
      [[...customHeaders]] // Match the exact header array
    );
    expect(XLSX.utils.sheet_add_json).toHaveBeenCalledWith(
      expect.any(),
      data,
      { origin: 'A2', skipHeader: true }
    );
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledTimes(1);
    expect(XLSX.writeFile).toHaveBeenCalledWith(expect.any(), fileName);
  });
});
