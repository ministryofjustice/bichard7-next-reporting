import type Pagination from "./Pagination"

type Value = string | number

export default interface FetchByIndexOptions {
  indexName: string
  attributeName: string
  attributeValue: unknown
  rangeKeyName?: string
  rangeKeyBetween?: Value[]
  isAscendingOrder?: boolean
  pagination: Pagination
}
