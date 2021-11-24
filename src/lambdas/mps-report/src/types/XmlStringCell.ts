export function getText(object: {_text:string | undefined }){
    if(!object || !object._text) {
        return ""
    }
    return object._text
}

export default interface XmlStringCell{
    _text: string
}