import requests
from requests.auth import HTTPBasicAuth

# Set up the authentication credentials
username = 'your_jira_username'
password = 'your_jira_password'
jira_url = 'https://your_jira_instance.com'

# Set up the headers and authentication
headers = {
    'Content-Type': 'application/json'
}
auth = HTTPBasicAuth(username, password)

# Define the issue details
issue_data = {
    'fields': {
        'project': {
            'key': 'PROJECT_KEY'  # Replace with your project key
        },
        'summary': 'New Issue Summary',
        'description': 'This is a new issue created via Python',
        'issuetype': {
            'name': 'Bug'  # Replace with the desired issue type
        }
    }
}

# Send the POST request to create the issue
create_issue_url = f'{jira_url}/rest/api/2/issue'
response = requests.post(create_issue_url, json=issue_data, headers=headers, auth=auth)

# Check the response status code
if response.status_code == 201:
    issue_key = response.json()['key']
    print(f'New issue created: {issue_key}')
else:
    print(f'Failed to create issue. Status code: {response.status_code}')
    print(response.text)
