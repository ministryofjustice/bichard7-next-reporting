import OffenceDetails from "./OffenceDetails"
import XmlStringCell from "./XmlStringCell"

export default interface AnnotatedHearingOutcome {
  AnnotatedHearingOutcome: {
    HearingOutcome: {
      Case: {
        PTIURN: XmlStringCell
        HearingDefendant: {
          ArrestSummonsNumber: XmlStringCell
          Offence: OffenceDetails | [OffenceDetails]
          DefendantDetail: {
            BirthDate: XmlStringCell
          }
        }
      }
    }
  }
}
