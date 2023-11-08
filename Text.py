import pandas as pd
import pytest
from your_module.report import post_generate_report  # Import your function from the module

# Sample data for testing
latest_ingestion_data = [
    # Your sample data here
]

class TestPostGenerateReport:

    def test_post_generate_report(self):
        # Create a mock database connection
        class MockDbConnection:
            def run_query(self, query, returns_value=True, fetch_one_flag=False):
                # Return mock data for the query
                mock_data = [
                    # Your mock data here
                ]
                return mock_data

        # Create an instance of the MockDbConnection
        mock_db_conn = MockDbConnection()

        # Call the function with the mock data
        result_df = post_generate_report(mock_db_conn, latest_ingestion_data)

        # Define your expected result
        expected_columns = [
            "APPL_SYS_ID", "APPL_SYS_NM", "APPL_SYS_STS_NM", "ACTL_OPER_DT", "PLN_RTR_DT", "ACTL_RTR_DT",
            "PLN_DCMSN_DT", "ACTL_DCMSN_DT", "APPL_OWNR_NM", "INFO_OWNR_NM", "APPL_TECH_GP_OWNR_NM",
            "LOB_FCTN_NM", "PROD_NM", "PROD_OWNR_NM", "LGL_HLD_STS", "DATA_RQR_DOC_STS_CD", "DB_SRVR_ID",
            "DB_SRVR_NM", "RDBMS_VEND", "CRE_DT", "DB_MEM_SZ", "DB_MEM_USED", "DB_MEM_FREE", "RTRV_CRE_TS",
            "LAST_UPDT_DT", "RPT_EXEC_ID", "CRE_TS", "DB_LVL_FALG", "APPL_LVL_FLAG"
        ]

        # Check if the result has the expected columns
        assert result_df.columns.tolist() == expected_columns

        # You can add more assertions to check specific data in the result_df

# Run the tests using pytest
if __name__ == "__main__":
    pytest.main()
