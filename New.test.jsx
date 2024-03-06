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
