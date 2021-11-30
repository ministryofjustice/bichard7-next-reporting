import ResultDuration from "./ResultDuration"
import XmlStringCell from "./XmlStringCell"

export default interface OffenceResult {
  CJSresultCode: XmlStringCell
  Duration: [ResultDuration] | ResultDuration
  AmountSpecifiedInResult: [XmlStringCell] | XmlStringCell
  ResultVariableText: XmlStringCell
  ResultQualifierVariable: [Code: XmlStringCell]
}
