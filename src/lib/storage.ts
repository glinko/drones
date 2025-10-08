import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  endpoint: process.env.AWS_S3_ENDPOINT || undefined,
  s3ForcePathStyle: (process.env.S3_FORCE_PATH_STYLE || 'false') === 'true',
  signatureVersion: (process.env.S3_SIGNATURE_VERSION as any) || 'v4',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
})

const bucketName = process.env.AWS_S3_BUCKET as string

export function createPresignedPutUrl(key: string, contentType: string, expiresSeconds = 300) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: expiresSeconds,
    ContentType: contentType,
  }
  return s3.getSignedUrl('putObject', params)
}

export function createPresignedGetUrl(key: string, expiresSeconds = 300) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: expiresSeconds,
  }
  return s3.getSignedUrl('getObject', params)
}

export async function deleteObject(key: string): Promise<void> {
  await s3.deleteObject({ Bucket: bucketName, Key: key }).promise()
}

export async function objectExists(key: string): Promise<boolean> {
  try {
    await s3.headObject({ Bucket: bucketName, Key: key }).promise()
    return true
  } catch (err: any) {
    if (err?.statusCode === 404 || err?.code === 'NotFound') return false
    throw err
  }
}


