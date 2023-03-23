import { describe, expect, it } from '@jest/globals'
import { getStarWarsCharacter } from '../../../src/services/star-wars'

describe('an API request', () => {
    it('should retrieve C-3PO\'s details from the API server', async () => {
        const c3po = await getStarWarsCharacter()

        expect(c3po.data.name).toEqual('C-3PO')
        expect(c3po.data.height).toEqual('167')
        expect(c3po.data.mass).toEqual('75')
    })
})