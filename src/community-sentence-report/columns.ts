import type CommunitySentenceReport from "src/shared/types/CommunitySentenceReport"

type ReportColumn<TRow> = {
  header: string
  key: Extract<keyof TRow, string>
}

export const communitySentenceColumns: ReportColumn<CommunitySentenceReport>[] = [
  { header: "Date received", key: "receivedDate" },
  { header: "Name", key: "defendantName" },
  { header: "Date of birth", key: "dateOfBirth" },
  { header: "PNCID", key: "pncId" },
  { header: "Offence", key: "offenceTitle" },
  { header: "Domestic violence case", key: "domesticViolenceFlag" },
  { header: "Suspended Sentence Order duration (months)", key: "suspendedSentenceDurationMonths" },
  { header: "Custodial Sentence Order duration (months)", key: "custodialSentenceDurationMonths" },
  { header: "Date of sentence", key: "dateOfSentence" },
  { header: "Expiry", key: "expiryOfSentence" },
  { header: "Home address", key: "homeAddress" },
  { header: "Offence address", key: "offenceAddress" },
  { header: "Offence start date", key: "offenceStartDate" },
  { header: "Arrest date", key: "arrestDate" },
  { header: "Charge date", key: "chargeDate" },
  { header: "Plea", key: "plea" },
  { header: "Result code", key: "resultCode" }
] as const
