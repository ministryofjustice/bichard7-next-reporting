const resources = `
##################################################################
# Mapping of internal codes and labels to be displayed on Portal 
##################################################################



############################################
# Summary List Screen
############################################

#Column Headings
br7.summary.heading.court.date=Court Date
br7.summary.heading.ptiurn=PTIURN
br7.summary.heading.name=Name
br7.summary.heading.court=Court
br7.summary.heading.reason=Reason
br7.summary.heading.urgent=Urgent
br7.summary.heading.locked=Locked by
br7.summary.heading.type=Type
br7.summary.heading.quality.status=QA Status

#RCD357 - change the type column to the notes column.
br7.summary.heading.note=Note
br7.length.of.hover=100

#Filters
br7.summary.filter.type.label=Record Type
br7.summary.filter.type.exception=Exceptions
br7.summary.filter.type.trigger=Triggers
br7.summary.filter.type.both=All
br7.summary.filter.urgency.label=Urgency
br7.summary.filter.urgency.urgent.and.nonurgent=Urgent And Non Urgent
br7.summary.filter.urgency.urgent=Urgent
br7.summary.filter.status.label=State
br7.summary.filter.status.unresolved=Unresolved
br7.summary.filter.status.resolved=Resolved

br7.summary.filter.court.date.label=Court Date:
br7.summary.filter.court.date.from.label=From
br7.summary.filter.court.date.to.label=To

br7.summary.filter.unlocked.only.label=View unlocked only
br7.summary.filter.my.records.label=View my records

br7.summary.filter.allocate.method.selected=Selected records only
br7.summary.filter.allocate.method.top.record=Top unallocated record
br7.summary.filter.allocate.method.5.records=Top 5 unallocated records
br7.summary.filter.allocate.method.10.records=Top 10 unallocated records
br7.summary.filter.allocate.method.20.records=Top 20 unallocated records
br7.summary.filter.allocate.method.all.records=All unallocated records shown

br7.summary.allocation.method.label=Allocation method
br7.summary.allocation.users.label=Allocate to

br7.summary.search.defendant=Defendant Search
br7.summary.search.court=Court Search
br7.summary.search.reason=Reason Search

br7.summary.type.exception.label=Ex
br7.summary.type.trigger.label=Tr

br7.details.quality.status.unchecked=
br7.details.quality.status.passed=Passed
br7.details.quality.status.failed=Failed

br7.summary.you.are.viewing=You are viewing
br7.summary.of=of
br7.summary.records=Records

#Titles for input controls
br7.summary.label.title.from.day=From Day
br7.summary.label.title.from.month=From Month
br7.summary.label.title.from.year=From Year
br7.summary.label.title.to.day=To Day
br7.summary.label.title.to.month=To Month
br7.summary.label.title.to.year=To Year

#Buttons
br7.summary.button.refresh=Refresh
br7.summary.button.allocate=Allocate

br7.summary.label.title.allocate.checkbox=Allocate
br7.summary.screen.manual.refresh=Retrieving results...Click here if page does not load.

############################################
# Mark As Resolved Screen
############################################

#Drop-down list label

br7.resolved.label=Select Resolution Action
br7.resolved.enter.further.details.label=Enter further details

#Drop-down list options
#br700002420 additional indicators added to specify if 
#1. the list item should be shown in the list, and
#2. if the list item requires a mandatory entry on the reason text field
br7.resolved.default=Select Option...
#option 1:
br7.resolved.trigger.action.performed=Trigger activity performed
#option 2:
br7.resolved.updated.disposal.pnc.manually=Updated disposal(s) manually on PNC
#option 3:
br7.resolved.updated.remand.pnc.manually=Updated remand(s) manually on PNC
#option 4:
br7.resolved.updated.disposal.remand.pnc.manually=Updated disposal(s) and remand(s) manually on PNC
#option 5:
br7.resolved.no.action.pnc.has.accurate.results=PNC record already has accurate results
#option 6:
br7.resolved.trigger.checked.no.action=Trigger checked and no manual PNC update needed
#option 7:
br7.resolved.action.technical.support=Resolved by technical support
#option 8: (NB for br700002008, an extra key was added to distinguish between the general description
# of this action and the instruction that is displayed to the user) 
br7.resolved.other.action=Other
br7.resolved.other.action.user.instruction=Other (Specify below)
#br700002420 additional reason: option 9:
br7.resolved.nonrecordable.outcome=Hearing outcome is non-recordable - no PNC update required
#br700002420 additional reason: option 10:
br7.resolved.passed.elsewhere=Passed to another force/area/prosecutor/dept (specify below)

#Buttons
br7.resolved.ok=OK
br7.resolved.cancel=Cancel

#Error Messages
br7.resolved.reason.text.required=Please complete the 'Further Details' section
br7.resolved.reason.code.required=Please select the Resolution Action

############################################
# Reallocate Case Screen
############################################

#Input field label
br7.reallocate.action.label=Select New Force 

#Input field title
br7.reallocate.action.title=Select New Force

#Buttons
br7.reallocate.ok=OK
br7.reallocate.cancel=Cancel

#Error Messages
br7.reallocate.new.forceowner.required=Please select a new force from the list.
br7.reallocate.new.forceowner.identical=The force you selected is identical to the previous force. Please select another.

#Drop-down list options
br7.reallocate.default=Select Force...
br7.reallocate.valid.forces=01:Metropolitan Police Service,02:Reserved (for London),03:Cumbria Constabulary,04:Lancashire Constabulary,05:Merseyside Police,06:Greater Manchester Police,07:Cheshire Police,10:Northumbria Police,11:Durham Constabulary,12:North Yorkshire Police,13:West Yorkshire Police,14:South Yorkshire Police,16:Humberside Police,17:Cleveland Police,20:West Midlands Police,21:Staffordshire Police,22:West Mercia Constabulary,23:Warwickshire Police,24:MOD Police,30:Derbyshire Constabulary,31:Nottinghamshire Police,32:Lincolnshire Police,33:Leicestershire Constabulary,34:Northamptonshire Police,35:Cambridgeshire Constabulary,36:Norfolk Constabulary,37:Suffolk Constabulary,40:Bedfordshire Police,41:Hertfordshire Constabulary,42:Essex Police,43:Thames Valley Police,44:Hampshire Constabulary,45:Surrey Police,46:Kent Police,47:Sussex Police,48:City of London Police,50:Devon & Cornwall Constabulary,52:Avon and Somerset Constabulary,53:Gloucestershire Constabulary,54:Wiltshire Constabulary,55:Dorset Police,60:North Wales Police,61:Gwent Police,62:South Wales Police,63:Dyfed-Powys Police,88:HMRC,89:UK Central Authority for Exchange of Criminal Records,93:British Transport Police

############################################
# Confirm Save Screen
############################################

#Buttons
br7.confirm.save.yes=Yes
br7.confirm.save.no=No

#Labels
br7.confirm.save.label=Do you want to save your updates before returning to the Summary List?

############################################
# Confirm Submit Screen
############################################

#Buttons
br7.confirm.submit.ok=OK
br7.confirm.submit.cancel=Cancel

#Labels
br7.confirm.submit.label=Are you sure you want to submit the amended details to the PNC and mark the Exception as resolved?
br7.confirm.submit.message.not.changed=NOTE: The Exception has not been updated. If you want to submit anyway, acknowledge this message before pressing 'OK'
br7.confirm.submit.message.not.changed.acknowledgement=I still want to resubmit the unchanged message
br7.confirm.submit.acknowldgement.required=You must acknowledge that the message has not changed before submitting

############################################
# Quality Check Screen
############################################

br7.quality.set.quality=Set Quality Status
br7.quality.1=Not checked
br7.quality.2=Pass
br7.quality.3=Fail
br7.quality.4=Partial Pass (Not all Triggers)
br7.quality.5=Manual Disposal Pass
br7.quality.6=Manual Disposal Fail
br7.quality.7=Remand Pass
br7.quality.8=Remand Fail

br7.quality.ok=OK
br7.quality.cancel=Cancel

############################################
# Exception Details Screen
############################################

#Summary labels
br7.details.summary.asn=ASN
br7.details.summary.dob=DOB
br7.details.summary.name=Name
br7.details.summary.pncid=PNCID
#br700002941 - RCD 684 - New summary labels for the record summary
br7.details.summary.hearingdate=DOH
br7.details.summary.ljacode=LJA
br7.details.summary.lockedby=Locked&nbsp;By

#Tabs
br7.details.tab.hearing=Hearing
br7.details.tab.case=Case
br7.details.tab.defendant=Defendant
br7.details.tab.offences=Offences
br7.details.tab.pncerrors=PNC Errors
br7.details.tab.triggers=Triggers
br7.details.tab.notes=Notes

#Buttons
br7.details.button.submit=Submit
br7.details.button.mark.as.resolved=Mark As Manually Resolved
br7.details.button.reallocate.case=Reallocate Case
br7.details.button.return.to.list.unlock=Return To List (Unlock)
br7.details.button.return.to.list.lock=Return To List (Lock)
br7.details.button.return.to.list=Return To List
br7.details.button.set.trigger.quality.check=Set Trigger Quality
br7.details.button.set.error.quality.check=Set Exception Quality

#Titles for input controls
br7.details.label.title.field.correction=Amend data
br7.details.label.title.new.note=Add note
br7.details.label.title.complete.trigger=Mark this trigger as complete

#Details page column headings
br7.details.column.name=Name
br7.details.column.value=Value
br7.details.column.error=Error
br7.details.column.correction=Correction

#Details page field labels values
br7.locked.short=Locked
br7.recordtype.short.exception=Ex
br7.recordtype.short.trigger=Tr
br7.resolutionstatus.1=Unresolved
br7.resolutionstatus.2=Resolved
br7.resolutionstatus.3=Submitted

#Hearing page
br7.element.hearing.courtlocation=Court location
br7.element.hearing.date=Date of Hearing
br7.element.hearing.time=Time of Hearing
br7.element.hearing.language=Hearing Language
br7.element.hearing.documentationlanguage= Documentation Language
br7.element.hearing.defendantpresent=Defendant Present
br7.element.hearing.reportrequested=Report Requested Date
br7.element.hearing.reportcompleted=Report Completed Date
br7.element.hearing.sourcereference.docname=Source Ref Doc Name
br7.element.hearing.sourcereference.refid=Source Reference Id
br7.element.hearing.sourcereference.doctype=Source Ref Doc Type
br7.element.hearing.sourcereference.timestamp=Source Ref Timestamp 
br7.element.hearing.sourcereference.version=Source Ref Version
br7.element.hearing.sourcereference.security=Source Ref Security 
br7.element.hearing.sourcereference.sellby=Source Ref Sell By Date
br7.element.hearing.sourcereference.stylesheet=Source Ref Stylesheet 
br7.element.hearing.sourcereference.welsh=Source Ref Welsh
br7.element.hearing.sourcereference.docinfo=Source Ref Doc Info


br7.element.hearing.courttype=Court Type
br7.element.hearing.courthousecode=LJA Code
br7.element.hearing.courthousename=Court Name    					      
						      
#Case page					      
br7.element.case.cpsorg=CPS Org			      
br7.element.case.ptiurn=PTIURN	
br7.element.case.forceowner=Force Owner			      
br7.element.case.casemarker=Case Marker
br7.element.case.predecisionind=Pre Decision Ind
br7.element.case.courtcasereferencenumber=Court Case Ref	      
br7.element.case.courtreference=Court Ref	
br7.element.case.recordable=Notifiable to PNC
br7.element.case.urgent=Urgent	
br7.element.case.urgency=Urgency
br7.element.case.penaltynoticecaseref=Penalty Notice Case Reference	
br7.element.case.courtofappealresult=Court of Appeal Result	
						      
#Defendant page
br7.element.defendant.asn=ASN
br7.element.defendant.pncid=PNCID
br7.element.defendant.cronumber=CRO Number
br7.element.defendant.drivernumber=Driver Number
br7.element.defendant.courtpncid=Court PNCID
br7.element.defendant.pnccheckname=PNC Checkname
br7.element.defendant.orgname=Organisation
br7.element.defendant.pncfilename=PNC Filename
br7.element.defendant.birthdate=Birthdate
br7.element.defendant.gender=Gender
br7.element.defendant.remandstatus=Remand Status
br7.element.defendant.bailcondition=Bail Condition
br7.element.defendant.bailreason=Bail Reason
br7.element.defendant.addressline1=Address Line 1
br7.element.defendant.addressline2=Address Line 2
br7.element.defendant.addressline3=Address Line 3
br7.element.defendant.addressline4=Address Line 4
br7.element.defendant.addressline5=Address Line 5
br7.element.defendant.addresspostcode=Postcode
br7.element.defendant.addresscountry=Country
br7.element.defendant.personnametitle=Title
br7.element.defendant.personnamegiven=Given Name
br7.element.defendant.personnamefamily=Family Name
br7.element.defendant.personnamesuffix=Suffix

# br700002443 added texts for defendant-level results.
br7.element.defendant.result=Result
br7.element.defendant.result.cjsresultcode=CJS Code
br7.element.defendant.result.resultapplicablequalifiercode=Result Applicable Qualifier Code
br7.element.defendant.result.offenceremandstatus=Offence Remand Status
br7.element.defendant.result.convictingcourt=Convicting Court
br7.element.defendant.result.resulthearingtype=Result Hearing Type
br7.element.defendant.result.resulthearingdate=Result Hearing Date
br7.element.defendant.result.bailcondition=Bail Condition
br7.element.defendant.result.durationunit=Duration Unit
br7.element.defendant.result.durationtype=Duration Type
br7.element.defendant.result.durationlength=Duration Length
br7.element.defendant.result.datespecifiedinresult=Date Specified In Result
br7.element.defendant.result.timespecifiedinresult=Time Specified In Result
br7.element.defendant.result.amountspecifiedinresult=Amount Specified In Result
br7.element.defendant.result.numberspecifiedinresult=Number Specified In Result
br7.element.defendant.result.nextresultsourceorganisation=Next Hearing location
br7.element.defendant.result.nextcourttype=Next Court Type
br7.element.defendant.result.nexthearingtime=Next Hearing Time
br7.element.defendant.result.nexthearingdate=Next Hearing Date
br7.element.defendant.result.pleastatus=Plea
br7.element.defendant.result.verdict=Verdict
br7.element.defendant.result.modeoftrialreason=Mode Of Trial Reason
br7.element.defendant.result.resultvariabletext=Text
br7.element.defendant.result.targetcourttype=Target Court Yype
br7.element.defendant.result.warrantissuedate=Warrant Issue Date
br7.element.defendant.result.crestdisposalcode=Crest Disposal Code
br7.element.defendant.result.pncdisposaltype=PNC Disposal Type
br7.element.defendant.result.resultclass=Result Class
br7.element.defendant.result.urgent=Urgent
br7.element.defendant.result.urgency=Urgency
br7.element.defendant.result.pncadjudicationexists=PNC Adjudication Exists
br7.element.defendant.result.numberofoffencestic=Number Of Offences TIC
br7.element.defendant.result.reasonforoffencebailcondition=Reason For Offence Bail Condition
br7.element.defendant.result.resultqualifiervariable.text=Text
br7.element.defendant.result.resultqualifiervariable.code=Code
br7.element.defendant.result.resultqualifiervariable.duration.type=Duration Type
br7.element.defendant.result.resultqualifiervariable.duration.unit=Duration Unit
br7.element.defendant.result.resultqualifiervariable.duration.length=Duration Length
br7.element.defendant.result.resultqualifier=Qualifier


#Offences page (column headings)
br7.details.offence=Offence
br7.details.offences.date=Date
br7.details.offences.code=Code
br7.details.offences.title=Title
br7.details.offences.number=#

#Offences page (buttons)
br7.details.button.previous.offence=Previous Offence
br7.details.button.next.offence=Next Offence

#Offence page

br7.element.offence=Offence
br7.element.offence.committedonbail=Committed On Bail
br7.element.offence.courtcasereferencenumber=Court Case Ref	      
br7.element.offence.offencereasonsequence=Sequence Number
br7.element.offence.result.nexthearingdate=Next Hearing Date
br7.element.offence.result.nextresultsourceorganisation= Next Hearing location
br7.element.offence.defenderoffenderyear=Defendant/Offender ASN Year
br7.element.offence.defenderoffenderoucode=Defendant/Offender ASN Org Code
br7.element.offence.defenderoffendercheckdigit=Defendant/Offender ASN Check Digit
br7.element.offence.defenderoffendersequencenumber=Defendant/Offender ASN Sequence Number
br7.element.offence.code=Offence Code
br7.element.offence.offencecategory=Category
br7.element.offence.offenceinitiationcode=Initiation Code
br7.element.offence.summonscode=Summons Code
br7.element.offence.informant=Informant
br7.element.offence.arrestdate=Arrest Date
br7.element.offence.chargedate=Charge Date
br7.element.offence.actualoffencedatecode=Date Code
br7.element.offence.actualoffencestartdate=Start Date
br7.element.offence.actualoffenceenddate=End Date
br7.element.offence.locationofoffence=Location
br7.element.offence.offencetitle=Title
br7.element.offence.offencewelshtitle=Welsh Title
br7.element.offence.actualdefencewording=Wording
br7.element.offence.actualwelshdefencewording=Welsh Wording
br7.element.offence.actualindictmentwording=Indictment Wording
br7.element.offence.actualwelshindictmentwording=Welsh Indictment Wording
br7.element.offence.actualstatementoffacts=Statement Of Facts
br7.element.offence.actualwelshstatementoffacts=Welsh Statement Of Facts
br7.element.offence.recordonpncindicator=Record On PNC
br7.element.offence.notifiabletohoindicator=Notifiable to Home Office
br7.element.offence.homeofficeclassification=Home Office Classification
br7.element.offence.alcohollevel=Alcohol Level
br7.element.offence.vehicleregistrationmark=Vehicle Registration
br7.element.offence.vehiclecode=Vehicle Code
br7.element.offence.offencetime=Offence Time
br7.element.offence.starttime=Start Time
br7.element.offence.offenceendtime=Offence End Time
br7.element.offence.convictiondate=Conviction Date
br7.element.offence.addedbythecourt=Added by the Court
br7.element.offence.courtoffencesequencenumber=Court Offence Sequence Number
br7.element.offence.appealresult=Appeal Result

br7.element.offence.result=Result
br7.element.offence.result.cjsresultcode=CJS Code
br7.element.offence.result.resultapplicablequalifiercode=Result Applicable Qualifier Code
br7.element.offence.result.offenceremandstatus=Offence Remand Status
br7.element.offence.result.convictingcourt=Convicting Court
br7.element.offence.result.resulthearingtype=Result Hearing Type
br7.element.offence.result.resulthearingdate=Result Hearing Date
#br700002931 - RCD 410 - Element br7.element.offence.result.bailcondition=Bail Condition removed as no longer displayed
br7.element.offence.result.durationunit=Duration Unit
br7.element.offence.result.durationtype=Duration Type
br7.element.offence.result.durationlength=Duration Length
br7.element.offence.result.datespecifiedinresult=Date Specified In Result
br7.element.offence.result.timespecifiedinresult=Time Specified In Result
br7.element.offence.result.amountspecifiedinresult=Amount Specified In Result
br7.element.offence.result.numberspecifiedinresult=Number Specified In Result
br7.element.offence.result.nextcourttype=Next Court Type
br7.element.offence.result.nexthearingtime=Next Hearing Time
br7.element.offence.result.pleastatus=Plea
br7.element.offence.result.verdict=Verdict
br7.element.offence.result.modeoftrialreason=Mode Of Trial Reason
br7.element.offence.result.resultvariabletext=Text
br7.element.offence.result.targetcourttype=Target Court Yype
br7.element.offence.result.warrantissuedate=Warrant Issue Date
br7.element.offence.result.crestdisposalcode=Crest Disposal Code
br7.element.offence.result.pncdisposaltype=PNC Disposal Type
br7.element.offence.result.resultclass=Result Class
br7.element.offence.result.urgent=Urgent
br7.element.offence.result.urgency=Urgency
br7.element.offence.result.pncadjudicationexists=PNC Adjudication Exists
br7.element.offence.result.numberofoffencestic=Number Of Offences TIC
br7.element.offence.result.reasonforoffencebailcondition=Reason For Offence Bail Condition
br7.element.offence.result.resultqualifiervariable.text=Text
br7.element.offence.result.resultqualifiervariable.code=Code
br7.element.offence.result.resultqualifiervariable.duration.type=Duration Type
br7.element.offence.result.resultqualifiervariable.duration.unit=Duration Unit
br7.element.offence.result.resultqualifiervariable.duration.length=Duration Length
br7.element.offence.result.resultqualifier=Qualifier

#Notes page
br7.details.notes.note=Note
br7.details.notes.timestamp=Timestamp
br7.details.notes.user=User
br7.details.notes.addbutton=Add Note

#PNC errors page
br7.details.pncerrors.error=Error
br7.details.pncerrors.warning=Warning
br7.details.pncerrors.successful=Successful Messages
br7.details.pncerrors.failed=Failed Message
br7.details.pncerrors.outstanding=Outstanding Messages

#Triggers page
br7.details.triggers.column.description=Trigger
br7.details.triggers.column.offence=Offence
br7.details.triggers.column.status=Status
br7.details.triggers.status.outstanding=Outstanding
br7.details.triggers.status.complete=Complete
br7.details.button.marked.triggers.as.complete=Mark Selected Complete
br7.details.button.select.all.triggers=Select All Triggers

#PNC details
br7.details.pnc.details=PNC Details ({0})
br7.details.pnc.no.details.retrieved=No details retrieved from PNC
br7.details.pnc.no.details.shown=No details from PNC shown
br7.details.pnc.column.name=Name
br7.details.pnc.column.value=Value
br7.details.pnc.courtcaseref=Court Case Ref
br7.details.pnc.crimeoffenceref=Crime Offence Ref
br7.details.pnc.penaltynoticecaseref=Penalty Notice Case Reference
br7.details.pnc.offence.heading=Offence
br7.details.pnc.offence.acpocode=ACPO Code
br7.details.pnc.offence.cjscode=CJS Code
br7.details.pnc.offence.title=Title
br7.details.pnc.offence.qualifier1=Qualifier 1
br7.details.pnc.offence.qualifier2=Qualifier 2
br7.details.pnc.offence.refnumber=Sequence Number
br7.details.pnc.offence.startdate=Start Date
br7.details.pnc.offence.starttime=Start Time
br7.details.pnc.offence.enddate=End Date
br7.details.pnc.offence.endtime=End Time

br7.details.pnc.abj.title=Adjudication
br7.details.pnc.adj.adjudication1=Adjudication 1
br7.details.pnc.adj.dateofsentence=Date Of Sentence
br7.details.pnc.adj.ticnumber=TIC Number
br7.details.pnc.adj.plea=Plea
br7.details.pnc.adj.weed=Weed Flag

br7.details.pnc.dis.title=Disposal
br7.details.pnc.dis.date=Date
br7.details.pnc.dis.duration=Duration
br7.details.pnc.dis.monetaryvalue=Monetary Value
br7.details.pnc.dis.unitsfined=Units Fined
br7.details.pnc.dis.qualifiers=Qualifiers
br7.details.pnc.dis.text=Text
br7.details.pnc.dis.type=Type

############################################
# Reporting Index Screen
############################################

br7.report.live.status.summary=Live Status Summary
br7.report.live.status.exception.detail=Live Status Detail - Exceptions
br7.report.live.status.trigger.detail=Live Status Detail - Triggers
br7.report.user.performance.summary.report=User Performance Summary
br7.report.user.performance.detail=User Performance Detail
br7.report.resolved.exceptions=Resolved Exceptions
br7.report.live.status.trigger.detail=Live Status Detail - Triggers
br7.report.user.workload.summary.report=User Workload Summary
br7.report.user.workload.detail=User Workload Detail
br7.report.current.mtd.status=Available History Status
# Since br700002672, RCD445:
br7.report.bail.conditions=Bail Conditions
# Since br700002773, RCD592:
br7.report.warrants=Warrants
# Since br700002775, RCD549:
br7.report.domestic.violence=Domestic Violence & Vulnerable Victim
br7.report.work.allocation=Work Allocation
br7.report.area.code=Area Code
br7.report.timestamp=Time run: {0}

############################################
# Reporting Data Screen
############################################

br7.report.from.date=From Date
br7.report.to.date=To Date
br7.report.date.today=Today
br7.report.date.select=Select a date
br7.report.run.report=Run report
br7.report.return.to.index=Return To Reports Index
br7.report.download.csv=Download CSV File
br7.report.date.selection.required=You must select a 'from' date and a 'to' date.
br7.report.dates.out.of.sequence=The selected 'from' date may not be later than the selected 'to' date.
## for br700002360 
br7.report.type.triggers=Include triggers
br7.report.type.exceptions=Include exceptions
br7.report.type.selection.required=You must tick either exceptions, triggers or both.

################################################################
# MIS Report Messages
############################################

br7.report.live.status.summary.column1=Court Name
br7.report.live.status.summary.column2=Courtroom
br7.report.live.status.summary.column3=Number of Exceptions
br7.report.live.status.summary.column4=Number of Exceptions within 1d of 7d target (i.e. approaching 'Exception Overdue' exceptions)
br7.report.live.status.summary.column5=Number of Exceptions 'Exception Overdue'
br7.report.live.status.summary.column6=Number of Exceptions not 'Exception Overdue' or 'Approaching Exception Overdue'
br7.report.live.status.summary.column7=Number of Exceptions within 1d of 10d target (i.e. approaching 'Result Overdue' exceptions)
br7.report.live.status.summary.column8=Number of Exceptions 'Result Overdue'
br7.report.live.status.summary.column9=Number of Exceptions not 'Result Overdue' or 'Approaching Result Overdue'
br7.report.live.status.summary.column10=Number of Triggers
br7.report.live.status.summary.column11=Number of Triggers within 1d of 7d target (i.e. approaching 'overdue' triggers)
br7.report.live.status.summary.column12=Number of 'Overdue' Triggers
br7.report.live.status.summary.column13=Number of Triggers not 'Overdue' or 'Approaching Overdue'
br7.report.live.status.summary.column14=Number of 'Locked' exceptions / triggers

br7.report.live.status.exception.detail.asn=ASN
br7.report.live.status.exception.detail.defendantname=Defendant Name
br7.report.live.status.exception.detail.ptiurn=PTIURN
br7.report.live.status.exception.detail.courtname=Court Name
br7.report.live.status.exception.detail.courtroom=Courtroom
br7.report.live.status.exception.detail.hearingdate=Hearing Date
br7.report.live.status.exception.detail.lockedby=Locked By
br7.report.live.status.exception.detail.timeuntiloverdue=Time Left Until Overdue (days)
br7.report.live.status.exception.detail.timeoverdue=Time Overdue By (days)
br7.report.live.status.exception.detail.notes=Notes
br7.report.live.status.exception.detail.approachingoverdue=A - APPROACHING OVERDUE EXCEPTIONS
br7.report.live.status.exception.detail.overdue=B - OVERDUE EXCEPTIONS

br7.report.live.status.trigger.detail.triggertype=Trigger Type
br7.report.live.status.trigger.detail.asn=ASN
br7.report.live.status.trigger.detail.defendantname=Defendant Name
br7.report.live.status.trigger.detail.ptiurn=PTIURN
br7.report.live.status.trigger.detail.courtname=Court Name
br7.report.live.status.trigger.detail.courtroom=Courtroom
br7.report.live.status.trigger.detail.hearingdate=Hearing Date
br7.report.live.status.trigger.detail.lockedby=Locked By
br7.report.live.status.trigger.detail.timeuntiloverdue=Time Left Until Overdue (days)
br7.report.live.status.trigger.detail.timeoverdue=Time Overdue By (days)
br7.report.live.status.trigger.detail.notes=Notes
br7.report.live.status.trigger.detail.approachingoverdue=A - APPROACHING OVERDUE TRIGGERS
br7.report.live.status.trigger.detail.overdue=B - OVERDUE TRIGGERS

br7.report.current.mtd.status.report.column.courtname=Court Name
br7.report.current.mtd.status.report.column.courtroom=Court Room
br7.report.current.mtd.status.report.column.numberofreceivedexceptions=Number of Exceptions Received
br7.report.current.mtd.status.report.column.numberofresolvedexceptions=Number of Exceptions Resolved
br7.report.current.mtd.status.report.column.numberofoutstandingexceptions=Number of Exceptions Outstanding
br7.report.current.mtd.status.report.column.totalnumberofoutstandingexceptions=Number of Exceptions Outstanding (TOTAL)
br7.report.current.mtd.status.report.column.numberofreceivedtriggers=Number of Triggers Received
br7.report.current.mtd.status.report.column.numberofresolvedtriggers=Number of Triggers Resolved
br7.report.current.mtd.status.report.column.numberofoutstandingtriggers=Number of Triggers Outstanding
br7.report.current.mtd.status.report.column.totalnumberofoutstandingtriggers=Number of Triggers Outstanding (TOTAL)
br7.report.current.mtd.status.report.exception.table.name=A. Exception Summary
br7.report.current.mtd.status.report.trigger.table.name=B. Trigger Summary

################################################################
# MIS Reports common footer total label
############################################
br7.report.footer.total=TOTAL

################################################################
# MIS Reports: column headings for user performance summary report
############################################
br7.report.user.performance.summary.report.column.userid=UserID
br7.report.user.performance.summary.report.column.numberofexceptionsresolved=Number of Exceptions Resolved Today
br7.report.user.performance.summary.report.column.numberoftriggersresolved=Number of Triggers Resolved Today
br7.report.user.performance.summary.report.column.totalnumberoflockedexceptionstriggers=Total number of exceptions/triggers still locked

################################################################
# MIS Reports: column headings for user performance detail report
############################################
br7.report.user.performance.detail.column.userid=UserID
br7.report.user.performance.detail.report.column.numberofexceptionsresolved=Number of Exceptions Resolved Today
br7.report.user.performance.detail.report.column.numberoftriggersresolved=Number of Triggers Resolved Today
br7.report.user.performance.detail.report.column.totalnumberoflockedexceptions=Total number of exceptions still locked
br7.report.user.performance.detail.report.column.totalnumberoflockedtriggers=Total number of triggers still locked

################################################################
# MIS Reports: column headings for resolved exceptions report
############################################
br7.report.resolved.exception.column.asn=ASN
br7.report.resolved.exception.column.ptiurn=PTIURN
br7.report.resolved.exception.column.defendantname=Defendant Name
br7.report.resolved.exception.column.courtname=Court Name
br7.report.resolved.exception.column.courtroom=Courtroom
br7.report.resolved.exception.column.hearingdate=Hearing Date
br7.report.resolved.exception.column.casereference=Case Reference
br7.report.resolved.exception.column.receivedbycjse=Date/Time Received By CJSE
br7.report.resolved.exception.column.resolved=Date/Time Resolved
br7.report.resolved.exception.column.notes=Notes
br7.report.resolved.exception.column.resolutionaction=Resolution Action
#br700002360
br7.report.resolved.exception.column.type=Type
br7.report.resolved.exception.recordtype.short.exception=Ex
br7.report.resolved.exception.recordtype.short.trigger=Tr

################################################################
# MIS Reports: column headings for user workload summary report
############################################
br7.report.user.workload.summary.column.user=Locking user
br7.report.user.workload.summary.column.locked.records=Number of exceptions/triggers
br7.report.user.workload.summary.column.actions=Number of actions on records
# Footer description for non-locked records
br7.report.user.workload.summary.footer.not.locked=None

################################################################
# MIS Reports: column headings for user workload detail report
############################################
br7.report.user.workload.detail.column.userid=Locking user
br7.report.user.workload.detail.column.record.count=Number of exceptions/triggers
br7.report.user.workload.detail.column.action.count=Number of actions on records 
br7.report.user.workload.detail.column.asn=ASN
br7.report.user.workload.detail.column.defendant.name=Defendant name
br7.report.user.workload.detail.column.ptiurn=PTIURN
br7.report.user.workload.detail.column.court.name=Court name
br7.report.user.workload.detail.column.court.room=Court room
br7.report.user.workload.detail.column.court.date=Hearing date
br7.report.user.workload.detail.column.exception.type=Exception type
br7.report.user.workload.detail.column.trigger.type=Trigger type
br7.report.user.workload.detail.column.time.left=Time left
br7.report.user.workload.detail.column.notes=Notes
# Footer description for non-locked records
br7.report.user.workload.detail.not.locked=None

################################################################
# MIS Reports: column headings for bail conditions report
# Since br700002672, RCD445
# 5 additional added as part of RCD 530
################################################################
br7.report.bail.conditions.column.hearingdate=Hearing Date
br7.report.bail.conditions.column.courtname=Court Name
br7.report.bail.conditions.column.hearingtime=Hearing Time
br7.report.bail.conditions.column.defendantname=Defendant Name
br7.report.bail.conditions.column.defendantaddress=Defendant Address
br7.report.bail.conditions.column.dateofbirth=Date of Birth
br7.report.bail.conditions.column.ptiurn=PTIURN
br7.report.bail.conditions.column.asn=ASN
br7.report.bail.conditions.column.offencetitles=Offence Title(s)
br7.report.bail.conditions.column.nextappearancecourt=Next Court Appearance
br7.report.bail.conditions.column.nextappearancedate=Next Court Appearance Date
br7.report.bail.conditions.column.nextappearancetime=Next Court Appearance Time
br7.report.bail.conditions.column.whenreceivedbycjse=Date/Time Received by CJSE
br7.report.bail.conditions.column.daystoenterportal=Number of days taken to enter Portal
br7.report.bail.conditions.column.bailconditions=Bail Conditions Imposed
br7.report.bail.conditions.column.automatedtopnc=Case successfully automated to PNC
br7.report.bail.conditions.column.triggerstatus=Trigger Status
br7.report.bail.conditions.column.triggerresolveddate=Trigger Resolved Date

################################################################
# MIS Reports: column headings for warrants report
# Since br700002773, RCD592
################################################################
br7.report.warrants.column.hearingdate=Hearing Date
br7.report.warrants.column.courtname=Court Name
br7.report.warrants.column.hearingtime=Hearing Time
br7.report.warrants.column.defendantname=Defendant Name
br7.report.warrants.column.gender=Gender
br7.report.warrants.column.defendantaddress=Defendant Address
br7.report.warrants.column.dateofbirth=Date of Birth
br7.report.warrants.column.pncid=PNCID
br7.report.warrants.column.ptiurn=PTIURN
br7.report.warrants.column.asn=ASN
br7.report.warrants.column.offencetitles=Offence Title(s)
br7.report.warrants.column.offencewording=Offence Wording
br7.report.warrants.column.warranttext=Warrant Text
br7.report.warrants.column.nextappearancecourt=Next Court Appearance
br7.report.warrants.column.nextappearancedate=Next Court Appearance Date
br7.report.warrants.column.warranttype=Warrant Type
br7.report.warrants.column.bailornobail=Bail or No Bail
br7.report.warrants.column.whenreceivedbycjse=Date/Time Received by CJSE
br7.report.warrants.column.daystoenterportal=Number of days taken to enter Portal
br7.report.warrants.column.triggerstatus=Trigger Status
br7.report.warrants.column.triggerresolveddate=Trigger Resolved Date
				
################################################################
# MIS Reports: column headings for Domestic Violence report
# Since br700002775, RCD549
################################################################
br7.report.domestic.violence.column.type=Type
br7.report.domestic.violence.column.hearingdate=Hearing Date
br7.report.domestic.violence.column.courtname=Court Name
br7.report.domestic.violence.column.defendantname=Defendant Name
br7.report.domestic.violence.column.dateofbirth=Date of Birth
br7.report.domestic.violence.column.ptiurn=PTIURN
br7.report.domestic.violence.column.asn=ASN
br7.report.domestic.violence.column.offencetitle=Offence Title
br7.report.domestic.violence.column.outcome=Outcome				
				
################################################################
# Business Exception Messages
############################################

br7.business.exception.record.not.found=This Record has already been resolved and is no longer available for viewing
br7.business.exception.record.locked=This action is not permitted as the Record is locked by another user 


################################################################
# Error Messages
#
# Note: These are generated by the Bichard 7 Errors.xsl spreadsheet
#       and copied to this file

br7.error.HO100100=Bad value (general catch-all)
br7.error.HO100101=Value required (general catch-all)
br7.error.HO100102=Bad date
br7.error.HO100103=Bad time
br7.error.HO100104=Bad timestamp
br7.error.HO100105=Bad integer
br7.error.HO100106=Too short (catch-all)
br7.error.HO100107=Too long (catch-all)
br7.error.HO100108=Value is not allowed for the field
br7.error.HO100109=Number too small
br7.error.HO100110=Number too large
br7.error.HO100111=Bad decimal
br7.error.HO100200=Invalid Organisation Unit Code
br7.error.HO100201=Bad PTIURN format
br7.error.HO100202=Bad CaseMarker
br7.error.HO100203=Bad CourtCaseReferenceNumber format
br7.error.HO100204=Magistrates Court Reference format is wrong
br7.error.HO100205=Crown Court Reference format is wrong
br7.error.HO100206=Bad ArrestSummonsNumber
br7.error.HO100207=Bad CRONumber format
br7.error.HO100208=Bad DriverNumber format
br7.error.HO100209=Bad PNCIdentifier format
br7.error.HO100210=Bad PNCCheckname format
br7.error.HO100211=Bad OrganisationName format
br7.error.HO100212=Bad Title
br7.error.HO100213=Bad GivenName
br7.error.HO100214=Bad RequestedName
br7.error.HO100215=Bad FamilyName
br7.error.HO100216=Bad Suffix
br7.error.HO100217=Bad AddressLine
br7.error.HO100218=Bad PostCode format
br7.error.HO100219=Bad BailConditions
br7.error.HO100220=Bad ReasonForBailConditions
br7.error.HO100221=Bad Year (Part of Offence Code)
br7.error.HO100222=Bad DefendantOrOffender SequenceNumber
br7.error.HO100223=Bad DefendantOrOffender CheckDigit
br7.error.HO100224=Bad ActOrSource (Part of Offence Code)
br7.error.HO100225=Bad Indictment
br7.error.HO100226=Bad CommonLawOffence
br7.error.HO100227=Bad Reason (Part of Offence Code)
br7.error.HO100228=Bad Offence Reason Sequence
br7.error.HO100229=Bad Informant
br7.error.HO100230=Bad year
br7.error.HO100231=Bad month
br7.error.HO100232=Bad LocationOfOffence
br7.error.HO100233=Bad OffenceTitle (Lookup failed)
br7.error.HO100234=Bad Wording (Lookup failed)
br7.error.HO100235=Bad ActualStatementOfFacts
br7.error.HO100236=Bad HomeOfficeClassification (Lookup failed)
br7.error.HO100237=Bad AlcoholLevel Amount
br7.error.HO100238=Bad VehicleRegistrationMark
br7.error.HO100239=Bad CourtOffenceSequenceNumber
br7.error.HO100240=Bad CJSresultCode
br7.error.HO100241=Bad ResultApplicableQualifierCode
br7.error.HO100242=Bad DurationLength
br7.error.HO100243=Bad AmountSpecifiedInResult amount
br7.error.HO100244=Bad NumberSpecifiedInResult amount
br7.error.HO100245=Bad ResultVariableText (Must not be empty)
br7.error.HO100246=Bad PNCDisposalType
br7.error.HO100247=Bad ResultQualifierVariable Code
br7.error.HO100248=Bad ResultQualifierVariable Text
br7.error.HO100249=Bad CourtHouseCode
# br7.error.HO100250 : br700002376
br7.error.HO100250=Bad AreaCode (Part of Local Offence Code)
# br7.error.HO100251 : br700002376
br7.error.HO100251=Bad OffenceCode (Part of Local Offence Code)
# br7.error.HO100252 : br700002383
br7.error.HO100252=Victim Surcharge merged with other disposal
br7.error.HO100300=Organisation not recognised
br7.error.HO100301=ASN not found on PNC
br7.error.HO100302=PNC query failed (e.g. communication failure, timeout)
br7.error.HO100303=NOT USED (used to be: PNC ASN Query result mismatch (HO CourtPNCIdentifier doesn't match PNCID)
br7.error.HO100304=Court offences do not match with what is on the PNC
br7.error.HO100305=Conviction/Hearing dates and/or Verdict do not make sense
br7.error.HO100306=OffenceCode not found (Lookup failed)
br7.error.HO100307=ResultCode not found (Lookup failed)
# br7.error.HO100308 : Removed in R5.1
br7.error.HO100308=Qualifier not allowed for corresponding ResultCode 
br7.error.HO100309=Result Code Qualifier not found (Lookup failed)
br7.error.HO100310=Multiple Court Offences with different Results match a PNC Offence
br7.error.HO100311=Duplicate Court Offence Sequence Number
br7.error.HO100312=No PNC Offence with this Sequence Number
br7.error.HO100313=PNC Query returned a business error
br7.error.HO100314=PNC Query returned a system fault (e.g. returned an unexpected error code)
br7.error.HO100315=PNC Query returned a warning
br7.error.HO100316=PNC Query returned an invalid Offence Sequence (reference) number 
br7.error.HO100317=PNC Query returned a duplicate Offence Sequence (reference) number
br7.error.HO100318=PNC Query returned an invalid Court Case Reference number
# br7.error.HO100319 : Removed in R3.3
br7.error.HO100319=Must have at least one Result with a result code
br7.error.HO100320=Sequence number identifies a non-matching Offence
br7.error.HO100321=Dummy ASN not allowed when Offences/Results are recordable
br7.error.HO100322=Next Result Source Organisation is absent for a remand.
br7.error.HO100323=Next Hearing Date is absent for a remand.
# br7.error.HO100324 : Replaces HO200100 in R3.6 - defect br700002255
br7.error.HO100324=Inconsistent result: Adjournment pre Judgement but PNC has an adjudication
# br7.error.HO100325 : Replaces HO200103 in R3.6 - defect br700002255
br7.error.HO100325=Inconsistent result: Adjournment post Judgement but PNC does not have an adjudication
# br7.error.HO100326 : Replaces HO200106 in R3.6 - defect br700002255
br7.error.HO100326=Inconsistent result: Sentence but PNC does not have an adjudication
# br7.error.HO100327 : Replaces HO200107 in R3.6 - defect br700002255
br7.error.HO100327=Inconsistent result: Appeal but PNC does not have an adjudication
# br7.error.HO100328 : br700002316
br7.error.HO100328=Unable to determine whether fixed penalty or court case should be resulted
# br7.error.HO100329 : br700002316
br7.error.HO100329=Unable to identify correct fixed penalty
# br7.error.HO100330 : br700002389
br7.error.HO100330=Inconsistent result: Adjournment but PNC has an adjudication
# br7.error.HO100331 : br700002595
br7.error.HO100331=Case has 100+ offences - refer to court register
# br7.error.HO100332 : br700002625
br7.error.HO100332=Offences match more than one CCR
# br7.error.HO100333 : br700002933 - RCD 671 - New exception when failed manual matches detected for PNC cases where no offence matches exist against PNC data.
br7.error.HO100333=Manual match but no court case matches upon resubmission, suggesting ASN updated or PNC data udated manually before resubmission.
br7.error.HO100400=Business Error: Automatic update of PNC impossible owing to incompatible update messages arising
br7.error.HO100401=PNC Update returned a business error
br7.error.HO100402=PNC Update returned a system fault (e.g. returned an unexpected error code)
br7.error.HO100403=PNC Update returned a warning
br7.error.HO100404=PNC Update failed (e.g. communication failure, timeout)
# br7.error.HO100405 : Removed in v36
br7.error.HO100405=No longer used
# br7.error.HO100406 : Removed in v36
br7.error.HO100406=No longer used
# br7.error.HO100407 : Removed in v36
br7.error.HO100407=No longer used
br7.error.HO100408=Business Error: Cannot generate PNC updates because the relevant results are in the result stop list.
br7.error.HO100409=Business Error: Cannot generate PNC updates because the HO contains more than 100 offences, or an offence with more than 10 results.
# br7.error.HO100410 : Removed in v5
br7.error.HO100410=No longer used
# br7.error.HO100411 : Removed in v5
br7.error.HO100411=No longer used
br7.error.HO100500=CREST DisposalCode does not have an active mapping to an HO CJSresultCode
br7.error.HO100501=CREST DisposalCode is marked as an exception
# br7.error.HO100502 : Removed in v44
br7.error.HO100502=No longer used
# br7.error.HO100503 : br700002362
br7.error.HO100503=CREST Disposal cannot be applied as no offences listed, e.g. Administrative discontinuance
# br7.error.HO100504 : br700002365
br7.error.HO100504=Hearing Outcome is a Court of Appeal result
# br7.error.HO100505 : br700002389
br7.error.HO100505=Bail Order has invalid Bail Decision 'Refused'
# br7.error.HO100506 : br700002389
br7.error.HO100506=Bail Order, Remand Order or Bench Warrant contains one or more offences
# br7.error.HO100507 : br700002316
br7.error.HO100507=Offences added by court at Penalty Hearing
# br7.error.HO100508 : br700002451 - but then removed and never actually used. Could be reused.
br7.error.HO100508=Breach received from Crown Court
# br7.error.HO100509 : br700002452
br7.error.HO100509=Multi-handed case, confirm or correct ASN before resubmission
# br7.error.HO100510 : br700002492
br7.error.HO100510=Check dummy ASN on Crown Court adjournment

# br7.error.HO200100 : Replaced by HO100324 in R3.6 - defect br700002255
br7.error.HO200100=Inconsistent result: Adjournment pre Judgement but PNC has an adjudication
br7.error.HO200101=Inconsistent result: Adjournment with Judgement but PNC has an adjudication
# br7.error.HO200102 : Error Removed in v27
br7.error.HO200102=No longer used
# br7.error.HO200103 : Replaced by HO100325 in R3.6 - defect br700002255
br7.error.HO200103=Inconsistent result: Adjournment post Judgement but PNC does not have an adjudication
br7.error.HO200104=Inconsistent result: Judgement with final result but PNC has an adjudication
# br7.error.HO200105 : Error Removed in v27
br7.error.HO200105=No longer used
# br7.error.HO200106 : Replaced by HO100326 in R3.6 - defect br700002255
br7.error.HO200106=Inconsistent result: Sentence but PNC does not have an adjudication
# br7.error.HO200107 : Replaced by HO100327 in R3.6 - defect br700002255
br7.error.HO200107=Inconsistent result: Appeal but PNC does not have an adjudication
br7.error.HO200108=Insufficient information to create reference for 'Refer to Court Case'.
br7.error.HO200109=Invalid operation sequence: Results in the Hearing Outcome are not consistent
br7.error.HO200110=Non-police / Dummy ASN encountered
br7.error.HO200111=Unknown order varied/revoked result code
br7.error.HO200112=The PNC cannot be updated automatically because there are new disposals together with sentencing. It will have to be done manually.
br7.error.HO200113=The PNC cannot be updated automatically because there are new remands together with sentencing. It will have to be done manually.
br7.error.HO200114=The PNC cannot be updated automatically because there are changes to existing disposals together with sentencing. It will have to be done manually.
br7.error.HO200115=The PNC cannot be updated automatically because there are changes to existing disposals together with new disposals. It will have to be done manually.
br7.error.HO200116=Too many offences present - manual update
br7.error.HO200117=Too many results present - review on PNC
br7.error.HO200118=Cannot generate PNC updates because the relevant results are in the result stop list.
br7.error.HO200119=Generated PNC update message does not conform to the schema.
br7.error.HO200120=No date specified for reinstatement of case adjourned sine die
br7.error.HO200121=Business Error: Cannot generate PNC updates because there are no offences that can be sent to the PNC.
br7.error.HO200122=Sentence changed on Appeal
br7.error.HO200123=Appeal against sentence allowed but no new sentence supplied
# br7.error.HO200124 : br700002625
br7.error.HO200124=The PNC cannot be updated automatically because there are adjudications together with existing final results. It will have to be done manually.
br7.error.HO200200=PNC disposal Text exceeds 64 Characters
br7.error.HO200201=Result Qualifier Duration is present
br7.error.HO200202=Too many Result Qualifiers present
br7.error.HO200203=Too many Bail Conditions present
# br7.error.HO200204 : This error has been removed by br700002678 - RCD 456
br7.error.HO200205=Amount Specified In Result too large
# br7.error.HO200206 : This warning was removed in R3.3
br7.error.HO200206=Offence was added by the court but no location is present
# br7.error.HO200207 : This warning was removed in R3.3
br7.error.HO200207=Next Hearing Date not present for remand
# br7.error.HO200208 : This warning was removed in R3.3
br7.error.HO200208=Next Result Source Organisation not present for remand
br7.error.HO200209=Too many results present
# br7.error.HO200210 : br700002316
br7.error.HO200210=Inconsistent result: Sentence but PNC has an adjudication
# br7.error.HO200211 : br700002366, reworded for br700002439
br7.error.HO200211=Crown Court result with added offences/multiple ASNs
# br7.error.HO200212 : Added for R5.1
br7.error.HO200212=Offence has no valid PNC results

br7.trigger.TRPR0001=Driver Disqualification - Update DD screen.
br7.trigger.TRPRA001=Appeal against Driver Disqualification - Update DD screen.
br7.trigger.TRPR0002=FTA warrant issued - Update Wanted/Missing
br7.trigger.TRPR0003=Order Issues - Update Wanted/Missing, check and amend Disposal
br7.trigger.TRPR0004=Convicted of Violent/Sexual offence - Update Markers and Register(s) as appropriate
br7.trigger.TRPRA004=Appeal against conviction for Violent/Sexual offence - Update Markers and Register(s) as appropriate
br7.trigger.TRPR0005=Defendant remanded in custody - update custody history
br7.trigger.TRPR0006=Defendant imprisoned - update custody history
br7.trigger.TRPRA006=Appeal against Imprisonment - update custody history
br7.trigger.TRPR0007=Defendant dead - update death marker
br7.trigger.TRPR0008=Defendant has breached bail - Update breach of bail marker
# br7.trigger.TRPR0009 : Removed before R3 went live
br7.trigger.TRPR0009=Order revoked - update Wanted/Missing screen
br7.trigger.TRPR0010=Bail conditions imposed/varied/cancelled - update remand screen
# br7.trigger.TRPR0011 : Removed before R3 went live
br7.trigger.TRPR0011=Order varied - update Wanted/Missing screen. Check 3042 code exists
br7.trigger.TRPR0012=Warrant not executed/Withdrawn - update Wanted/Missing screen
# br7.trigger.TRPR0013 : Used pre R3.4 only
br7.trigger.TRPR0013=Offence added by the court - Update MO Screen/Offence Location/Update 3042
# br7.trigger.TRPR0014 : Removed before R3 went live
br7.trigger.TRPR0014=Too many offences - manual update
# br7.trigger.TRPR0015 : Since br700002332
br7.trigger.TRPR0015=Personal details changed
# br7.trigger.TRPR0016 : Since br700002564
br7.trigger.TRPR0016=Forfeiture order made - update records as appropriate
# br7.trigger.TRPR0017 : Since br700002565
br7.trigger.TRPR0017=Adjourned Sine Die - update case details
# br7.trigger.TRPR0018 : Since br700002576
br7.trigger.TRPR0018=Update offence date(s) on PNC
# br7.trigger.TRPR0019 : rcd 375
br7.trigger.TRPR0019=Remanded in custody with bail direction
# br7.trigger.TRPR0020 : rcd 422
br7.trigger.TRPR0020=Update original case with conviction and sentence details
# br7.trigger.TRPR0021 : rcd 359
br7.trigger.TRPR0021=Disqualification or Revocation Order made (not motoring)
# br7.trigger.TRPR0022 : rcd 359
br7.trigger.TRPR0022=Extradition Order made
# br7.trigger.TRPR0023 : rcd 441
br7.trigger.TRPR0023=Domestic Violence Case
# br7.trigger.TRPR0024 : rcd 442
br7.trigger.TRPR0024=Vulnerable or Intimidated victim/witness
# br7.trigger.TRPR0025 : Added for R5.2 (br700002681 - rcd 490)
# br700002904 - RCD 655 - TRPR0025 wording changed to take account of statutory declaration cases
br7.trigger.TRPR0025=Original case has been re-opened/stat dec made - check new sentence details
# br7.trigger.TRPR0026 : Generic trigger added from production as part of br700002767 - RCD 464
br7.trigger.TRPR0026=Driving disqualification Suspended
# br7.trigger.TRPR0027 : Out of Area case trigger introduced as part of br700002780 - RCD 612
br7.trigger.TRPR0027=Out of Area case
# br7.trigger.TRPR0028 : Case reallocated trigger introduced in br700002791 - RCD 616
br7.trigger.TRPR0028=Trigger only case reallocated from another force
# br7.trigger.TRPR0029 : Civil Proceedings trigger introduced in br700002845 - RCD 638
br7.trigger.TRPR0029=Civil proceedings granted or Order made - update records as appropriate
# br7.trigger.TRPS0001 : rcd 359
br7.trigger.TRPS0001=Enter the restraining order detail
br7.trigger.TRPSA001=Appeal - Amend the restraining order detail
br7.trigger.TRPS0002=Confirm address on PNC
br7.trigger.TRPSA002=Appeal - Amend address on PNC
br7.trigger.TRPS0003=Disposal text was truncated - revise on PNC if wanted
br7.trigger.TRPS0004=Split Adjournment - manual split required
# br700002895 - RCD 524 TRPS0006 no longer used. Definitions removed.
# br700002767 - RCD 464 TRPS0007 and TRPSA0007 are no longer used. Definitions remain in case of old cases.
br7.trigger.TRPS0007=Enter the exclusion requirement
br7.trigger.TRPSA007=Appeal - Amend the exclusion requirement
br7.trigger.TRPS0008=Enter details of curfew order
br7.trigger.TRPSA008=Appeal - Amend details of curfew order
# br7.trigger.TRPS0009 : Removed from 5.1 - rcd422
br7.trigger.TRPS0009=Add original conviction/sentence date
# br7.trigger.TRPS0010 : Used instead of TRPR0013 from R3.4 onwards
br7.trigger.TRPS0010=Offence added to the PNC - Update MO Screen/Offence Location/Update 3042
# br7.trigger.TRPS0011 : Added for R5.1 (br700002629 - RCD 417)
br7.trigger.TRPS0011=Offence added at court - add to PNC
# br7.trigger.TRPS0013 : Added for R5.4 (br700002728 - RCD 533)
br7.trigger.TRPS0013=Offences taken into consideration - add to offence

# shortened triggers for summary list display, since RCD 493
br7.trigger.PR01=Disqualified driver
br7.trigger.PR02=Warrant issued
br7.trigger.PR03=Order issues
br7.trigger.PR04=Sex offender
br7.trigger.PR05=Remand in custody
br7.trigger.PR06=Imprisoned
br7.trigger.PR07=Defendant dead
br7.trigger.PR08=Breach of bail
br7.trigger.PR10=Conditional bail
br7.trigger.PR12=Warrant withdrawn
br7.trigger.PR15=Personal details changed
br7.trigger.PR16=Forfeiture order
br7.trigger.PR17=Adjourned sine die
br7.trigger.PR18=Update offence dates
br7.trigger.PR19=Bail direction
br7.trigger.PR20=Breach
br7.trigger.PR21=Disq. non-motoring
br7.trigger.PR22=Extradition order
br7.trigger.PR23=Domestic violence
br7.trigger.PR24=Vulnerable victim
# br700002904 - RCD 655 - PR25 wording changed to take account of statutory declaration cases
br7.trigger.PR25=Case reopened/stat dec
br7.trigger.PR26=Disq. suspended
br7.trigger.PR27=Out of Area case
br7.trigger.PR28=Trigger case reallocated
br7.trigger.PR29=Civil Proceedings
br7.trigger.PS02=Check address
br7.trigger.PS03=Disposal text truncated
br7.trigger.PS04=Split adjournment
br7.trigger.PS08=Curfew order
br7.trigger.PS10=Offence added to PNC
br7.trigger.PS11=Add offence to PNC
br7.trigger.PS13=Offence(s) TIC



############################################
# Team management screen
############################################


#Buttons
br7.team.button.add.user=Add User
br7.team.button.add.team=Add Team
br7.team.button.remove.user=Remove Selected Users
br7.team.button.remove.teams=Remove Selected Teams
br7.team.button.update.area=Change Team Area Code
#checkbox
br7.team.label.title.remove.checkbox=Remove
#text entry
br7.team.label.title.add.text=User to add
br7.team.label.title.update.area=Change Area Code

br7.team.invalid.area.code=Invalid area code supplied
br7.team.heading.supervisor=Supervisor
br7.team.heading.member=Members
br7.team.other.teams=Other teams to which I can allocate
br7.team.my.team=My Team Members
`

export default resources
