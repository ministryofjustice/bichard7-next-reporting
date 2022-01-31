/* eslint-disable no-console */
const handler = require("./build/common-platform-report")

handler
  .default()
  .then((succ) => console.log(succ))
  .catch((err) => {
    console.error("Error sending report", err.message)
  })
