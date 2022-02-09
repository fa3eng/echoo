class TypedMap<T = {}> {
  data: T

  constructor (data: T) {
    this.data = data
  }

  set<K extends PropertyKey, V extends K extends keyof T ? T[K] : any> (
    key: K,
    value: V
  ): asserts this is TypedMap<T & { [k in K]: V }> {
    this.data = {
      ...this.data,
      [key]: value
    }
  }

  get<K extends keyof T> (key: K): T[K] {
    return this.data[key]
  }
}

export { TypedMap }
