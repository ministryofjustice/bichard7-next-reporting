export function getText(object: { _text: string | undefined }) {
  return object?._text ?? ""
}

export default interface XmlStringCell {
  _text: string
}
