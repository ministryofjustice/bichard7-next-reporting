import nodemailer from "nodemailer"
import Email from "./types/Email"
import Emailer from "./types/Emailer"

export interface SmtpConfig {
  host: string
  user: string
  password: string
  port: number
  tls: boolean
}

const getSmtpMailer = (config: SmtpConfig): Emailer =>
  nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.tls,
    auth: {
      user: config.user,
      pass: config.password
    }
  })

const getConsoleMailer = (): Emailer => ({
  // eslint-disable-next-line require-await
  sendMail: async (email: Email) => {
    console.log({
      from: email.from,
      to: email.to,
      subject: email.subject,
      body: email.text
    })
    email.attachments && email.attachments.forEach((a) => console.log(a))
  }
})

let emailer: Emailer

export default function getEmailer(config: SmtpConfig): Emailer {
  if (emailer) {
    return emailer
  }

  emailer = config.host === "console" ? getConsoleMailer() : getSmtpMailer(config)
  return emailer
}