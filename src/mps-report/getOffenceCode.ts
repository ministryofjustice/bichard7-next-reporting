import type OffenceReason from "./types/OffenceReason"
import { getText } from "./types/XmlStringCell"

// convertHOOffenceCodeToDisplayFormat
export default (offCode: OffenceReason): string => {
  let offenceReason = ""

  if (offCode.OffenceReason.OffenceCode) {
    if (offCode.OffenceReason.OffenceCode.ActOrSource) {
      offenceReason += getText(offCode.OffenceReason.OffenceCode.ActOrSource)
      offenceReason += getText(offCode.OffenceReason.OffenceCode.Year)
    } else if (offCode.OffenceReason.OffenceCode.Indictment != null) {
      offenceReason += getText(offCode.OffenceReason.OffenceCode.Indictment)
    } else if (offCode.OffenceReason.OffenceCode.CommonLawOffence != null) {
      offenceReason += getText(offCode.OffenceReason.OffenceCode.CommonLawOffence)
    }
    offenceReason += getText(offCode.OffenceReason.OffenceCode.Reason)

    if (offCode.OffenceReason.OffenceCode.Qualifier) {
      offenceReason += getText(offCode.OffenceReason.OffenceCode.Qualifier)
    }
  } else if (offCode.OffenceReason.LocalOffenceCode) {
    offenceReason += getText(offCode.OffenceReason.LocalOffenceCode.OffenceCode)
  }

  return offenceReason
}
