import type XmlStringCell from "./XmlStringCell"

export default interface OffenceReason {
  OffenceReason: {
    OffenceCode?: {
      ActOrSource?: XmlStringCell
      Year: XmlStringCell
      Indictment?: XmlStringCell
      CommonLawOffence?: XmlStringCell
      Reason: XmlStringCell
      Qualifier?: XmlStringCell
    }
    LocalOffenceCode?: {
      OffenceCode: XmlStringCell
    }
  }
}
