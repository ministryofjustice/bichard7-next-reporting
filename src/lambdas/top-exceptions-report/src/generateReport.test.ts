import type { AuditLog } from "@bichard/types"
import generateReport from "./generateReport"

const messages = [
  {
    version: 3,
    events: [
      {
        eventSource: "Incoming Message Handler",
        attributes: {},
        eventType: "Message Sent to Bichard",
        category: "information",
        timestamp: "2021-10-14T14:08:44.225Z"
      },
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
      },
      {
        s3Path: "2021/9/4/14/8/GeneralEvent-b777bb86-5e8f-4d64-bf05-aa3d667dfe51.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "Hearing Outcome Publication Choreography",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Requesting System Org Unit Code": "Z000000",
          "Requesting System Name": "CJSE",
          "External Correlation Identifier": "a91929fa-1c70-4e53-9620-1dffc5586217"
        },
        eventType: "Message Received",
        category: "information",
        timestamp: "2021-10-14T14:08:44.159Z"
      }
    ],
    lastEventType: "Message Received",
    messageId: "a91929fa-1c70-4e53-9620-1dffc5586217",
    receivedDate: "2021-10-14T14:08:00.000Z",
    status: "Processing",
    externalCorrelationId: "CID-e7b34fbf-096a-4e29-b653-75d502c8d49e",
    caseId: "01ZD0300208",
    topExceptionsReport: {
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
      ]
    }
  },
  {
    version: 4,
    events: [
      {
        eventSource: "Incoming Message Handler",
        attributes: {},
        eventType: "Message Sent to Bichard",
        category: "information",
        timestamp: "2021-10-14T14:01:39.994Z"
      },
      {
        s3Path: "2021/9/4/14/1/GeneralEvent-f1f41dff-24ee-4cf2-bd72-a754a61d8194.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "Hearing Outcome Publication Choreography",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Requesting System Org Unit Code": "Z000000",
          "Requesting System Name": "CJSE",
          "External Correlation Identifier": "393f115b-f53e-4bf1-9f26-f9b5e9ef58f9"
        },
        eventType: "Message Received",
        category: "information",
        timestamp: "2021-10-14T14:01:39.913Z"
      },
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
      },
      {
        s3Path: "2021/9/4/14/1/GeneralEvent-4e543259-acbc-4e5d-8284-067d4d451dc5.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorListManager",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Trigger 4 Details": "TRPR0012",
          "Number of Triggers": "4",
          "Trigger 3 Details": "TRPR0001",
          "Trigger and Exception Flag": "false",
          "Trigger 2 Details": "TRPR0001",
          "Trigger Type": "TRPR0006",
          "Trigger 1 Details": "TRPR0006"
        },
        eventType: "Trigger generated",
        category: "information",
        timestamp: "2021-10-14T14:01:40.113Z"
      }
    ],
    lastEventType: "Trigger generated",
    messageId: "393f115b-f53e-4bf1-9f26-f9b5e9ef58f9",
    receivedDate: "2021-10-14T14:01:00.000Z",
    status: "Processing",
    externalCorrelationId: "CID-5a32c3aa-0547-47b3-8fdb-203901715528",
    caseId: "01ZD0303908",
    topExceptionsReport: {
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
      ]
    }
  },
  {
    version: 4,
    events: [
      {
        eventSource: "Incoming Message Handler",
        attributes: {},
        eventType: "Message Sent to Bichard",
        category: "information",
        timestamp: "2021-10-14T14:01:46.794Z"
      },
      {
        s3Path: "2021/9/4/14/1/GeneralEvent-e15782da-7c72-41e2-9bd1-0ffc87d8f574.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "PNC Access Manager",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: { "PNC Request Type": "ENQASI", "PNC Attempts Made": "3", "PNC Response Time": "70" },
        eventType: "PNC Response received",
        category: "information",
        timestamp: "2021-10-14T14:01:46.806Z"
      },
      {
        s3Path: "2021/9/4/14/1/GeneralEvent-96138176-c67c-4f76-9c47-4e9e8ce0fd16.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "Hearing Outcome Publication Choreography",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Requesting System Org Unit Code": "Z000000",
          "Requesting System Name": "CJSE",
          "External Correlation Identifier": "53d6b9db-f70a-4704-bb62-c40a2070e262"
        },
        eventType: "Message Received",
        category: "information",
        timestamp: "2021-10-14T14:01:46.729Z"
      },
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
    receivedDate: "2021-10-14T14:01:00.000Z",
    status: "Completed",
    externalCorrelationId: "CID-2f26e1c7-338b-4a07-9d57-e6b25ebf0066",
    caseId: "01ZD0302108",
    topExceptionsReport: {
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
      ]
    }
  },
  {
    version: 8,
    events: [
      {
        eventSource: "Incoming Message Handler",
        attributes: {},
        eventType: "Message Sent to Bichard",
        category: "information",
        timestamp: "2021-10-14T14:00:21.067Z"
      },
      {
        s3Path: "2021/9/4/14/0/GeneralEvent-f27ef8c5-a2a1-428e-bbd5-eb22ad3f496f.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "PNC Access Manager",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: { "PNC Request Type": "ENQASI", "PNC Attempts Made": "3", "PNC Response Time": "99" },
        eventType: "PNC Response received",
        category: "information",
        timestamp: "2021-10-14T14:00:21.123Z"
      },
      {
        s3Path: "2021/9/4/14/0/GeneralEvent-7e56065a-7093-4887-b15f-6bb632c3e304.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorListManager",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Trigger and Exception Flag": "false",
          "Trigger 2 Details": "TRPR0021",
          "Trigger Type": "TRPR0006",
          "Trigger 1 Details": "TRPR0006",
          "Number of Triggers": "2"
        },
        eventType: "Trigger generated",
        category: "information",
        timestamp: "2021-10-14T14:00:21.235Z"
      },
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
      },
      {
        s3Path: "2021/9/4/14/0/GeneralEvent-546f3f32-f6cf-4c82-b714-ec3ea641c8fa.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorHandlerScreenFlow",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {},
        eventType: "Exception locked",
        category: "information",
        timestamp: "2021-10-14T14:00:25.357Z"
      },
      {
        s3Path: "2021/9/4/14/0/GeneralEvent-6907ab53-9fba-4497-8ffc-55d8fc245f38.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "PNC ASN-Based Update Choreography",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {},
        eventType: "Hearing Outcome message received",
        category: "information",
        timestamp: "2021-10-14T14:00:26.888Z"
      },
      {
        s3Path: "2021/9/4/14/0/GeneralEvent-be950299-b054-410c-ac10-bb3f762a3d10.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "PNC Access Manager",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: { "PNC Request Type": "DISARR", "PNC Attempts Made": "3", "PNC Response Time": "78" },
        eventType: "PNC Response received",
        category: "information",
        timestamp: "2021-10-14T14:00:27.046Z"
      },
      {
        s3Path: "2021/9/4/14/0/GeneralEvent-300125d8-493f-49ce-863e-6bc85bb0a00f.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorListManager",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Trigger and Exception Flag": "true",
          "Trigger Type": "TRPS0002",
          "Trigger 1 Details": "TRPS0002",
          "Number of Triggers": "1"
        },
        eventType: "Trigger generated",
        category: "information",
        timestamp: "2021-10-14T14:00:27.136Z"
      }
    ],
    lastEventType: "Trigger generated",
    messageId: "f94e5844-0d9b-4b2c-ab3c-f13149380d1f",
    receivedDate: "2021-10-14T14:00:00.000Z",
    status: "Completed",
    externalCorrelationId: "CID-3e0e6d85-e49d-4c26-8a6b-1b383be9e20e",
    caseId: "01ZD0300208",
    topExceptionsReport: {
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
      ]
    }
  },
  {
    version: 8,
    events: [
      {
        eventSource: "Incoming Message Handler",
        attributes: {},
        eventType: "Message Sent to Bichard",
        category: "information",
        timestamp: "2021-10-14T13:59:36.045Z"
      },
      {
        s3Path: "2021/9/4/13/59/GeneralEvent-c4bf941f-3d9c-44d2-90ae-fc0c7fcf4453.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorListManager",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Trigger and Exception Flag": "false",
          "Trigger 2 Details": "TRPR0021",
          "Trigger Type": "TRPR0006",
          "Trigger 1 Details": "TRPR0006",
          "Number of Triggers": "2"
        },
        eventType: "Trigger generated",
        category: "information",
        timestamp: "2021-10-14T13:59:36.171Z"
      },
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
      },
      {
        s3Path: "2021/9/4/13/59/GeneralEvent-85d47f86-d0a2-4d11-b3ab-9166294bc6b1.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "Hearing Outcome Publication Choreography",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Requesting System Org Unit Code": "Z000000",
          "Requesting System Name": "CJSE",
          "External Correlation Identifier": "53ab5dea-ee8b-4420-bc70-664c520bce83"
        },
        eventType: "Message Received",
        category: "information",
        timestamp: "2021-10-14T13:59:35.964Z"
      },
      {
        s3Path: "2021/9/4/13/59/GeneralEvent-6f10465e-8e53-48e8-bfbe-07e99f10e900.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorHandlerScreenFlow",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {},
        eventType: "Exception locked",
        category: "information",
        timestamp: "2021-10-14T13:59:39.345Z"
      },
      {
        s3Path: "2021/9/4/13/59/AuditEvent-6481d7ec-2035-4ce4-8d19-202db3d4cfa3.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorHandlerScreenFlow",
        eventSourceQueueName: "AUDIT_EVENT_QUEUE",
        attributes: {
          OriginalHearingOutcome:
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<br7:HearingOutcome xmlns:br7="http://schemas.cjse.gov.uk/datastandards/BR7/2007-12" xmlns:ds="http://schemas.cjse.gov.uk/datastandards/2006-10" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n    <br7:Hearing hasError="false" SchemaVersion="4.0">\n        <ds:CourtHearingLocation SchemaVersion="2.0">\n            <ds:TopLevelCode>B</ds:TopLevelCode>\n            <ds:SecondLevelCode>01</ds:SecondLevelCode>\n            <ds:ThirdLevelCode>EF</ds:ThirdLevelCode>\n            <ds:BottomLevelCode>01</ds:BottomLevelCode>\n            <ds:OrganisationUnitCode>B01EF01</ds:OrganisationUnitCode>\n        </ds:CourtHearingLocation>\n        <ds:DateOfHearing>2011-10-01</ds:DateOfHearing>\n        <ds:TimeOfHearing>10:00</ds:TimeOfHearing>\n        <ds:HearingLanguage Literal="Don\'t Know">D</ds:HearingLanguage>\n        <ds:HearingDocumentationLanguage Literal="Don\'t Know">D</ds:HearingDocumentationLanguage>\n        <ds:DefendantPresentAtHearing Literal="Defendant was not present, but appeared by the presence of his/her barrister or solicitor">A</ds:DefendantPresentAtHearing>\n        <br7:SourceReference>\n            <br7:DocumentName>SPI Barry Bass</br7:DocumentName>\n            <br7:UniqueID>53ab5dea-ee8b-4420-bc70-664c520bce83</br7:UniqueID>\n            <br7:DocumentType>SPI Case Result</br7:DocumentType>\n        </br7:SourceReference>\n        <br7:CourtType Literal="MC adult">MCA</br7:CourtType>\n        <br7:CourtHouseCode>2576</br7:CourtHouseCode>\n        <br7:CourtHouseName>B01EF00</br7:CourtHouseName>\n    </br7:Hearing>\n    <br7:Case hasError="false" SchemaVersion="4.0">\n        <ds:PTIURN>01ZD0300208</ds:PTIURN>\n        <ds:PreChargeDecisionIndicator Literal="No">N</ds:PreChargeDecisionIndicator>\n        <ds:CourtCaseReferenceNumber>97/1626/008395Q</ds:CourtCaseReferenceNumber>\n        <br7:CourtReference>\n            <ds:MagistratesCourtReference>01ZD0300208</ds:MagistratesCourtReference>\n        </br7:CourtReference>\n        <br7:RecordableOnPNCindicator Literal="Yes">Y</br7:RecordableOnPNCindicator>\n        <br7:ForceOwner SchemaVersion="2.0">\n            <ds:SecondLevelCode>01</ds:SecondLevelCode>\n            <ds:ThirdLevelCode>ZD</ds:ThirdLevelCode>\n            <ds:BottomLevelCode>00</ds:BottomLevelCode>\n            <ds:OrganisationUnitCode>01ZD00</ds:OrganisationUnitCode>\n        </br7:ForceOwner>\n        <br7:HearingDefendant hasError="false">\n            <br7:ArrestSummonsNumber>1101ZD0100000410801G</br7:ArrestSummonsNumber>\n            <br7:PNCIdentifier>2000/0410801G</br7:PNCIdentifier>\n            <br7:PNCCheckname>Bass</br7:PNCCheckname>\n            <br7:DefendantDetail>\n                <br7:PersonName>\n                    <ds:Title>Mr</ds:Title>\n                    <ds:GivenName NameSequence="1">Barry</ds:GivenName>\n                    <ds:FamilyName NameSequence="1">Bass</ds:FamilyName>\n                </br7:PersonName>\n                <br7:GeneratedPNCFilename>BASS/BARRY</br7:GeneratedPNCFilename>\n                <br7:BirthDate>1948-11-11</br7:BirthDate>\n                <br7:Gender Literal="male">1</br7:Gender>\n            </br7:DefendantDetail>\n            <br7:Address>\n                <ds:AddressLine1>ScenarioAE Address Line 1</ds:AddressLine1>\n                <ds:AddressLine2>ScenarioAE Address Line 2</ds:AddressLine2>\n                <ds:AddressLine3>ScenarioAE Address Line 3</ds:AddressLine3>\n            </br7:Address>\n            <br7:RemandStatus Literal="Unconditional Bail">UB</br7:RemandStatus>\n            <br7:Offence hasError="true" SchemaVersion="4.0">\n                <ds:CriminalProsecutionReference SchemaVersion="2.0">\n                    <ds:DefendantOrOffender>\n                        <ds:Year>11</ds:Year>\n                        <ds:OrganisationUnitIdentifierCode SchemaVersion="2.0">\n                            <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                            <ds:ThirdLevelCode>ZD</ds:ThirdLevelCode>\n                            <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                            <ds:OrganisationUnitCode>01ZD01</ds:OrganisationUnitCode>\n                        </ds:OrganisationUnitIdentifierCode>\n                        <ds:DefendantOrOffenderSequenceNumber>00000410801</ds:DefendantOrOffenderSequenceNumber>\n                        <ds:CheckDigit>G</ds:CheckDigit>\n                    </ds:DefendantOrOffender>\n                    <ds:OffenceReason>\n                        <ds:OffenceCode>\n                            <ds:ActOrSource>TH</ds:ActOrSource>\n                            <ds:Year>68</ds:Year>\n                            <ds:Reason>010</ds:Reason>\n                        </ds:OffenceCode>\n                    </ds:OffenceReason>\n                    <ds:OffenceReasonSequence Error="HO100310"/>\n                </ds:CriminalProsecutionReference>\n                <ds:OffenceCategory Literal="Either Way">CE</ds:OffenceCategory>\n                <ds:ArrestDate>2010-09-25</ds:ArrestDate>\n                <ds:ChargeDate>2010-09-25</ds:ChargeDate>\n                <ds:ActualOffenceDateCode Literal="on or in">1</ds:ActualOffenceDateCode>\n                <ds:ActualOffenceStartDate>\n                    <ds:StartDate>2010-09-25</ds:StartDate>\n                </ds:ActualOffenceStartDate>\n                <ds:LocationOfOffence>1 Kingston High Street</ds:LocationOfOffence>\n                <ds:OffenceTitle>Theft from a shop</ds:OffenceTitle>\n                <ds:ActualOffenceWording>Theft from shop - shoplifting.</ds:ActualOffenceWording>\n                <ds:RecordableOnPNCindicator Literal="Yes">Y</ds:RecordableOnPNCindicator>\n                <ds:NotifiableToHOindicator Literal="Yes">Y</ds:NotifiableToHOindicator>\n                <ds:HomeOfficeClassification>046/00</ds:HomeOfficeClassification>\n                <ds:ConvictionDate>2011-10-01</ds:ConvictionDate>\n                <br7:CommittedOnBail Literal="Don\'t Know">D</br7:CommittedOnBail>\n                <br7:CourtOffenceSequenceNumber>1</br7:CourtOffenceSequenceNumber>\n                <br7:Result hasError="false" SchemaVersion="2.0">\n                    <ds:CJSresultCode>1002</ds:CJSresultCode>\n                    <ds:SourceOrganisation SchemaVersion="2.0">\n                        <ds:TopLevelCode>B</ds:TopLevelCode>\n                        <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                        <ds:ThirdLevelCode>EF</ds:ThirdLevelCode>\n                        <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                        <ds:OrganisationUnitCode>B01EF01</ds:OrganisationUnitCode>\n                    </ds:SourceOrganisation>\n                    <ds:CourtType>MCA</ds:CourtType>\n                    <ds:ResultHearingType Literal="Other">OTHER</ds:ResultHearingType>\n                    <ds:ResultHearingDate>2011-10-01</ds:ResultHearingDate>\n                    <ds:Duration>\n                        <ds:DurationType>Duration</ds:DurationType>\n                        <ds:DurationUnit>M</ds:DurationUnit>\n                        <ds:DurationLength>12</ds:DurationLength>\n                    </ds:Duration>\n                    <ds:PleaStatus Literal="Not Guilty">NG</ds:PleaStatus>\n                    <ds:Verdict Literal="Guilty">G</ds:Verdict>\n                    <ds:ModeOfTrialReason Literal="Summary only">SUM</ds:ModeOfTrialReason>\n                    <ds:ResultVariableText>Imprisonment for 12 Months</ds:ResultVariableText>\n                    <ds:ResultHalfLifeHours>72</ds:ResultHalfLifeHours>\n                    <br7:PNCDisposalType>1002</br7:PNCDisposalType>\n                    <br7:ResultClass>Judgement with final result</br7:ResultClass>\n                </br7:Result>\n                <br7:Result hasError="false" SchemaVersion="2.0">\n                    <ds:CJSresultCode>3025</ds:CJSresultCode>\n                    <ds:SourceOrganisation SchemaVersion="2.0">\n                        <ds:TopLevelCode>B</ds:TopLevelCode>\n                        <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                        <ds:ThirdLevelCode>EF</ds:ThirdLevelCode>\n                        <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                        <ds:OrganisationUnitCode>B01EF01</ds:OrganisationUnitCode>\n                    </ds:SourceOrganisation>\n                    <ds:CourtType>MCA</ds:CourtType>\n                    <ds:ResultHearingType Literal="Other">OTHER</ds:ResultHearingType>\n                    <ds:ResultHearingDate>2011-10-01</ds:ResultHearingDate>\n                    <ds:Duration>\n                        <ds:DurationType>Duration</ds:DurationType>\n                        <ds:DurationUnit>L</ds:DurationUnit>\n                        <ds:DurationLength>1</ds:DurationLength>\n                    </ds:Duration>\n                    <ds:PleaStatus Literal="Not Guilty">NG</ds:PleaStatus>\n                    <ds:Verdict Literal="Guilty">G</ds:Verdict>\n                    <ds:ModeOfTrialReason Literal="Summary only">SUM</ds:ModeOfTrialReason>\n                    <ds:ResultVariableText>Disqualified from keeping Sea Monkey for life. Tried to eat the Sea MonkeyEND</ds:ResultVariableText>\n                    <ds:ResultHalfLifeHours>72</ds:ResultHalfLifeHours>\n                    <br7:PNCDisposalType>3025</br7:PNCDisposalType>\n                    <br7:ResultClass>Judgement with final result</br7:ResultClass>\n                </br7:Result>\n            </br7:Offence>\n            <br7:Offence hasError="true" SchemaVersion="4.0">\n                <ds:CriminalProsecutionReference SchemaVersion="2.0">\n                    <ds:DefendantOrOffender>\n                        <ds:Year>11</ds:Year>\n                        <ds:OrganisationUnitIdentifierCode SchemaVersion="2.0">\n                            <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                            <ds:ThirdLevelCode>ZD</ds:ThirdLevelCode>\n                            <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                            <ds:OrganisationUnitCode>01ZD01</ds:OrganisationUnitCode>\n                        </ds:OrganisationUnitIdentifierCode>\n                        <ds:DefendantOrOffenderSequenceNumber>00000410801</ds:DefendantOrOffenderSequenceNumber>\n                        <ds:CheckDigit>G</ds:CheckDigit>\n                    </ds:DefendantOrOffender>\n                    <ds:OffenceReason>\n                        <ds:OffenceCode>\n                            <ds:ActOrSource>TH</ds:ActOrSource>\n                            <ds:Year>68</ds:Year>\n                            <ds:Reason>010</ds:Reason>\n                        </ds:OffenceCode>\n                    </ds:OffenceReason>\n                    <ds:OffenceReasonSequence Error="HO100310"/>\n                </ds:CriminalProsecutionReference>\n                <ds:OffenceCategory Literal="Either Way">CE</ds:OffenceCategory>\n                <ds:ArrestDate>2010-09-25</ds:ArrestDate>\n                <ds:ChargeDate>2010-09-25</ds:ChargeDate>\n                <ds:ActualOffenceDateCode Literal="on or in">1</ds:ActualOffenceDateCode>\n                <ds:ActualOffenceStartDate>\n                    <ds:StartDate>2010-09-25</ds:StartDate>\n                </ds:ActualOffenceStartDate>\n                <ds:LocationOfOffence>1 Kingston High Street</ds:LocationOfOffence>\n                <ds:OffenceTitle>Theft from a shop</ds:OffenceTitle>\n                <ds:ActualOffenceWording>Theft from shop - shoplifting.</ds:ActualOffenceWording>\n                <ds:RecordableOnPNCindicator Literal="Yes">Y</ds:RecordableOnPNCindicator>\n                <ds:NotifiableToHOindicator Literal="Yes">Y</ds:NotifiableToHOindicator>\n                <ds:HomeOfficeClassification>046/00</ds:HomeOfficeClassification>\n                <ds:ConvictionDate>2011-10-01</ds:ConvictionDate>\n                <br7:CommittedOnBail Literal="Don\'t Know">D</br7:CommittedOnBail>\n                <br7:CourtOffenceSequenceNumber>2</br7:CourtOffenceSequenceNumber>\n                <br7:Result hasError="false" SchemaVersion="2.0">\n                    <ds:CJSresultCode>1002</ds:CJSresultCode>\n                    <ds:SourceOrganisation SchemaVersion="2.0">\n                        <ds:TopLevelCode>B</ds:TopLevelCode>\n                        <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                        <ds:ThirdLevelCode>EF</ds:ThirdLevelCode>\n                        <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                        <ds:OrganisationUnitCode>B01EF01</ds:OrganisationUnitCode>\n                    </ds:SourceOrganisation>\n                    <ds:CourtType>MCA</ds:CourtType>\n                    <ds:ResultHearingType Literal="Other">OTHER</ds:ResultHearingType>\n                    <ds:ResultHearingDate>2011-10-01</ds:ResultHearingDate>\n                    <ds:Duration>\n                        <ds:DurationType>Duration</ds:DurationType>\n                        <ds:DurationUnit>M</ds:DurationUnit>\n                        <ds:DurationLength>14</ds:DurationLength>\n                    </ds:Duration>\n                    <ds:PleaStatus Literal="Not Guilty">NG</ds:PleaStatus>\n                    <ds:Verdict Literal="Guilty">G</ds:Verdict>\n                    <ds:ModeOfTrialReason Literal="Summary only">SUM</ds:ModeOfTrialReason>\n                    <ds:ResultVariableText>Imprisonment for 14 MonthsImprisonment for 14 MonthsImprisoTRUNCated text lots of text</ds:ResultVariableText>\n                    <ds:ResultHalfLifeHours>72</ds:ResultHalfLifeHours>\n                    <br7:PNCDisposalType>1002</br7:PNCDisposalType>\n                    <br7:ResultClass>Judgement with final result</br7:ResultClass>\n                </br7:Result>\n                <br7:Result hasError="false" SchemaVersion="2.0">\n                    <ds:CJSresultCode>3107</ds:CJSresultCode>\n                    <ds:SourceOrganisation SchemaVersion="2.0">\n                        <ds:TopLevelCode>B</ds:TopLevelCode>\n                        <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                        <ds:ThirdLevelCode>EF</ds:ThirdLevelCode>\n                        <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                        <ds:OrganisationUnitCode>B01EF01</ds:OrganisationUnitCode>\n                    </ds:SourceOrganisation>\n                    <ds:CourtType>MCA</ds:CourtType>\n                    <ds:ResultHearingType Literal="Other">OTHER</ds:ResultHearingType>\n                    <ds:ResultHearingDate>2011-10-01</ds:ResultHearingDate>\n                    <ds:PleaStatus Literal="Not Guilty">NG</ds:PleaStatus>\n                    <ds:Verdict Literal="Guilty">G</ds:Verdict>\n                    <ds:ModeOfTrialReason Literal="Summary only">SUM</ds:ModeOfTrialReason>\n                    <ds:ResultVariableText>DEFENDANT MUST LIVE AT OUR HOUSE IN THE MIDDLE OF OUR STREET</ds:ResultVariableText>\n                    <ds:ResultHalfLifeHours>72</ds:ResultHalfLifeHours>\n                    <br7:PNCDisposalType>3107</br7:PNCDisposalType>\n                    <br7:ResultClass>Judgement with final result</br7:ResultClass>\n                </br7:Result>\n            </br7:Offence>\n        </br7:HearingDefendant>\n    </br7:Case>\n</br7:HearingOutcome>',
          AmendedHearingOutcome:
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<br7:HearingOutcome xmlns:br7="http://schemas.cjse.gov.uk/datastandards/BR7/2007-12" xmlns:ds="http://schemas.cjse.gov.uk/datastandards/2006-10" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n    <br7:Hearing SchemaVersion="4.0">\n        <ds:CourtHearingLocation SchemaVersion="2.0">\n            <ds:TopLevelCode>B</ds:TopLevelCode>\n            <ds:SecondLevelCode>01</ds:SecondLevelCode>\n            <ds:ThirdLevelCode>EF</ds:ThirdLevelCode>\n            <ds:BottomLevelCode>01</ds:BottomLevelCode>\n            <ds:OrganisationUnitCode>B01EF01</ds:OrganisationUnitCode>\n        </ds:CourtHearingLocation>\n        <ds:DateOfHearing>2011-10-01</ds:DateOfHearing>\n        <ds:TimeOfHearing>10:00</ds:TimeOfHearing>\n        <ds:HearingLanguage Literal="Don\'t Know">D</ds:HearingLanguage>\n        <ds:HearingDocumentationLanguage Literal="Don\'t Know">D</ds:HearingDocumentationLanguage>\n        <ds:DefendantPresentAtHearing Literal="Defendant was not present, but appeared by the presence of his/her barrister or solicitor">A</ds:DefendantPresentAtHearing>\n        <br7:SourceReference>\n            <br7:DocumentName>SPI Barry Bass</br7:DocumentName>\n            <br7:UniqueID>53ab5dea-ee8b-4420-bc70-664c520bce83</br7:UniqueID>\n            <br7:DocumentType>SPI Case Result</br7:DocumentType>\n        </br7:SourceReference>\n        <br7:CourtType Literal="MC adult">MCA</br7:CourtType>\n        <br7:CourtHouseCode>2576</br7:CourtHouseCode>\n        <br7:CourtHouseName>B01EF00</br7:CourtHouseName>\n    </br7:Hearing>\n    <br7:Case SchemaVersion="4.0">\n        <ds:PTIURN>01ZD0300208</ds:PTIURN>\n        <ds:PreChargeDecisionIndicator Literal="No">N</ds:PreChargeDecisionIndicator>\n        <ds:CourtCaseReferenceNumber>97/1626/008395Q</ds:CourtCaseReferenceNumber>\n        <br7:CourtReference>\n            <ds:MagistratesCourtReference>01ZD0300208</ds:MagistratesCourtReference>\n        </br7:CourtReference>\n        <br7:RecordableOnPNCindicator Literal="Yes">Y</br7:RecordableOnPNCindicator>\n        <br7:ForceOwner SchemaVersion="2.0">\n            <ds:SecondLevelCode>01</ds:SecondLevelCode>\n            <ds:ThirdLevelCode>ZD</ds:ThirdLevelCode>\n            <ds:BottomLevelCode>00</ds:BottomLevelCode>\n            <ds:OrganisationUnitCode>01ZD00</ds:OrganisationUnitCode>\n        </br7:ForceOwner>\n        <br7:HearingDefendant>\n            <br7:ArrestSummonsNumber>1101ZD0100000410801G</br7:ArrestSummonsNumber>\n            <br7:PNCIdentifier>2000/0410801G</br7:PNCIdentifier>\n            <br7:PNCCheckname>Bass</br7:PNCCheckname>\n            <br7:DefendantDetail>\n                <br7:PersonName>\n                    <ds:Title>Mr</ds:Title>\n                    <ds:GivenName NameSequence="1">Barry</ds:GivenName>\n                    <ds:FamilyName NameSequence="1">Bass</ds:FamilyName>\n                </br7:PersonName>\n                <br7:GeneratedPNCFilename>BASS/BARRY</br7:GeneratedPNCFilename>\n                <br7:BirthDate>1948-11-11</br7:BirthDate>\n                <br7:Gender Literal="male">1</br7:Gender>\n            </br7:DefendantDetail>\n            <br7:Address>\n                <ds:AddressLine1>ScenarioAE Address Line 1</ds:AddressLine1>\n                <ds:AddressLine2>ScenarioAE Address Line 2</ds:AddressLine2>\n                <ds:AddressLine3>ScenarioAE Address Line 3</ds:AddressLine3>\n            </br7:Address>\n            <br7:RemandStatus Literal="Unconditional Bail">UB</br7:RemandStatus>\n            <br7:Offence SchemaVersion="4.0">\n                <ds:CriminalProsecutionReference SchemaVersion="2.0">\n                    <ds:DefendantOrOffender>\n                        <ds:Year>11</ds:Year>\n                        <ds:OrganisationUnitIdentifierCode SchemaVersion="2.0">\n                            <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                            <ds:ThirdLevelCode>ZD</ds:ThirdLevelCode>\n                            <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                            <ds:OrganisationUnitCode>01ZD01</ds:OrganisationUnitCode>\n                        </ds:OrganisationUnitIdentifierCode>\n                        <ds:DefendantOrOffenderSequenceNumber>00000410801</ds:DefendantOrOffenderSequenceNumber>\n                        <ds:CheckDigit>G</ds:CheckDigit>\n                    </ds:DefendantOrOffender>\n                    <ds:OffenceReason>\n                        <ds:OffenceCode>\n                            <ds:ActOrSource>TH</ds:ActOrSource>\n                            <ds:Year>68</ds:Year>\n                            <ds:Reason>010</ds:Reason>\n                        </ds:OffenceCode>\n                    </ds:OffenceReason>\n                    <ds:OffenceReasonSequence>1</ds:OffenceReasonSequence>\n                </ds:CriminalProsecutionReference>\n                <ds:OffenceCategory Literal="Either Way">CE</ds:OffenceCategory>\n                <ds:ArrestDate>2010-09-25</ds:ArrestDate>\n                <ds:ChargeDate>2010-09-25</ds:ChargeDate>\n                <ds:ActualOffenceDateCode Literal="on or in">1</ds:ActualOffenceDateCode>\n                <ds:ActualOffenceStartDate>\n                    <ds:StartDate>2010-09-25</ds:StartDate>\n                </ds:ActualOffenceStartDate>\n                <ds:LocationOfOffence>1 Kingston High Street</ds:LocationOfOffence>\n                <ds:OffenceTitle>Theft from a shop</ds:OffenceTitle>\n                <ds:ActualOffenceWording>Theft from shop - shoplifting.</ds:ActualOffenceWording>\n                <ds:RecordableOnPNCindicator Literal="Yes">Y</ds:RecordableOnPNCindicator>\n                <ds:NotifiableToHOindicator Literal="Yes">Y</ds:NotifiableToHOindicator>\n                <ds:HomeOfficeClassification>046/00</ds:HomeOfficeClassification>\n                <ds:ConvictionDate>2011-10-01</ds:ConvictionDate>\n                <br7:CommittedOnBail Literal="Don\'t Know">D</br7:CommittedOnBail>\n                <br7:CourtOffenceSequenceNumber>1</br7:CourtOffenceSequenceNumber>\n                <br7:ManualSequenceNo Literal="Yes">Y</br7:ManualSequenceNo>\n                <br7:Result SchemaVersion="2.0">\n                    <ds:CJSresultCode>1002</ds:CJSresultCode>\n                    <ds:SourceOrganisation SchemaVersion="2.0">\n                        <ds:TopLevelCode>B</ds:TopLevelCode>\n                        <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                        <ds:ThirdLevelCode>EF</ds:ThirdLevelCode>\n                        <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                        <ds:OrganisationUnitCode>B01EF01</ds:OrganisationUnitCode>\n                    </ds:SourceOrganisation>\n                    <ds:CourtType>MCA</ds:CourtType>\n                    <ds:ResultHearingType Literal="Other">OTHER</ds:ResultHearingType>\n                    <ds:ResultHearingDate>2011-10-01</ds:ResultHearingDate>\n                    <ds:Duration>\n                        <ds:DurationType>Duration</ds:DurationType>\n                        <ds:DurationUnit>M</ds:DurationUnit>\n                        <ds:DurationLength>12</ds:DurationLength>\n                    </ds:Duration>\n                    <ds:PleaStatus Literal="Not Guilty">NG</ds:PleaStatus>\n                    <ds:Verdict Literal="Guilty">G</ds:Verdict>\n                    <ds:ModeOfTrialReason Literal="Summary only">SUM</ds:ModeOfTrialReason>\n                    <ds:ResultVariableText>Imprisonment for 12 Months</ds:ResultVariableText>\n                    <ds:ResultHalfLifeHours>72</ds:ResultHalfLifeHours>\n                    <br7:PNCDisposalType>1002</br7:PNCDisposalType>\n                    <br7:ResultClass>Judgement with final result</br7:ResultClass>\n                </br7:Result>\n                <br7:Result SchemaVersion="2.0">\n                    <ds:CJSresultCode>3025</ds:CJSresultCode>\n                    <ds:SourceOrganisation SchemaVersion="2.0">\n                        <ds:TopLevelCode>B</ds:TopLevelCode>\n                        <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                        <ds:ThirdLevelCode>EF</ds:ThirdLevelCode>\n                        <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                        <ds:OrganisationUnitCode>B01EF01</ds:OrganisationUnitCode>\n                    </ds:SourceOrganisation>\n                    <ds:CourtType>MCA</ds:CourtType>\n                    <ds:ResultHearingType Literal="Other">OTHER</ds:ResultHearingType>\n                    <ds:ResultHearingDate>2011-10-01</ds:ResultHearingDate>\n                    <ds:Duration>\n                        <ds:DurationType>Duration</ds:DurationType>\n                        <ds:DurationUnit>L</ds:DurationUnit>\n                        <ds:DurationLength>1</ds:DurationLength>\n                    </ds:Duration>\n                    <ds:PleaStatus Literal="Not Guilty">NG</ds:PleaStatus>\n                    <ds:Verdict Literal="Guilty">G</ds:Verdict>\n                    <ds:ModeOfTrialReason Literal="Summary only">SUM</ds:ModeOfTrialReason>\n                    <ds:ResultVariableText>Disqualified from keeping Sea Monkey for life. Tried to eat the Sea MonkeyEND</ds:ResultVariableText>\n                    <ds:ResultHalfLifeHours>72</ds:ResultHalfLifeHours>\n                    <br7:PNCDisposalType>3025</br7:PNCDisposalType>\n                    <br7:ResultClass>Judgement with final result</br7:ResultClass>\n                </br7:Result>\n            </br7:Offence>\n            <br7:Offence SchemaVersion="4.0">\n                <ds:CriminalProsecutionReference SchemaVersion="2.0">\n                    <ds:DefendantOrOffender>\n                        <ds:Year>11</ds:Year>\n                        <ds:OrganisationUnitIdentifierCode SchemaVersion="2.0">\n                            <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                            <ds:ThirdLevelCode>ZD</ds:ThirdLevelCode>\n                            <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                            <ds:OrganisationUnitCode>01ZD01</ds:OrganisationUnitCode>\n                        </ds:OrganisationUnitIdentifierCode>\n                        <ds:DefendantOrOffenderSequenceNumber>00000410801</ds:DefendantOrOffenderSequenceNumber>\n                        <ds:CheckDigit>G</ds:CheckDigit>\n                    </ds:DefendantOrOffender>\n                    <ds:OffenceReason>\n                        <ds:OffenceCode>\n                            <ds:ActOrSource>TH</ds:ActOrSource>\n                            <ds:Year>68</ds:Year>\n                            <ds:Reason>010</ds:Reason>\n                        </ds:OffenceCode>\n                    </ds:OffenceReason>\n                    <ds:OffenceReasonSequence>2</ds:OffenceReasonSequence>\n                </ds:CriminalProsecutionReference>\n                <ds:OffenceCategory Literal="Either Way">CE</ds:OffenceCategory>\n                <ds:ArrestDate>2010-09-25</ds:ArrestDate>\n                <ds:ChargeDate>2010-09-25</ds:ChargeDate>\n                <ds:ActualOffenceDateCode Literal="on or in">1</ds:ActualOffenceDateCode>\n                <ds:ActualOffenceStartDate>\n                    <ds:StartDate>2010-09-25</ds:StartDate>\n                </ds:ActualOffenceStartDate>\n                <ds:LocationOfOffence>1 Kingston High Street</ds:LocationOfOffence>\n                <ds:OffenceTitle>Theft from a shop</ds:OffenceTitle>\n                <ds:ActualOffenceWording>Theft from shop - shoplifting.</ds:ActualOffenceWording>\n                <ds:RecordableOnPNCindicator Literal="Yes">Y</ds:RecordableOnPNCindicator>\n                <ds:NotifiableToHOindicator Literal="Yes">Y</ds:NotifiableToHOindicator>\n                <ds:HomeOfficeClassification>046/00</ds:HomeOfficeClassification>\n                <ds:ConvictionDate>2011-10-01</ds:ConvictionDate>\n                <br7:CommittedOnBail Literal="Don\'t Know">D</br7:CommittedOnBail>\n                <br7:CourtOffenceSequenceNumber>2</br7:CourtOffenceSequenceNumber>\n                <br7:ManualSequenceNo Literal="Yes">Y</br7:ManualSequenceNo>\n                <br7:Result SchemaVersion="2.0">\n                    <ds:CJSresultCode>1002</ds:CJSresultCode>\n                    <ds:SourceOrganisation SchemaVersion="2.0">\n                        <ds:TopLevelCode>B</ds:TopLevelCode>\n                        <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                        <ds:ThirdLevelCode>EF</ds:ThirdLevelCode>\n                        <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                        <ds:OrganisationUnitCode>B01EF01</ds:OrganisationUnitCode>\n                    </ds:SourceOrganisation>\n                    <ds:CourtType>MCA</ds:CourtType>\n                    <ds:ResultHearingType Literal="Other">OTHER</ds:ResultHearingType>\n                    <ds:ResultHearingDate>2011-10-01</ds:ResultHearingDate>\n                    <ds:Duration>\n                        <ds:DurationType>Duration</ds:DurationType>\n                        <ds:DurationUnit>M</ds:DurationUnit>\n                        <ds:DurationLength>14</ds:DurationLength>\n                    </ds:Duration>\n                    <ds:PleaStatus Literal="Not Guilty">NG</ds:PleaStatus>\n                    <ds:Verdict Literal="Guilty">G</ds:Verdict>\n                    <ds:ModeOfTrialReason Literal="Summary only">SUM</ds:ModeOfTrialReason>\n                    <ds:ResultVariableText>Imprisonment for 14 MonthsImprisonment for 14 MonthsImprisoTRUNCated text lots of text</ds:ResultVariableText>\n                    <ds:ResultHalfLifeHours>72</ds:ResultHalfLifeHours>\n                    <br7:PNCDisposalType>1002</br7:PNCDisposalType>\n                    <br7:ResultClass>Judgement with final result</br7:ResultClass>\n                </br7:Result>\n                <br7:Result SchemaVersion="2.0">\n                    <ds:CJSresultCode>3107</ds:CJSresultCode>\n                    <ds:SourceOrganisation SchemaVersion="2.0">\n                        <ds:TopLevelCode>B</ds:TopLevelCode>\n                        <ds:SecondLevelCode>01</ds:SecondLevelCode>\n                        <ds:ThirdLevelCode>EF</ds:ThirdLevelCode>\n                        <ds:BottomLevelCode>01</ds:BottomLevelCode>\n                        <ds:OrganisationUnitCode>B01EF01</ds:OrganisationUnitCode>\n                    </ds:SourceOrganisation>\n                    <ds:CourtType>MCA</ds:CourtType>\n                    <ds:ResultHearingType Literal="Other">OTHER</ds:ResultHearingType>\n                    <ds:ResultHearingDate>2011-10-01</ds:ResultHearingDate>\n                    <ds:PleaStatus Literal="Not Guilty">NG</ds:PleaStatus>\n                    <ds:Verdict Literal="Guilty">G</ds:Verdict>\n                    <ds:ModeOfTrialReason Literal="Summary only">SUM</ds:ModeOfTrialReason>\n                    <ds:ResultVariableText>DEFENDANT MUST LIVE AT OUR HOUSE IN THE MIDDLE OF OUR STREET</ds:ResultVariableText>\n                    <ds:ResultHalfLifeHours>72</ds:ResultHalfLifeHours>\n                    <br7:PNCDisposalType>3107</br7:PNCDisposalType>\n                    <br7:ResultClass>Judgement with final result</br7:ResultClass>\n                </br7:Result>\n            </br7:Offence>\n        </br7:HearingDefendant>\n    </br7:Case>\n</br7:HearingOutcome>',
          RecordAmendedFlag: "true"
        },
        eventType: "Amended Hearing Outcome Submitted",
        category: "information",
        timestamp: "2021-10-14T13:59:40.470Z"
      },
      {
        s3Path: "2021/9/4/13/59/GeneralEvent-ecdbc181-d358-40d4-8fd2-770d44f89b45.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorHandlerScreenFlow",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {},
        eventType: "Resubmission to Publisher",
        category: "information",
        timestamp: "2021-10-14T13:59:40.476Z"
      },
      {
        s3Path: "2021/9/4/13/59/GeneralEvent-75149988-c9af-40e7-a339-b50d0582e6e9.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorListManager",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Trigger and Exception Flag": "true",
          "Trigger Type": "TRPS0002",
          "Trigger 1 Details": "TRPS0002",
          "Number of Triggers": "1"
        },
        eventType: "Trigger generated",
        category: "information",
        timestamp: "2021-10-14T13:59:40.957Z"
      }
    ],
    lastEventType: "Trigger generated",
    messageId: "53ab5dea-ee8b-4420-bc70-664c520bce83",
    receivedDate: "2021-10-14T13:59:00.000Z",
    status: "Processing",
    externalCorrelationId: "CID-a28b5554-8d75-4b6c-a820-129ee6ecefba",
    caseId: "01ZD0300208",
    topExceptionsReport: {
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
      ]
    }
  },
  {
    version: 9,
    events: [
      {
        eventSource: "Incoming Message Handler",
        attributes: {},
        eventType: "Message Sent to Bichard",
        category: "information",
        timestamp: "2021-10-14T13:57:30.869Z"
      },
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
          "Force Owner": "0014FS",
          "Message Type": "SPIResults",
          "Error 2 Details": "HO100310||ds:OffenceReasonSequence",
          "Error 1 Details": "HO100310||ds:OffenceReasonSequence"
        },
        eventType: "Hearing Outcome passed to Error List",
        category: "information",
        timestamp: "2021-10-14T13:57:31.022Z"
      },
      {
        s3Path: "2021/9/4/13/57/GeneralEvent-196946e5-48ae-4401-b6e9-aed34441d5d9.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "Hearing Outcome Publication Choreography",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Requesting System Org Unit Code": "Z000000",
          "Requesting System Name": "CJSE",
          "External Correlation Identifier": "0aec9c96-196b-4cf7-ba97-043f9443f639"
        },
        eventType: "Message Received",
        category: "information",
        timestamp: "2021-10-14T13:57:30.810Z"
      },
      {
        s3Path: "2021/9/4/13/57/GeneralEvent-ef73b0a7-ed49-499d-8d68-635ea6f6c0c9.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorHandlerScreenFlow",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {},
        eventType: "Exception locked",
        category: "information",
        timestamp: "2021-10-14T13:57:35.565Z"
      },
      {
        s3Path: "2021/9/4/13/57/GeneralEvent-8aca6dfb-a9cd-4859-b381-668e31b2b6bd.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorHandlerScreenFlow",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {},
        eventType: "Resubmission to Publisher",
        category: "information",
        timestamp: "2021-10-14T13:57:36.715Z"
      },
      {
        s3Path: "2021/9/4/13/57/GeneralEvent-16fa99d0-a5f6-42b3-bae0-95124246e407.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "PNC ASN-Based Update Choreography",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {},
        eventType: "Hearing Outcome message received",
        category: "information",
        timestamp: "2021-10-14T13:57:37.216Z"
      },
      {
        s3Path: "2021/9/4/13/57/GeneralEvent-5370e731-69a7-4d16-87d5-d06512e2a692.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "PNC Access Manager",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: { "PNC Request Type": "DISARR", "PNC Attempts Made": "3", "PNC Response Time": "70" },
        eventType: "PNC Response received",
        category: "information",
        timestamp: "2021-10-14T13:57:37.368Z"
      },
      {
        s3Path: "2021/9/4/13/57/GeneralEvent-d26c84fe-2ea7-47d6-908a-05a2ee3ff3d7.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "ErrorListManager",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Trigger and Exception Flag": "true",
          "Trigger Type": "TRPS0002",
          "Trigger 1 Details": "TRPS0002",
          "Number of Triggers": "1"
        },
        eventType: "Trigger generated",
        category: "information",
        timestamp: "2021-10-14T13:57:37.489Z"
      },
      {
        s3Path: "2021/9/4/13/57/GeneralEvent-29b6202a-eb4d-4c63-9e43-751efee7815b.xml",
        eventSourceArn:
          "arn:aws:mq:eu-west-2:108839434327:broker:cjse-emad-bichard-7-amq:b-deda4101-9cb9-4ac1-993b-a0ac4bbc253e",
        eventSource: "PNC ASN-Based Update Choreography",
        eventSourceQueueName: "GENERAL_EVENT_QUEUE",
        attributes: {
          "Number Of Offences": "2",
          "Operation Code": "DISARR",
          "Number of Operations": "1",
          ASN: "1101ZD0100000410801G"
        },
        eventType: "PNC Update applied successfully",
        category: "information",
        timestamp: "2021-10-14T13:57:37.521Z"
      }
    ],
    lastEventType: "PNC Update applied successfully",
    messageId: "0aec9c96-196b-4cf7-ba97-043f9443f639",
    receivedDate: "2021-10-14T13:57:00.000Z",
    status: "Completed",
    externalCorrelationId: "CID-562836bd-8ce8-4b64-b23f-0399f2a8280c",
    caseId: "01ZD0300208",
    topExceptionsReport: {
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
            "Force Owner": "0014FS",
            "Message Type": "SPIResults",
            "Error 2 Details": "HO100310||ds:OffenceReasonSequence",
            "Error 1 Details": "HO100310||ds:OffenceReasonSequence"
          },
          eventType: "Hearing Outcome passed to Error List",
          category: "information",
          timestamp: "2021-10-14T13:57:31.022Z"
        }
      ]
    }
  }
] as unknown as AuditLog[]

it("should generate the correct report", () => {
  const report = generateReport(messages)

  expect(report).toMatchSnapshot()
})
