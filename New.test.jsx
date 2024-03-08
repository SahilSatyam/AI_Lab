def create_jira():

    jira_url = "https://jiradc-ccb-cluster02.prod.aws.jpmchase.net"
    try:
        jira_api_token = 'UjczMjEzMjptby1hcGktblJuUFUzNTQ2U1I3OXdMR1FRUXJSaTBn'
        logging.basicConfig(level=logging.DEBUG)
        jira  = Jira(jira_url, token=f"Bearer {jira_api_token}")
        print(jira.api_version)
        return 'Jira connected successfully', 200
    except Exception as e:
        current_app.logger.error("Error while connecting to jira: {0}".format(str(e)))
        traceback.print_exc()
        return "Failed to connect to Jira", 400
