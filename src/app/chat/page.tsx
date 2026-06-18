"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, Bot, User, Loader2, MessageSquare, Home, Trash2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  model: string
  provider: string
  createdAt: number
  updatedAt: number
}

const AI_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'GOOGLE' },
]

// Valid model IDs that exist in the APIs
const VALID_MODEL_IDS = AI_MODELS.map(m => m.id)

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Handle client-side mounting first
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load chats from localStorage only after mounting
  useEffect(() => {
    if (!mounted) return

    try {
      const savedChats = localStorage.getItem('ai-chats')

      if (savedChats) {
        const parsedChats = JSON.parse(savedChats)
        setChats(parsedChats)

        if (parsedChats.length > 0) {
          setCurrentChatId(parsedChats[0].id)
        } else {
          createNewChat()
        }
      } else {
        // No saved chats, create first one
        createNewChat()
      }
    } catch (error) {
      console.error('Error loading chats:', error)
      // Clear corrupted data and start fresh
      localStorage.removeItem('ai-chats')
      createNewChat()
    }
  }, [mounted])

  // Save chats to localStorage whenever they change (only on client)
  useEffect(() => {
    if (mounted && chats.length > 0) {
      localStorage.setItem('ai-chats', JSON.stringify(chats))
    }
  }, [chats, mounted])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChatId, chats])

  const currentChat = chats.find(c => c.id === currentChatId)

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      model: 'gemini-2.5-flash', // Default to Gemini 2.5 Flash
      provider: 'GOOGLE',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setChats(prev => [newChat, ...prev])
    setCurrentChatId(newChat.id)
  }

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(c => c.id !== chatId)
    setChats(updatedChats)

    if (currentChatId === chatId) {
      if (updatedChats.length > 0) {
        setCurrentChatId(updatedChats[0].id)
      } else {
        setCurrentChatId(null)
        createNewChat()
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || loading || !currentChat) return

    const userMessage = input.trim()
    setInput('')

    // Validate model before sending
    if (!VALID_MODEL_IDS.includes(currentChat.model)) {
      toast({
        title: 'Invalid Model',
        description: 'Please select a valid model from the dropdown.',
        variant: 'destructive',
      })
      return
    }

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: Date.now(),
    }

    const updatedMessages = [...currentChat.messages, newUserMessage]
    updateChatMessages(currentChat.id, updatedMessages)

    // Update title if first message
    if (currentChat.messages.length === 0) {
      updateChatTitle(currentChat.id, userMessage.slice(0, 50))
    }

    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
          model: currentChat.model,
          provider: currentChat.provider,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: Date.now(),
      }

      updateChatMessages(currentChat.id, [...updatedMessages, aiMessage])
    } catch (error: any) {
      console.error('Chat error:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      })
      // Remove the optimistic user message on error
      updateChatMessages(currentChat.id, currentChat.messages)
    } finally {
      setLoading(false)
      textareaRef.current?.focus()
    }
  }

  const updateChatMessages = (chatId: string, messages: Message[]) => {
    setChats(chats.map(c =>
      c.id === chatId
        ? { ...c, messages, updatedAt: Date.now() }
        : c
    ))
  }

  const updateChatTitle = (chatId: string, title: string) => {
    setChats(chats.map(c =>
      c.id === chatId
        ? { ...c, title }
        : c
    ))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleModelChange = (value: string) => {
    if (!currentChat) return

    const selectedModel = AI_MODELS.find(m => m.id === value)
    if (selectedModel) {
      setChats(chats.map(c =>
        c.id === currentChat.id
          ? { ...c, model: value, provider: selectedModel.provider }
          : c
      ))
    }
  }

  // Prevent hydration mismatch by showing loading until mounted
  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading chat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">AI Chat Bot</span>
          </Link>
        </div>

        <div className="p-4 space-y-2">
          <Button onClick={createNewChat} className="w-full">
            <MessageSquare className="h-4 w-4 mr-2" />
            New Chat
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">
            RECENT CHATS
          </div>
          <div className="space-y-1">
            {chats.map(chat => (
              <div
                key={chat.id}
                className={`group flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-secondary ${
                  currentChatId === chat.id ? 'bg-secondary' : ''
                }`}
                onClick={() => setCurrentChatId(chat.id)}
              >
                <span className="truncate text-sm flex-1">{chat.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteChat(chat.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Header */}
            <div className="border-b p-4 bg-card">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Model:</span>
                  <Select value={currentChat.model} onValueChange={handleModelChange}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AI_MODELS.map(m => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentChat.messages.length} messages
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-4xl mx-auto space-y-6">
                {currentChat.messages.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                    <p className="text-muted-foreground">
                      Ask me anything! I'm here to help.
                    </p>
                  </div>
                ) : (
                  currentChat.messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <Avatar className="flex-shrink-0">
                        {message.role === 'user' ? (
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <Card
                        className={`flex-1 p-4 ${
                          message.role === 'user' ? 'bg-primary text-primary-foreground' : ''
                        }`}
                      >
                        {message.role === 'user' ? (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        )}
                      </Card>
                    </div>
                  ))
                )}
                {loading && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <Card className="p-4">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                      </div>
                    </Card>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4 bg-card">
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="flex space-x-2">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... (Shift+Enter for new line)"
                    className="min-h-[60px] max-h-[200px] resize-none"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    disabled={loading || !input.trim()}
                    size="icon"
                    className="h-[60px] w-[60px]"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No chat selected</h3>
              <p className="text-muted-foreground mb-4">Create a new chat to get started</p>
              <Button onClick={createNewChat}>
                <MessageSquare className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
