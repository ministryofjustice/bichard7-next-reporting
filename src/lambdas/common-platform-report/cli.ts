/* eslint-disable no-console */
import handler from "./src"

handler(new Date())
  .then((succ) => console.log(succ))
  .catch((err) => {
    console.error("Error sending report", err.message)
  })
