/* eslint-disable no-underscore-dangle */
export function getText(object: { _text: string | undefined }): string {
  return object?._text ?? ""
}

export default interface XmlStringCell {
  _text: string
}
