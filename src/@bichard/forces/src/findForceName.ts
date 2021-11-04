import forces from "./forces"

type Forces = { [key: string]: string }

const parsedForces: Forces = (forces as string)
  .trim()
  .split("\n")
  .reduce((allForces, line) => {
    const lineParts = line.split("\t")
    const code = lineParts[0].trim()
    // eslint-disable-next-line no-param-reassign
    allForces[code] = lineParts[1].trim()
    return allForces
  }, {} as Forces)

export default (forceOwner?: string): string | undefined => {
  if (!forceOwner || forceOwner.length < 4) {
    return undefined
  }

  let forceCode = forceOwner.substr(0, 2)

  // Consolidating MET force
  if (forceCode === "02") {
    forceCode = "01"
  }

  return parsedForces[forceCode]
}
