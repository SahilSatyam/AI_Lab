import pandas as pd

def compare_db_mem_used(data1, data2):
    # Define column names
    columns = ["RPT_EXEC_ID", "APPL_SYS_ID", "DB_SRVR_ID", "DB_SRVR_NM", "DB_MEM_SZ", "DB_MEM_FREE", "DB_MEM_USED"]

    # Create dataframes
    df1 = pd.DataFrame(data1, columns=columns)
    df2 = pd.DataFrame(data2, columns=columns)

    # Merge the dataframes on common columns
    merged_df = pd.concat([df1, df2], ignore_index=True)

    # Group by APPL_SYS_ID and DB_SRVR_ID
    grouped_df = merged_df.groupby(["APPL_SYS_ID", "DB_SRVR_ID"])

    # Function to compare DB_MEM_USED
    def compare_memory(group):
        # Find the row with the minimum RPT_EXEC_ID
        earliest_row = group.loc[group['RPT_EXEC_ID'].idxmin()]

        # Get the earliest DB_MEM_USED value
        earliest_db_mem_used = earliest_row['DB_MEM_USED']

        # Compare with every other DB_MEM_USED in the group
        comparison_result = 'Yes' if any(group['DB_MEM_USED'] < earliest_db_mem_used) else 'No'

        return pd.Series({'earliest_db_mem_used': earliest_db_mem_used, 'comparison_result': comparison_result})

    # Apply the comparison function to each group
    result_df = grouped_df.apply(compare_memory).reset_index()

    return result_df

# Example usage
data1 = [
    # ... your data ...
]

data2 = [
    # ... your data ...
]

result_dataframe = compare_db_mem_used(data1, data2)
print(result_dataframe)



***************************************************************************************************************************************************************************

import pandas as pd

def compare_db_mem_used_with_flag(data1, data2):
    # Define column names
    columns = ["RPT_EXEC_ID", "APPL_SYS_ID", "DB_SRVR_ID", "DB_SRVR_NM", "DB_MEM_SZ", "DB_MEM_FREE", "DB_MEM_USED"]

    # Create dataframes
    df1 = pd.DataFrame(data1, columns=columns)
    df2 = pd.DataFrame(data2, columns=columns)

    # Merge the dataframes on common columns
    merged_df = pd.concat([df1, df2], ignore_index=True)

    # Group by APPL_SYS_ID and DB_SRVR_ID
    grouped_df = merged_df.groupby(["APPL_SYS_ID", "DB_SRVR_ID"])

    # Function to compare DB_MEM_USED and add a new column DB_LVL_FLAG
    def compare_memory(group):
        # Find the row with the minimum RPT_EXEC_ID
        earliest_row = group.loc[group['RPT_EXEC_ID'].idxmin()]

        # Get the earliest DB_MEM_USED value
        earliest_db_mem_used = earliest_row['DB_MEM_USED']

        # Compare with every other DB_MEM_USED in the group
        group['DB_LVL_FLAG'] = 'Yes' if any(group['DB_MEM_USED'] < earliest_db_mem_used) else 'No'

        return group

    # Apply the comparison function to each group and reset the index
    result_df = grouped_df.apply(compare_memory).reset_index(drop=True)

    return result_df

# Example usage
data1 = [
    # ... your data ...
]

data2 = [
    # ... your data ...
]

result_dataframe = compare_db_mem_used_with_flag(data1, data2)
print(result_dataframe)


***********************************************************************************************************************************************************************************************************
