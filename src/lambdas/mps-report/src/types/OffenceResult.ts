import type ResultDuration from "./ResultDuration"
import type ResultQualifier from "./ResultQualifier"
import type XmlStringCell from "./XmlStringCell"

export default interface OffenceResult {
  CJSresultCode: XmlStringCell
  Duration: [ResultDuration] | ResultDuration
  AmountSpecifiedInResult: [XmlStringCell] | XmlStringCell
  ResultVariableText: XmlStringCell
  ResultQualifierVariable: [ResultQualifier] | ResultQualifier
}
