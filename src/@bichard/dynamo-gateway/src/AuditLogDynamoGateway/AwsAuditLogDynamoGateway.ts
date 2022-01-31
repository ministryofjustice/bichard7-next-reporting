import type { AuditLog, PromiseResult } from "@bichard/types"
import { isError } from "@bichard/types"
import { DynamoGateway, IndexSearcher } from "../DynamoGateway"
import type { DynamoDbConfig } from "../DynamoGateway"
import type AuditLogDynamoGateway from "./AuditLogDynamoGateway"

export default class AwsAuditLogDynamoGateway extends DynamoGateway implements AuditLogDynamoGateway {
  private readonly tableKey: string = "messageId"

  private readonly sortKey: string = "receivedDate"

  constructor(config: DynamoDbConfig, private readonly tableName: string) {
    super(config)
  }

  fetchAllByReceivedDate(receivedDateFrom: Date, receivedDateTo: Date): PromiseResult<AuditLog[]> {
    let allItems: AuditLog[] = []

    const fetch = (lastMessage?: AuditLog): PromiseResult<AuditLog[] | undefined> =>
      new IndexSearcher<AuditLog[]>(this, this.tableName, this.tableKey)
        .useIndex(`${this.sortKey}Index`)
        .setIndexKeys("_", "_", "receivedDate")
        .rangeKeyBetween(receivedDateFrom.toISOString(), receivedDateTo.toISOString())
        .paginate(50, lastMessage)
        .execute()

    const fetchAllPages = async (lastMessage?: AuditLog): PromiseResult<AuditLog[]> => {
      const pageItems = await fetch(lastMessage)

      if (isError(pageItems)) {
        return pageItems
      }

      if (!pageItems || pageItems.length === 0) {
        return allItems
      }

      allItems = allItems.concat(pageItems)
      return fetchAllPages(pageItems[pageItems.length - 1])
    }

    return fetchAllPages()
  }
}
