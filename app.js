import { join } from 'path'
import logger from 'morgan'
import express from 'express'
import { json, urlencoded } from 'body-parser'
import routes from './routes'


const app       = express()
const publicDir = join(__dirname, 'public')
const isProd    = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'

app.set('views', publicDir)
app.set('view engine', 'ejs')

app.use(logger('combined'))

app.use(json())
app.use(urlencoded({ extended: true }))

app.use(express.static(publicDir))

app.use('/', routes)

app.use((req, res, next) => {
  const err = new Error(`${req.path} not found`)

  err.status = 404
  next(err)
})

app.use((err, req, res, _) => {
  const status = err.status || 500

  if (req.xhr) req.sendStatus(status)
  else {
    const payload = {
      status,
      msg: err.message
    }

    // show stack trace if NOT production
    payload.stack = isProd ? '' : err.stack.split('\n').join('<br />')

    res.status(status)
    res.render('error', payload)
  }
})

export default app
