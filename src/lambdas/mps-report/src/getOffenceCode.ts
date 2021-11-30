import OffenceReason from "./types/OffenceReason";
import { getText } from "./types/XmlStringCell";

// convertHOOffenceCodeToDisplayFormat
export default (offCode: OffenceReason) => {
  let offenceReason = "";
  
  if (offCode.OffenceReason.OffenceCode) {
    if (offCode.OffenceReason.OffenceCode.ActOrSource) {
      offenceReason = offenceReason + getText(offCode.OffenceReason.OffenceCode.ActOrSource)
      offenceReason = offenceReason + getText(offCode.OffenceReason.OffenceCode.Year)
    } else if (offCode.OffenceReason.OffenceCode.Indictment != null) {
      offenceReason = offenceReason + getText(offCode.OffenceReason.OffenceCode.Indictment)
    } else if (offCode.OffenceReason.OffenceCode.CommonLawOffence != null) {      
      offenceReason = offenceReason + getText(offCode.OffenceReason.OffenceCode.CommonLawOffence)
    }
    offenceReason = offenceReason + getText(offCode.OffenceReason.OffenceCode.Reason)
    
    if (offCode.OffenceReason.OffenceCode.Qualifier) {
      offenceReason = offenceReason + getText(offCode.OffenceReason.OffenceCode.Qualifier)
    }    
  } else if(offCode.OffenceReason.LocalOffenceCode) {
    offenceReason = offenceReason + getText(offCode.OffenceReason.LocalOffenceCode.OffenceCode)
  }
  
  return offenceReason;
}
