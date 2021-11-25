import OffenceDetails from "./OffenceDetails";
import XmlStringCell from "./XmlStringCell";

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