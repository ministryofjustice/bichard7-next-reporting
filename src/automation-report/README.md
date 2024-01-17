# Automation Report

A lambda that generates the automation report and stores in S3.

To generate the report locally, run the following command:

```sh
DATE=2022-04 WRITE_TO_FILE=true API_URL={audit_log_api_url} API_KEY={api_key} aws-vault exec {aws_profile_name} -- npx ts-node -T src/automation-report/cli.ts
```
