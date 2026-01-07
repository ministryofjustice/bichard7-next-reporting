import handler from "src/common-platform-report"

handler(new Date())
  .then((succ) => console.log(succ))
  .catch((err) => {
    console.error("Error sending report", err.message)
  })
