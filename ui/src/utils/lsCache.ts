export const cacheData = (storageKey: string, data: any, ttlInMilliseconds: number) => {
  const now = new Date()

  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        data: data,
        expires: now.getTime() + ttlInMilliseconds,
      })
    )
  } catch(err) {
    console.log(err)
  }
}

export const getCachedData = (storageKey: string) => {
  const objectData = localStorage.getItem(storageKey)

  if (!objectData) {
    return null
  }

  const { data, expires } = JSON.parse(objectData)
  const now = new Date()

  if (now.getTime() > expires) {
    localStorage.removeItem(storageKey)
    return null
  }

  return data
}

const getCacheKey = (args: any[], prefix: any) => {
  return [prefix, ...args].join("-")
}

export const wrapInCache = (
  func: Function,
  prefix = "",
  async = false,
  cacheTime = 24 * 60 * 60 * 1000
) => {
  const asyncReturn = async function (...args: any[]) {
    const key = getCacheKey(args, prefix)

    if (process.env.NODE_ENV !== 'production') {
      return await func(...args)
    }

    let data = getCachedData(key)

    if (data) return data

    data = await func(...args)

    cacheData(key, data, cacheTime)

    return data
  }

  const syncReturn = function (...args: any[]) {
    const key = getCacheKey(args, prefix)

    if (process.env.NODE_ENV !== 'production') {
      return func(...args)
    }

    let data = getCachedData(key)

    if (data) return data

    data = func(...args)

    cacheData(key, data, cacheTime)

    return data
  }

  return async ? asyncReturn : syncReturn
}
