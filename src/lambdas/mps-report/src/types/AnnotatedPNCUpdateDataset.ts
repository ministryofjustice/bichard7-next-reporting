import HearingOutcomeCase from "./HearingOutcomeCase"

export default interface AnnotatedPNCUpdateDataset {
  AnnotatedPNCUpdateDataset: {
    PNCUpdateDataset: {
      AnnotatedHearingOutcome: {
        HearingOutcome: {
          Case: HearingOutcomeCase
        }
      }
    }
  }
}
