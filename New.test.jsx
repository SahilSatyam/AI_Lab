from atlassian import Jira

jira_url = "https://jiradc-ccb-cluster02.prod.aws.jpmchase.net"
jira_api_token = 'UjczMjEzMjptby1hcGktblJuUFUzNTQ2U1I3OXdMR1FRUXJSaTBn'

try:
    logging.basicConfig(level=logging.DEBUG)
    jira = Jira(jira_url, token=f"Bearer {jira_api_token}")
    print(f"Jira API version: {jira.api_version}")

    # Get project key or project ID
    project_key = "YOUR_PROJECT_KEY"
    # project_id = "YOUR_PROJECT_ID"

    # Retrieve issues for the project
    issues = jira.project_issues(project_key, expand='renderedFields')

    # Iterate over issues
    for issue in issues:
        print(f"Issue Key: {issue.key}, Summary: {issue.fields.summary}, Status: {issue.fields.status.name}")

    return 'Jira connected successfully', 200
except Exception as e:
    current_app.logger.error(f"Error while connecting to Jira: {str(e)}")
    traceback.print_exc()
    return "Failed to connect to Jira", 400
