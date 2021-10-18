import organisationUnits from "./bichardOrganisationUnit.json"

export default (organisationUnitCode: string): string | null => {
  const filteredResult = organisationUnits.filter(
    (o) => organisationUnitCode === `${o.bottomLevelCode}${o.secondLevelCode}${o.thirdLevelCode}`
  )

  return filteredResult.length === 0 ? null : filteredResult[0].secondLevelName
}
