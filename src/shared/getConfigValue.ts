import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm"

export default async function getConfigValue(rawValue: string | undefined, defaultValue: string) {
  let ssm = new SSMClient({ region: process.env.AWS_REGION })

  if (!rawValue) {
    console.log("No value specified, using default")
    return defaultValue
  }

  if (!rawValue.startsWith("arn:aws:ssm")) {
    console.log("Using raw value from environment variable")
    return rawValue
  }

  let command = new GetParameterCommand({
    Name: rawValue,
    WithDecryption: true
  })

  let response = await ssm.send(command)
  if (!response.Parameter?.Value) {
    throw new Error("Failed to read parameter from SSM")
  }

  return response.Parameter.Value
}
