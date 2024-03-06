import requests

# Jira details
jira_url = "https://your-jira-instance-url"
project_key = "PROJECTKEY"
api_token = "YOUR-JIRA-API-TOKEN"

# Function to create a Jira issue
def create_jira_issue(summary, description, issue_type="Story"):
    endpoint = f"{jira_url}/rest/api/2/issue/"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Basic {api_token}",
    }

    data = {
        "fields": {
            "project": {"key": project_key},
            "summary": summary,
            "description": description,
            "issuetype": {"name": issue_type},
        }
    }

    response = requests.post(endpoint, json=data, headers=headers)

    if response.status_code == 201:
        print(f"Jira issue created successfully. Issue Key: {response.json()['key']}")
    else:
        print(f"Failed to create Jira issue. Status Code: {response.status_code}")
        print(response.json())

# Example usage
if __name__ == "__main__":
    create_jira_issue("Automated Story", "This story was created using a Python script.")







&&&


import json
import requests

# Replace these values with your own Jira Bearer Token
jira_url = 'https://your-jira-instance.atlassian.net'
bearer_token = 'your-bearer-token'

# Define the issue details
issue_summary = 'My New Issue'
issue_description = 'This is a test issue created with Python.'
issue_project = 'Your Project Key'

# Define the file attachment details
file_name = 'your-file.txt'
file_content = 'This is a test file created with Python.'

# Create the Jira issue with Bearer Token authorization
headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {bearer_token}'
}

data = {
    'fields': {
        'summary': issue_summary,
        'description': issue_description,
        'project': {
            'key': issue_project
        }
    }
}

response = requests.post(f'{jira_url}/rest/api/2/issue', headers=headers, data=json.dumps(data))

# Get the newly created issue ID
issue_id = response.json()['id']

# Attach the file to the issue
file_data = {
    'file': (file_name, file_content.encode(), 'text/plain')
}

response = requests.post(f'{jira_url}/rest/api/2/issue/{issue_id}/attachment', headers=headers, files=file_data)

# Print the response
print(response.text)
