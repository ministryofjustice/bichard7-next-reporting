import type OffenceDetails from "./OffenceDetails"
import type XmlStringCell from "./XmlStringCell"

export default interface HearingOutcomeCase {
  PTIURN: XmlStringCell
  HearingDefendant: {
    ArrestSummonsNumber: XmlStringCell
    Offence: OffenceDetails | [OffenceDetails]
    DefendantDetail: {
      BirthDate: XmlStringCell
    }
  }
}
