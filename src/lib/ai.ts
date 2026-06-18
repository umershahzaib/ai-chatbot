import { GoogleGenerativeAI } from '@google/generative-ai'
import Anthropic from '@anthropic-ai/sdk'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function getAIResponse(
  messages: Message[],
  model: string,
  provider: 'GOOGLE' | 'ANTHROPIC'
): Promise<string> {
  try {
    if (provider === 'GOOGLE') {
      if (!process.env.GOOGLE_API_KEY) {
        throw new Error('Google API key not configured. Please add GOOGLE_API_KEY to your .env file.')
      }

      const geminiModel = genAI.getGenerativeModel({ model: model })

      // Convert messages to Gemini format
      const systemMessage = messages.find(m => m.role === 'system')
      const conversationMessages = messages.filter(m => m.role !== 'system')

      // Build chat history for Gemini
      const history = conversationMessages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }))

      // Get the last user message
      const lastMessage = conversationMessages[conversationMessages.length - 1]
      let prompt = lastMessage.content

      // If there's a system message and this is the first user message, prepend it
      if (systemMessage && conversationMessages.length === 1) {
        prompt = `${systemMessage.content}\n\n${prompt}`
      }

      const chat = geminiModel.startChat({
        history: history,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        },
      })

      const result = await chat.sendMessage(prompt)
      const response = await result.response
      return response.text() || 'No response generated.'
    } else if (provider === 'ANTHROPIC') {
      if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('Anthropic API key not configured. Please add ANTHROPIC_API_KEY to your .env file.')
      }

      // Convert messages format for Anthropic
      const systemMessage = messages.find(m => m.role === 'system')
      const conversationMessages = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role === 'user' ? 'user' as const : 'assistant' as const,
          content: m.content,
        }))

      const response = await anthropic.messages.create({
        model: model,
        max_tokens: 2000,
        system: systemMessage?.content,
        messages: conversationMessages,
      })

      const content = response.content[0]
      return content.type === 'text' ? content.text : 'No response generated.'
    } else {
      throw new Error(`Provider ${provider} not supported`)
    }
  } catch (error: any) {
    console.error('AI API Error:', error)

    // Provide helpful error messages
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key not valid')) {
      throw new Error('Invalid API key. Please check your configuration.')
    }
    if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please check your API key billing.')
    }
    if (error.message?.includes('not found') || error.message?.includes('404')) {
      throw new Error('Model not found. Please select a different model.')
    }

    throw new Error(error.message || 'Failed to get AI response')
  }
}

export const AI_MODELS = {
  GOOGLE: [
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'GOOGLE' },
  ],
  ANTHROPIC: [],
}
