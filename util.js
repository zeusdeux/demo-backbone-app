import cu from 'auto-curry'


const createError = cu(function createError(errorCode, msg) {
  const err  = new Error(msg)

  err.status = errorCode
  return err
})

export const create404Error = createError(404)
export const create500Error = createError(500)
