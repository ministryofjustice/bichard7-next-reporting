import { DynamoDB } from "aws-sdk"
import type { ExpressionAttributeNameMap } from "aws-sdk/clients/dynamodb"
import { DocumentClient } from "aws-sdk/clients/dynamodb"
import type { KeyValuePair, PromiseResult } from "@bichard/types"
import type DynamoDbConfig from "./DynamoDbConfig"
import type FetchByIndexOptions from "./FetchByIndexOptions"
import type UpdateOptions from "./UpdateOptions"
import type GetManyOptions from "./GetManyOptions"

export default class DynamoGateway {
  protected readonly service: DynamoDB

  protected readonly client: DocumentClient

  constructor(config: DynamoDbConfig) {
    this.service = new DynamoDB({
      endpoint: config.DYNAMO_URL,
      region: config.DYNAMO_REGION,
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    })

    this.client = new DocumentClient({
      service: this.service
    })
  }

  insertOne<T>(tableName: string, record: T, keyName: string): PromiseResult<void> {
    const params: DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: { _: "_", ...record },
      ConditionExpression: `attribute_not_exists(${keyName})`
    }

    return this.client
      .put(params)
      .promise()
      .then(() => undefined)
      .catch((error) => <Error>error)
  }

  getMany(tableName: string, options: GetManyOptions): PromiseResult<DocumentClient.QueryOutput> {
    const { sortKey } = options
    const { limit, lastItemKey } = options.pagination

    const queryOptions: DynamoDB.DocumentClient.QueryInput = {
      TableName: tableName,
      IndexName: `${sortKey}Index`,
      KeyConditionExpression: "#dummyKey = :dummyValue",
      ExpressionAttributeValues: {
        ":dummyValue": "_"
      },
      ExpressionAttributeNames: {
        "#dummyKey": "_"
      },
      Limit: limit,
      ScanIndexForward: false // Descending order
    }

    if (lastItemKey) {
      queryOptions.ExclusiveStartKey = { ...lastItemKey, _: "_" }
    }

    return this.client
      .query(queryOptions)
      .promise()
      .catch((error) => <Error>error)
  }

  fetchByIndex(tableName: string, options: FetchByIndexOptions): PromiseResult<DocumentClient.QueryOutput> {
    const { indexName, attributeName, attributeValue, isAscendingOrder, rangeKeyBetween, rangeKeyName } = options
    const { limit, lastItemKey } = options.pagination
    const keyConditionExpression = ["#keyName = :keyValue"]
    const expressionAttributeNames: ExpressionAttributeNameMap = {
      "#keyName": attributeName
    }
    const expressionAttributeValues: KeyValuePair<string, unknown> = {
      ":keyValue": attributeValue
    }

    if (rangeKeyBetween && rangeKeyName) {
      keyConditionExpression.push("#rangeKeyName BETWEEN :rangeKeyValue1 AND :rangeKeyValue2")
      expressionAttributeNames["#rangeKeyName"] = rangeKeyName
      expressionAttributeValues[":rangeKeyValue1"] = rangeKeyBetween[0] // eslint-disable-line prefer-destructuring
      expressionAttributeValues[":rangeKeyValue2"] = rangeKeyBetween[1] // eslint-disable-line prefer-destructuring
    }

    const queryOptions: DynamoDB.DocumentClient.QueryInput = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: keyConditionExpression.join(" AND "),
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ScanIndexForward: isAscendingOrder,
      Limit: limit,
      ExclusiveStartKey: lastItemKey
    }

    return this.client
      .query(queryOptions)
      .promise()
      .catch((error) => <Error>error)
  }

  getOne(
    tableName: string,
    keyName: string,
    keyValue: unknown
  ): PromiseResult<DocumentClient.GetItemOutput | Error | null> {
    return this.client
      .get({
        TableName: tableName,
        Key: {
          [keyName]: keyValue
        }
      })
      .promise()
      .catch((error) => <Error>error)
  }

  getRecordVersion(
    tableName: string,
    keyName: string,
    keyValue: unknown
  ): PromiseResult<DocumentClient.GetItemOutput | Error | null> {
    return this.client
      .get({
        TableName: tableName,
        Key: {
          [keyName]: keyValue
        },
        ProjectionExpression: "version"
      })
      .promise()
      .catch((error) => <Error>error)
  }

  updateEntry(tableName: string, options: UpdateOptions): PromiseResult<DocumentClient.UpdateItemOutput> {
    const { keyName, keyValue, expressionAttributeNames } = options
    const expressionAttributeValues = {
      ...options.updateExpressionValues,
      ":version": options.currentVersion,
      ":version_increment": 1
    }
    const updateExpression = `${options.updateExpression} ADD version :version_increment`

    const updateParams = <DocumentClient.UpdateItemInput>{
      TableName: tableName,
      Key: {
        [keyName]: keyValue
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ConditionExpression: `attribute_exists(${keyName}) and version = :version`
    }

    return this.client
      .update(updateParams)
      .promise()
      .catch((error) => <Error>error)
  }
}
