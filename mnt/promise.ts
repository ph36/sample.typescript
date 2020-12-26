
/*
 * resolve() に渡した値 (ここでは適当な文字列だけど本来なら結果として渡したいデータなど
 * を resolve() に設定する) を then の `result` として受け取れる
 *
 * Promise の定義自体はこんな感じ
 *
 * const promise = new Promise((resolve, reject) => {
 *   ...
 * })
 */

new Promise((resolve) => {
  resolve('hello')
}).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})

// つまりこゆこと

// Promise の引数は resolve 関数に付ける名前を指定してるだけ
// (通常は resolve にしとくと分かりやすい)
// なんでもいいからここでは foo にしてみる
new Promise((foo) => {
  // そうすると foo って名前で resolve 関数が使えるから成功時の処理結果なりを設定する
  // ここでは仮に 'HELLO' を設定しておく
  foo('HELLO')
}).then((bar) => {
  // then の引数で指定した名前の変数で resolve 関数で設定した値を取得できる
  // ここでは bar に設定したので foo() で渡した 'HELLO' を取れる
  console.log(bar) // Hello, World
}).catch((piyo) => {
  // 失敗した場合は error が設定されるからここで処理する
  console.log(piyo)
})

/*
 * Promise の使いどころ
 */

// 非同期 (無制御): 2 -> 1
setTimeout(() => { console.log(1) }, 500)
console.log(2)

// 非同期 (Promise で制御): 1 -> 2
//
// 今回は resolve() の引数がいらないので明示的に Promise<void> を指定.
// デフォルトは Promise<unknown> で引数必須なので指定しないとエラーになる.
new Promise<void>((resolve) => {
  setTimeout(() => { console.log(1); resolve() }, 500)
}).then(() => {
  console.log(2)
})

// 非同期 (複数まとめて実行する場合)
Promise.all([
  new Promise(resolve => { setTimeout(() => resolve("all: 1"), 200) }),
  new Promise(resolve => { setTimeout(() => resolve("all: 2"), 200) }),
  new Promise(resolve => { setTimeout(() => resolve("all: 3"), 200) }),
]).then((results) => {
  console.log(results[0]) // 1つ目の Promise の resolve の結果
  console.log(results[1]) // 2つ目の Promise の resolve の結果
  console.log(results[2]) // 3つ目の Promise の resolve の結果
})

/*
 * async/await
 */

function test()
{
  const ret = setTimeout(() => console.log("async/await 1"), 200)
  // console.log(typeof ret)
  // console.log(ret)
}
test()

async function test_async()
{
  const ret = await setTimeout(() => console.log("async/await 2"), 200)
  // console.log(typeof ret)
  // console.log(ret)
}
// async 関数はプロミスを返す (await してなくて処理中なので pending になる)
const ret = test_async() // pending
console.log(ret)

async function run_test_async()
{
  const ret = await test_async()
  console.log("run_test_async: " + ret) // undefined
}
// await した場合に返ってくるのはプロミスじゃないことを確認
run_test_async()
