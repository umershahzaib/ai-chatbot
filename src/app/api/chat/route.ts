import { NextResponse } from 'next/server'
import { getAIResponse } from '@/lib/ai'

export async function POST(req: Request) {
  try {
    const { message, messages, model, provider } = await req.json()

    if (!message || !model || !provider) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get AI response
    const aiResponse = await getAIResponse(messages, model, provider as 'GOOGLE' | 'ANTHROPIC')

    return NextResponse.json({
      message: aiResponse,
    })
  } catch (error: any) {
    console.error('[CHAT_ERROR]', error)
    return NextResponse.json(
      { error: error.message || 'Internal error' },
      { status: 500 }
    )
  }
}
