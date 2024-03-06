curl \
  -X POST \
  -H "Authorization: Basic $(echo username:api_token | base64)" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "project": {
        "key": "YOUR_PROJECT_KEY"
      },
      "issuetype": {
        "name": "YOUR_ISSUE_TYPE"
      },
      "summary": "YOUR_SUMMARY",
      "description": "YOUR_DESCRIPTION" (optional)
    }
  }' \
  "https://your_jira_server/rest/api/2/issue"
