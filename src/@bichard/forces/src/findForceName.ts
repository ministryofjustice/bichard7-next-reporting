import forces from "./forces.json"

type Forces = { [key: string]: { Name: string } }

export default (forceOwner?: string): string | undefined => {
  if (!forceOwner || forceOwner.length < 4) {
    return undefined
  }

  let forceCode = forceOwner.substr(0, 2)

  // Consolidating MET force
  if (forceCode === "02") {
    forceCode = "01"
  }

  return (forces as Forces)[forceCode]?.Name
}
