import type HearingOutcomeCase from "./HearingOutcomeCase"

export default interface AnnotatedHearingOutcome {
  AnnotatedHearingOutcome: {
    HearingOutcome: {
      Case: HearingOutcomeCase
    }
  }
}
