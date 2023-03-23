import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'
import talkback from 'talkback'
import { getStarWarsCharacter, mockStarWarsAPIServer } from '../../../src/services/star-wars'

// See https://blog.10pines.com/2017/12/18/isolating-integration-tests-from-external-http-services-with-talkback/
const talkbackOpts = {
    host: "https://swapi.dev",
    record: talkback.Options.RecordMode.NEW,
    port: 9999,
    ignoreHeaders: ['user-agent'],
    path: "./tests/http-recordings"
  };
const talkbackServer = talkback(talkbackOpts)

beforeAll(async () => {
    mockStarWarsAPIServer('http://localhost:9999')
    await talkbackServer.start()
})

afterAll((done) => {
    talkbackServer.close(() => {
        done()
    })
})

describe('an API request', () => {
    it('should retrieve C-3PO\'s details from the API server', async () => {
        const c3po = await getStarWarsCharacter()

        expect(c3po.data.name).toEqual('C-3PO')
        expect(c3po.data.height).toEqual('167')
        expect(c3po.data.mass).toEqual('75')
    })
})