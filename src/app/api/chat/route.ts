import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const prompt = searchParams.get('prompt')

  if (!prompt) {
    return new Response('Missing prompt parameter', { status: 400 })
  }

  const result = streamText({
    model: anthropic('claude-3-5-haiku-latest'),
    messages: [{ role: 'user', content: prompt }],
  })

  return result.toDataStreamResponse()
}
