import { AwsAuditLogDynamoGateway, createDynamoDbConfig } from "@bichard/dynamo-gateway"
import { isError } from "@bichard/types"
import generateReport from "./generateReport"
import * as AWS from "aws-sdk";

interface AutomationReportResult {
  report?: string
  error?: string
}

const config = createDynamoDbConfig()
const auditLogGateway = new AwsAuditLogDynamoGateway(config, config.AUDIT_LOG_TABLE_NAME)

export default async (): Promise<AutomationReportResult> => {
  let previousMonth = new Date()
  previousMonth.setDate(1);
  previousMonth.setMonth(previousMonth.getMonth()-1);
  console.log("Getting messages ...")
  const messagesForReport = await auditLogGateway.fetchAllByReceivedDate(previousMonth, new Date())

  if (isError(messagesForReport)) {
    return {
      error: messagesForReport.message
    }
  }

  console.log("Generating report ...")
  const report = generateReport(messagesForReport)
  if(isError(report)){
    return {
      error: report.message
    }
  }

  console.log("Uploading to S3 ...")
  const s3 = new AWS.S3({
    endpoint: "https://s3.eu-west-2.amazonaws.com",
    region: "eu-west-2",
    s3ForcePathStyle: true
  });

  const params = {
    Bucket: process.env.REPORTS_BUCKET ?? 'bichard-7-testing-reporting-files', // pass your bucket name
    Key: 'automation.csv', // file will be saved as reporting/automation.csv
    Body: report
  };

  try{
    const result = await s3.upload(params)
    .promise()
    .then(() => undefined)
    .catch((error) => <Error>error)

    if (isError(result)) {
      throw result
    }

    return Promise.resolve({
      report: "Upload succeeded"
    })
  }catch(e:any){
    console.log(e, "Error")
    return Promise.reject({
      report: "Upload failed"
    })
  }
}
