
/*
 * プロミスを自作して動作を理解する (うまく動いてない)
 *
 * ```
 * yarn add @types/node
 * ```
 */

// 非同期関数 fs.readFile
import { readFile } from 'fs'

function readFilePromise(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // コールバック
    readFile(path, (error, result) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(result)
      }
    })
  })
}

// Promise に渡すエグゼキュータ
type Executor<T> = (
  // 処理の成功
  resolve: (result: T) => void,
  // 処理の失敗
  reject: (erorr: unknown) => void,
) => void

class Promise<T>
{
  constructor(f: Executor<T>) {}

  /*
   * Promise を直列に並べるための機構
   */

  // 成功した Promise の結果を新しい Promise にマップ
  then<U>(g: (result: T) => Promise<U> | U): Promise<U>
  // エラーを新しい Promise にマップ
  cache<U>(g: (error: unknown) => Promise<U> | U): Promise<U>
}

// function appendAndReadPromise(path: string, data: staring): Promise<string>
// {
//   return appendPromise(path, data)
//     .then(() => readPromise(path))
//     .cache(error => console.error(error))
// }
