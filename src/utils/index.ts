import * as ncp from 'ncp'

/**
 *
 * @param what
 * @param where
 */
export const ncpCopy = (what: string, where: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    ncp(what, where, { limit: 16 }, (err: Error[] | null) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      resolve()
    })
  })
}
