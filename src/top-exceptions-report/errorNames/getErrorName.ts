import resources from "./bichardApplicationResources"

export default (errorCode: string): string | null => {
  const matchResult = resources.match(new RegExp(`br7.error.${errorCode}=(.*)`, "i"))

  if (!matchResult || matchResult.length === 1) {
    return null
  }

  return matchResult[1]
}
