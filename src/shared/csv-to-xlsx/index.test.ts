import convertCsvToXlsx from "./index"

it("should convert CSV to XLSX without header", () => {
  const csv = [
    "Force,FullAutomation,Number of Resubmissions,Automated inc. Resubmissions",
    "Essex,68.18%,2,77.27%",
    "London MET,33.33%,0,33.33%",
    "National Average,64.00%,2,72.00%"
  ].join("\n")

  const result = convertCsvToXlsx(csv)

  expect(result.toString()).toMatchSnapshot()
})

it("should convert CSV to XLSX with header", () => {
  const csv = [
    "Force,FullAutomation,Number of Resubmissions,Automated inc. Resubmissions",
    "Essex,68.18%,2,77.27%",
    "London MET,33.33%,0,33.33%",
    "National Average,64.00%,2,72.00%"
  ].join("\n")

  const result = convertCsvToXlsx(csv, "This is a dummy header")

  expect(result.toString()).toMatchSnapshot()
})

it("should convert empty CSV to XLSX with header", () => {
  const csv = ["Force,FullAutomation,Number of Resubmissions,Automated inc. Resubmissions"].join("\n")

  const result = convertCsvToXlsx(csv, "This is a dummy header")

  expect(result.toString()).toMatchSnapshot()
})

it("should return error when CSV is invalid", () => {
  const csv = [
    "Force,FullAutomation,Number of Resubmissions",
    "Essex,68.18%,2,77.27%",
    "London MET,33.33%,0,33.33%",
    "National Average,64.00%,2,72.00%"
  ].join("\n")

  const result = () => convertCsvToXlsx(csv)

  expect(result).toThrow("Invalid Record Length: columns length is 3, got 4 on line 2")
})
