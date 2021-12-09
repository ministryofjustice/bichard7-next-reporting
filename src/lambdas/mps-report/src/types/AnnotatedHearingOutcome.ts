import HearingOutcomeCase from "./HearingOutcomeCase"

export default interface AnnotatedHearingOutcome {
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
