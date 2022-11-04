/* eslint-disable no-console */
import handler from "src/top-exceptions-report"

handler()
  .then((succ) => console.log(succ))
  .catch((err) => {
    console.error("Error generating report", err.message)
  })
