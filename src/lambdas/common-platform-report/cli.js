const handler = require("./build/mps-report")

handler
  .default()
  .then((succ) => console.log(succ))
  .catch((err) => {
    console.error("Error sending report", err.message)
  })
