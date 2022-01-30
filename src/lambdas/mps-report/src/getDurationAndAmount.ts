/* eslint-disable no-underscore-dangle */
import { isMultiple } from "./types/OffenceDetails"
import type ResultDuration from "./types/ResultDuration"
import type XmlStringCell from "./types/XmlStringCell"

export default (input: {
  Duration: [ResultDuration] | ResultDuration
  AmountSpecifiedInResult: [XmlStringCell] | XmlStringCell
}): string => {
  let result = ""
  if (input.Duration) {
    if (isMultiple<ResultDuration>(input.Duration)) {
      const resultDuration = input.Duration.map((x) => x.DurationLength._text + x.DurationUnit._text).join(" ")
      result = `${result + resultDuration} `
    } else {
      result = `${result + input.Duration.DurationLength._text + input.Duration.DurationUnit._text} `
    }
  }

  if (input.AmountSpecifiedInResult) {
    if (isMultiple<XmlStringCell>(input.AmountSpecifiedInResult)) {
      const resultAmount = input.AmountSpecifiedInResult.map((x) => x._text).join(" ")
      result += resultAmount
    } else {
      result += input.AmountSpecifiedInResult._text
    }
  }

  return result
}
