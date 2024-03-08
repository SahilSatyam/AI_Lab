def create_issue(self, fields, update_history=False, update=None):
        """
        Creates an issue or a sub-task from a JSON representation
        :param fields: JSON data
                mandatory keys are issuetype, summary and project
        :param update: JSON data
                Use it to link issues or update worklog
        :param update_history: bool (if true then the user's project history is updated)
        :return:
            example:
                fields = dict(summary='Into The Night',
                              project = dict(key='APA'),
                              issuetype = dict(name='Story')
                              )
                update = dict(issuelinks={
                    "add": {
                        "type": {
                            "name": "Child-Issue"
                            },
                        "inwardIssue": {
                            "key": "ISSUE-KEY"
                            }
                        }
                    }
                )
                jira.create_issue(fields=fields, update=update)
        """
        url = self.resource_url("issue")
        data = {"fields": fields}
        if update:
            data["update"] = update
        params = {}

        if update_history is True:
            params["updateHistory"] = "true"
        else:
            params["updateHistory"] = "false"
        return self.post(url, params=params, data=data)
