import type Email from "./Email"

export default interface Emailer {
  // eslint-disable-next-line no-unused-vars
  sendMail: (email: Email) => any
}
