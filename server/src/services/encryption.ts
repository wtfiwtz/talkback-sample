import { generateKeyPairSync, createCipheriv, type KeyPairSyncResult, createHash, createDecipheriv, type CipherGCM, type DecipherGCM } from 'node:crypto'

export function generateEC (namedCurve: string = 'secp256k1'): KeyPairSyncResult<Buffer, Buffer> {
  return generateKeyPairSync('ec', {
    namedCurve,
    publicKeyEncoding: {
      type: 'spki',
      format: 'der'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'der'
    }
  })
}

export function hash (message: string): Buffer {
  return createHash('sha256').update(message).digest()
}

export function encrypt (alg: string, key: Buffer, iv: string, message: string): [string, Buffer] {
  // TODO: Assumes GCM cipher
  const cipher = createCipheriv(alg, key, iv) as CipherGCM
  let encrypted = ''

  cipher.on('readable', () => {
    let chunk: any
    while ((chunk = cipher.read()) !== null) {
      encrypted += chunk.toString('base64') as string
    }
  })

  cipher.write(message)
  cipher.end()
  const authTag = cipher.getAuthTag()

  return [encrypted, authTag]
}

export function decrypt (alg: string, key: Buffer, iv: string, encryptedMessage: string, authTag: NodeJS.ArrayBufferView | undefined): string {
  // TODO: Assumes GCM cipher
  const cipher = createDecipheriv(alg, key, iv) as DecipherGCM
  if (authTag !== undefined) { cipher.setAuthTag(authTag) }

  const decrypted = Buffer.concat([
    cipher.update(encryptedMessage, 'base64'),
    cipher.final()
  ])

  return decrypted.toString()
}
