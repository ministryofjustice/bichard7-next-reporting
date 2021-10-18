process.env.AUDIT_LOG_TABLE_NAME = "bichard-7-emad-audit-log"
process.env.AWS_URL = "dynamodb.eu-west-2.amazonaws.com"
process.env.AWS_REGION = "eu-west-2"

import index from "./index"

it("test", async () => {
  const result = await index({ from: "2021-01-01T10:10:10", to: "2021-12-01T10:10:10" })

  expect(result).toBeNull()
})
