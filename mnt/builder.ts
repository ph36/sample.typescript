
/*
 * 5. 練習問題4 型安全なビルダパターンを実装
 */

type Method = 'get' | 'post'

/*
 * 基礎的な実装
 *
 * 問題点: setXXX() を一つも呼ばないまま send() を呼べてしまう.
 */

class RequestBuilder {
  private uri: string | null = null
  private method: Method | null = null
  private data: object | null = null

  public setURI(uri: string): this {
    this.uri = uri
    return this
  }

  public setMethod(method: Method): this {
    this.method = method
    return this
  }

  public setData(data: object): this {
    this.data = data
    return this
  }

  public send() {
    console.log("")
    console.log(this)

    // 実際の send 処理は省略
  }
}

// 想定する使用
const request = new RequestBuilder
request
  .setURI("https://localhost/")
  .setMethod("post")
  .setData({ foo: "bar" })
request.send()

// 想定外の使用 (しかし, エラーにはならず呼べてしまう)
new RequestBuilder().send()

/*
 * 発展的な実装
 */

interface BuildableRequest {
  uri: string
  method: Method
  data?: object
}

class ExpandedRequestBuilder {
  uri?: string
  method?: Method
  data?: object

  // public build(this: BuildableRequest) {
  //   return this
  // }

  // ref. https://log.pocka.io/ja/posts/typescript-builtin-type-functions/#pick
  public setURI(uri: string): this & Pick<BuildableRequest, 'uri'> {
    // ref. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    return Object.assign(this, { uri })
  }

  public setMethod(method: Method): this & Pick<BuildableRequest, 'method'> {
    return Object.assign(this, { method })
  }

  public setData(data: object): this & Pick<BuildableRequest, 'data'> {
    return Object.assign(this, { data })
  }

  // ここの引数名は this でないといけない
  // this だとチェーンで省略可能っぽいな
  public send(this: BuildableRequest) {
    console.log("")
    console.log(this)

    // 実際の send 処理は省略
  }
}

// 想定の使用
new ExpandedRequestBuilder()
  .setURI("https://0.0.0.0/")
  .setMethod("get")
  .setData({ foo: "piyo" })
  .send()

// 想定外の使用 -> エラー
// -> setXXX() での設定前の send() の呼び出しをコンパイルエラーで検出可能に
new ExpandedRequestBuilder().send()
