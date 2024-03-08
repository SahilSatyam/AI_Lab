from jira import JIRA

# Connect to Jira
jira = JIRA(basic_auth=("your_username", "your_api_token"), server="your_jira_server")

# Get user groups
user = jira.user.get_myself()
user_groups = user.groups

# Check project permissions for relevant groups
project_key = "YOUR_PROJECT_KEY"
project = jira.project(project_key)

for group in user_groups:
    # Iterate through project permissions for each group
    permissions = project.permissions[group.name]
    if "CREATE_ISSUE" in permissions:
        print(f"Your group '{group.name}' has permission to create issues in project '{project_key}'.")
        break  # Stop iterating if permission found

# Handle no permission found scenario
else:
    print(f"Checked groups: {', '.join([g.name for g in user_groups])}. No 'CREATE_ISSUE' permission found.")
