import XmlStringCell from "./types/XmlStringCell";

export default (resultQualifiers: [Code: XmlStringCell]|undefined) => {
    if (!resultQualifiers) {
        return ""
    }
    const result = resultQualifiers.map((x) => x._text).join(" ")
    return result
}