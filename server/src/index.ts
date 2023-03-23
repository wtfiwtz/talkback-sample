import express, { type Express, type Request, type Response } from 'express'
import dotenv from 'dotenv'
import { getStarWarsCharacter } from './services/star-wars'
// import { encrypt, generateEC } from './services/encryption'
import escape from 'escape-html'

dotenv.config()

const app: Express = express()
const port = process.env.PORT !== undefined ? process.env.PORT : '8000'

app.get('/', (req: Request, res: Response) => {
  // const ecPair = generateEC()
  // console.log('ecPair', ecPair)
  // const key = 'here\s a key';
  // const iv = 'here\s an iv';
  // const result = encrypt('aes-256-gcm', key, iv, 'secret message')

  getStarWarsCharacter()
    .then((response) => {
      console.log('c3po', response.data)
      res.send(`A star-wars character is... ${escape(response.data.name)}, with height ${escape(response.data.height)}cm and mass ${escape(response.data.mass)}kg`)
    })
    .catch((err) => {
      console.error(err)
      res.send('Express + TypeScript Server: API request failed :(')
    })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
