issue_fields = {
    "project": {"key": "YOUR_PROJECT_KEY"},
    "summary": "New issue summary",
    "description": "This is a new issue description",
    "issuetype": {"name": "Task"}
}

# Create the new issue
new_issue = jira.create_issue(fields=issue_fields)
