import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createPresignedPutUrl } from '@/lib/storage'

const schema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
})

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { filename, contentType } = schema.parse(body)

    // TODO: add auth and ACL checks here for project access

    const projectId = params.id
    const key = `${projectId}/${Date.now()}-${filename}`
    const url = createPresignedPutUrl(key, contentType, 300)

    return NextResponse.json({ uploadUrl: url, key })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


