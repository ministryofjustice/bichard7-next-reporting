type KeyValuePair<TKey extends string | number, TValue> = {
  // eslint-disable-next-line no-unused-vars
  [name in TKey]: TValue
}

export default KeyValuePair
