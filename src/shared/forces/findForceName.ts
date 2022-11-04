import forces from "./forces"

export default (forceOwner?: number): string | undefined => {
  if (forceOwner === undefined) {
    return undefined
  }

  // Consolidating MET force
  if (forceOwner === 2) {
    return forces[1]
  }

  return forces[forceOwner]
}
