
interface Option<T>
{
  flatMap<U>(f: (value: T) => Option<U>): Option<U>
  getOrElse(value: T): T
}

// 成功した操作を表す
class Some<T> implements Option<T>
{
  private value: T

  constructor(value: T)
  {
    this.value = value
  }

  flatMap<U>(f: (value: T) => None): None
  flatMap<U>(f: (value: T) => Some<U>): Some<U>
  flatMap<U>(f: (value: T) => Option<U>): Option<U>
  {
    return f(this.value)
  }

  getOrElse(value: T): T
  {
    return this.value
  }
}

// 失敗した操作を表す (値は含まない)
class None implements Option<never>
{
  flatMap(): None
  {
    return this
  }

  getOrElse<U>(value: U): U
  {
    return value
  }
}

// Option を作成する関数
function Optin<T>(value: null | undefined): None
function Optin<T>(value: T): Some<T>
function Optin<T>(value: T): Option<T>
{
  if (value == null)
    return new None
  return new Some(value)
}

// let result = Option(6)
//   .flatMap(n => Option(n * 3))
//   .flatMap(n => new None)
//   .getOrElse(7)

// ask()
//   .flatMap(parse)
//   .flatMap(date => new Some(date.toISOString()))
//   .flatMap(date => new Some('Date is ' + date))
//   .getOrElse('Error parsing date for some reason')
