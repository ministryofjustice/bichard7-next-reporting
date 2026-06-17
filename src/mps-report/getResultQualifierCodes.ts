import { isMultiple } from "./types/OffenceDetails"
import type ResultQualifier from "./types/ResultQualifier"

export default (resultQualifiers: [ResultQualifier] | ResultQualifier | undefined): string => {
  if (!resultQualifiers) {
    return ""
  }

  let result
  if (isMultiple<ResultQualifier>(resultQualifiers)) {
    result = resultQualifiers.map((x) => x.Code._text).join(" ")
  } else {
    result = resultQualifiers.Code._text
  }
  return result
}
