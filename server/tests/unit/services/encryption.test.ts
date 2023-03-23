import { describe, expect, it } from '@jest/globals'
import { decrypt, encrypt, generateEC, hash } from '../../../src/services/encryption'

describe('Generate an Elliptic Curve key pair', () => {
  it('should give me a public and private key', () => {
    const keyPair = generateEC()

    expect(keyPair.privateKey).not.toBeNull()
    expect(keyPair.publicKey).not.toBeNull()
    expect(keyPair.privateKey.byteLength).toBeGreaterThanOrEqual(134)
    expect(keyPair.privateKey.byteLength).toEqual(135)
    expect(keyPair.publicKey.byteLength).toBeGreaterThan(0)
  })
})

describe('Use encryption and decryption with AES-256 and GCM mode', () => {
  it('should encrypt a secret message', () => {
    const secretMessage = 'Roses are red, violets are blue, sugar is sweet, but nothing compares to you.'

    const key = hash('here\s a key');
    const iv = 'here\s an initialization vector, or IV';

    const [encrypted, authTag] = encrypt('aes-256-gcm', key, iv, secretMessage)
    expect(encrypted).not.toBeNull
    expect(encrypted.length).toBeGreaterThanOrEqual(104)
  })

  it('should decrypt a secret message', () => {
    const secretMessage = 'When the night is darkest, and the stars are brightest, look up to the sky and know that I am thinking of you.'

    const key = hash('here\s another key');
    const iv = 'here\s another initialization vector, known as an IV';

    const [encrypted, authTag] = encrypt('aes-256-gcm', key, iv, secretMessage)
    expect(encrypted).not.toBeNull
    expect(encrypted.length).toBeGreaterThanOrEqual(148)    

    const decrypted = decrypt('aes-256-gcm', key, iv, encrypted, authTag)
    expect(decrypted).toEqual(secretMessage)
  })
})
