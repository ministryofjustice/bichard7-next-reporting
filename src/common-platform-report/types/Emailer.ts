import type Email from "./Email"

export default interface Emailer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,no-unused-vars
  sendMail: (email: Email) => any
}
