import dynalite from "dynalite"
import * as dynamodb from "@aws-sdk/client-dynamodb"

export default class MockDynamo {
  server: any // eslint-disable-line @typescript-eslint/no-explicit-any

  start(port: number): Promise<void> {
    this.server = dynalite({ createTableMs: 0, deleteTableMs: 0, updateTableMs: 0 })
    return new Promise<void>((resolve) => this.server.listen(port, () => resolve()))
  }

  async setupTable(): Promise<void> {
    const db = new dynamodb.DynamoDB({
      endpoint: `http://localhost:${this.server.address().port}`,
      region: "test",
      credentials: { accessKeyId: "test", secretAccessKey: "test" }
    })
    await db.deleteTable({ TableName: "auditLogTable" }).catch(() => false)
    await db.createTable({
      TableName: "auditLogTable",
      KeySchema: [{ AttributeName: "messageId", KeyType: "HASH" }],
      AttributeDefinitions: [
        { AttributeName: "messageId", AttributeType: "S" },
        { AttributeName: "_", AttributeType: "S" },
        { AttributeName: "receivedDate", AttributeType: "S" },
        { AttributeName: "externalCorrelationId", AttributeType: "S" },
        { AttributeName: "status", AttributeType: "S" }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "receivedDateIndex",
          KeySchema: [
            { AttributeName: "_", KeyType: "HASH" },
            { AttributeName: "receivedDate", KeyType: "RANGE" }
          ],
          Projection: { ProjectionType: "ALL" }
        },
        {
          IndexName: "externalCorrelationIdIndex",
          KeySchema: [{ AttributeName: "externalCorrelationId", KeyType: "HASH" }],
          Projection: { ProjectionType: "ALL" }
        },
        {
          IndexName: "statusIndex",
          KeySchema: [
            { AttributeName: "status", KeyType: "HASH" },
            { AttributeName: "receivedDate", KeyType: "RANGE" }
          ],
          Projection: { ProjectionType: "ALL" }
        }
      ],
      BillingMode: "PAY_PER_REQUEST"
    })
  }

  stop(): Promise<void> {
    return new Promise<void>((resolve) => this.server.close(() => resolve()))
  }
}
