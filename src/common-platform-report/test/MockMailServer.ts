import mailServer from "smtp-tester"
import type { KeyValuePair, PromiseResult } from "src/shared/types"

export type Attachment = {
  content: Buffer
  contentType: string
  filename: string
}

export type Email = {
  sender: string
  receivers: KeyValuePair<string, string>
  data: string
  body: string
  headers: KeyValuePair<string, string>
  attachments: Attachment[]
}

export default class MockMailServer {
  messages: Email[]

  server: any

  constructor(port: number) {
    this.server = mailServer.init(port)
  }

  stop() {
    this.server.stop()
  }

  async getEmail(emailAddress: string): PromiseResult<Email> {
    try {
      const { email } = await this.server.captureOne(emailAddress, { wait: 1000 })
      return email
    } catch (error) {
      return error as Error
    }
  }
}
