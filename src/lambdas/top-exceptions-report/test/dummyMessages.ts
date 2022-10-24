import type { AuditLog } from "@bichard/types"

export default (date: Date) =>
  [
    {
      version: 3,
      events: [
        {
          s3Path: "2021/9/4/14/8/GeneralEvent-743a7328-1249-4b68-b5bc-b544ba5ef20b.xml",
          eventSourceArn:
            "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
          eventSource: "ErrorListManager",
          eventSourceQueueName: "GENERAL_EVENT_QUEUE",
          attributes: {
            "Exception Type": "HO100310",
            "Number Of Errors": "2",
            ASN: "1101ZD0100000410801G",
            "Message Type": "SPIResults",
            "Error 2 Details": "HO100310||ds:OffenceReasonSequence",
            "Error 1 Details": "HO100310||ds:OffenceReasonSequence"
          },
          eventType: "Hearing Outcome passed to Error List",
          category: "information",
          timestamp: "2021-10-14T14:08:44.384Z"
        }
      ],
      lastEventType: "Message Received",
      messageId: "a91929fa-1c70-4e53-9620-1dffc5586217",
      receivedDate: date.toISOString(),
      status: "Processing",
      externalCorrelationId: "CID-e7b34fbf-096a-4e29-b653-75d502c8d49e",
      caseId: "01ZD0300208"
    },
    {
      version: 4,
      events: [
        {
          s3Path: "2021/9/4/14/1/GeneralEvent-4f1eb0c5-8a10-47ac-b7e3-319f7ae7b8fa.xml",
          eventSourceArn:
            "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
          eventSource: "ErrorListManager",
          eventSourceQueueName: "GENERAL_EVENT_QUEUE",
          attributes: {
            "Number Of Offences": "3",
            "Exception Type": "HO200212",
            "Number Of Errors": "1",
            ASN: "1101ZD0100000410769X",
            "Message Type": "SPIResults",
            "Error 1 Details": "HO200212||ds:Reason"
          },
          eventType: "PNC Update added to Error List (PNC message construction)",
          category: "information",
          timestamp: "2021-10-14T14:01:40.274Z"
        }
      ],
      lastEventType: "Trigger generated",
      messageId: "393f115b-f53e-4bf1-9f26-f9b5e9ef58f9",
      receivedDate: date.toISOString(),
      status: "Processing",
      externalCorrelationId: "CID-5a32c3aa-0547-47b3-8fdb-203901715528",
      caseId: "01ZD0303908"
    },
    {
      version: 4,
      events: [
        {
          s3Path: "2021/9/4/14/1/GeneralEvent-314e298d-f1af-415a-8399-882472d894ad.xml",
          eventSourceArn:
            "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
          eventSource: "ErrorListManager",
          eventSourceQueueName: "GENERAL_EVENT_QUEUE",
          attributes: {
            "Exception Type": "HO100304",
            "Number Of Errors": "1",
            ASN: "1101ZD0100000410777F",
            "Message Type": "SPIResults",
            "Error 1 Details": "HO100304||br7:ArrestSummonsNumber"
          },
          eventType: "Hearing Outcome passed to Error List",
          category: "information",
          timestamp: "2021-10-14T14:01:46.914Z"
        }
      ],
      lastEventType: "Hearing Outcome passed to Error List",
      messageId: "53d6b9db-f70a-4704-bb62-c40a2070e262",
      receivedDate: date.toISOString(),
      status: "Completed",
      externalCorrelationId: "CID-2f26e1c7-338b-4a07-9d57-e6b25ebf0066",
      caseId: "01ZD0302108"
    },
    {
      version: 8,
      events: [
        {
          s3Path: "2021/9/4/14/0/GeneralEvent-57ee87ab-d37b-44a7-82ba-31a029032df8.xml",
          eventSourceArn:
            "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
          eventSource: "ErrorListManager",
          eventSourceQueueName: "GENERAL_EVENT_QUEUE",
          attributes: {
            "Exception Type": "HO100310",
            "Number Of Errors": "2",
            ASN: "1101ZD0100000410801G",
            "Message Type": "SPIResults",
            "Error 2 Details": "HO100310||ds:OffenceReasonSequence",
            "Error 1 Details": "HO100310||ds:OffenceReasonSequence"
          },
          eventType: "Hearing Outcome passed to Error List",
          category: "information",
          timestamp: "2021-10-14T14:00:21.305Z"
        }
      ],
      lastEventType: "Trigger generated",
      messageId: "f94e5844-0d9b-4b2c-ab3c-f13149380d1f",
      receivedDate: date.toISOString(),
      status: "Completed",
      externalCorrelationId: "CID-3e0e6d85-e49d-4c26-8a6b-1b383be9e20e",
      caseId: "01ZD0300208"
    },
    {
      version: 8,
      events: [
        {
          s3Path: "2021/9/4/13/59/GeneralEvent-83144f48-612c-481e-975c-d5807f3908c4.xml",
          eventSourceArn:
            "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
          eventSource: "ErrorListManager",
          eventSourceQueueName: "GENERAL_EVENT_QUEUE",
          attributes: {
            "Exception Type": "HO100310",
            "Number Of Errors": "2",
            ASN: "1101ZD0100000410801G",
            "Message Type": "SPIResults",
            "Error 2 Details": "HO100310||ds:OffenceReasonSequence",
            "Error 1 Details": "HO100310||ds:OffenceReasonSequence"
          },
          eventType: "Hearing Outcome passed to Error List",
          category: "information",
          timestamp: "2021-10-14T13:59:36.219Z"
        }
      ],
      lastEventType: "Trigger generated",
      messageId: "53ab5dea-ee8b-4420-bc70-664c520bce83",
      receivedDate: date.toISOString(),
      status: "Processing",
      externalCorrelationId: "CID-a28b5554-8d75-4b6c-a820-129ee6ecefba",
      caseId: "01ZD0300208"
    },
    {
      version: 9,
      events: [
        {
          s3Path: "2021/9/4/13/57/GeneralEvent-127cc916-6424-4b56-94a3-833ac395ce26.xml",
          eventSourceArn:
            "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
          eventSource: "ErrorListManager",
          eventSourceQueueName: "GENERAL_EVENT_QUEUE",
          attributes: {
            "Exception Type": "HO100310",
            "Number Of Errors": "2",
            ASN: "1101ZD0100000410801G",
            "Force Owner": "01VK00",
            "Message Type": "SPIResults",
            "Error 2 Details": "HO100310||ds:OffenceReasonSequence",
            "Error 1 Details": "HO100310||ds:OffenceReasonSequence"
          },
          eventType: "Hearing Outcome passed to Error List",
          category: "information",
          timestamp: "2021-10-14T13:57:31.022Z"
        }
      ],
      lastEventType: "PNC Update applied successfully",
      messageId: "0aec9c96-196b-4cf7-ba97-043f9443f639",
      receivedDate: date.toISOString(),
      status: "Completed",
      externalCorrelationId: "CID-562836bd-8ce8-4b64-b23f-0399f2a8280c",
      caseId: "01ZD0300208",
      forceOwner: 1
    }
  ] as unknown as AuditLog[]
