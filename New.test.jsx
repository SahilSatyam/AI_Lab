import logging
from jira import JIRA
from flask import current_app
import traceback

def create_jira_issue():
    jira_url = "https://jiradc-ccb-cluster02.prod.aws.jpmchase.net"
    
    try:
        # Use the Jira API token as the Bearer Token
        jira_api_token = 'UjczMjEzMjptby1hcGktblJuUFUzNTQ2U1I3OXdMR1FRUXJSaTBn'

        # Enable detailed logging
        logging.basicConfig(level=logging.DEBUG)

        # Initialize Jira connection with Bearer Token
        jira = JIRA(server=jira_url, options={'server': 'https://jiradc-ccb-cluster02.prod.aws.jpmchase.net', 'headers': {'Authorization': f'Bearer {jira_api_token}'}})
        
        # Print Jira API version as a confirmation of successful connection
        print(jira.server_info())

        # Project key and issue type
        project_key = 'YOUR_PROJECT_KEY'
        issue_type = 'Task'  # Change this to the appropriate issue type

        # Issue details
        summary = 'New Issue Created'
        description = 'This is a new issue created via Python script'
        assignee = 'your-username'  # Replace with the Jira username to assign the issue

        # Create a new issue
        new_issue = jira.create_issue(
            project=project_key,
            summary=summary,
            description=description,
            issuetype={'name': issue_type}
        )

        # Assign the issue to a user
        jira.assign_issue(issue=new_issue, assignee=assignee)

        # Print information about the created issue
        print(f'New issue created and assigned to {assignee} - {jira_url}/browse/{new_issue.key}')

        return 'Jira issue created successfully', 200

    except Exception as e:
        current_app.logger.error("Error while connecting to Jira or creating issue: {0}".format(str(e)))
        traceback.print_exc()
        return "Failed to create Jira issue", 400

