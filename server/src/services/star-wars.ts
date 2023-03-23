import axios, { type AxiosResponse } from 'axios'

let STARWARS_API_SERVER = 'https://swapi.dev'
export function mockStarWarsAPIServer(svr: string) {
  STARWARS_API_SERVER = svr
}

export async function getStarWarsCharacter (): Promise<AxiosResponse> {
  return await axios({
    method: 'get',
    url: `${STARWARS_API_SERVER}/api/people/2`
    // responseType: 'stream'
  })
}
