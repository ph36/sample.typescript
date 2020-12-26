
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
    }
  }
}

// Promise に渡すエグゼキュータ
type Executor<T, E extends Error> = (
  // 処理の成功
  resolve: (result: T) => void,
  // 処理の失敗
  reject: (erorr: E) => void,
) => void

class Promise<T, E extends Error>
{
  constructor(f: Executor<T, E>) {}

  then<U, F extends Error>(g: (result: T) => Promise<U, F> | U): Promise<U, F>
  cache<U, F extends Error>(g: (error: E) => Promise<U, F> | U): Promise<U, F>
}

// function appendAndReadPromise(path: string, data: staring): Promise<string> 
// {
//   return appendPromise(path, data)
//     .then(() => readPromise(path))
//     .cache(error => console.error(error))
// }
