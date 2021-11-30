import OffenceReason from "./OffenceReason"
import OffenceResult from "./OffenceResult"
import XmlStringCell from "./XmlStringCell"

export function isMultiple<T>(obj: T | [T]): obj is [T]{
    return (obj as [T]).length > 0
}

export default interface OffenceDetails {
  ActualOffenceStartDate: {
    StartDate: XmlStringCell
  }
  CriminalProsecutionReference: OffenceReason
  LocationOfOffence: XmlStringCell
  Result: [OffenceResult] | OffenceResult
}
