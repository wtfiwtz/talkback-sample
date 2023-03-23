import axios, { type AxiosResponse } from 'axios'

export async function getStarWarsCharacter (): Promise<AxiosResponse> {
  return await axios({
    method: 'get',
    url: 'https://swapi.dev/api/people/2'
    // responseType: 'stream'
  })
}
