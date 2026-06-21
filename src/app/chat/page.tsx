"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Send,
  Bot,
  User,
  Loader2,
  MessageSquare,
  Home,
  Trash2,
  Menu,
  X,
  Copy,
  Check,
  Sparkles,
  Plus,
  MoreVertical
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { toast } from '@/components/ui/use-toast'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

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

const VALID_MODEL_IDS = AI_MODELS.map(m => m.id)

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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
        createNewChat()
      }
    } catch (error) {
      console.error('Error loading chats:', error)
      localStorage.removeItem('ai-chats')
      createNewChat()
    }
  }, [mounted])

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const currentChat = chats.find(c => c.id === currentChatId)

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      model: 'gemini-2.5-flash',
      provider: 'GOOGLE',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setChats(prev => [newChat, ...prev])
    setCurrentChatId(newChat.id)
    setSidebarOpen(false)
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

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(messageId)
      setTimeout(() => setCopiedId(null), 2000)
      toast({
        title: 'Copied!',
        description: 'Message copied to clipboard',
      })
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy message to clipboard',
        variant: 'destructive',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || loading || !currentChat) return

    const userMessage = input.trim()
    setInput('')

    if (!VALID_MODEL_IDS.includes(currentChat.model)) {
      toast({
        title: 'Invalid Model',
        description: 'Please select a valid model from the dropdown.',
        variant: 'destructive',
      })
      return
    }

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: Date.now(),
    }

    const updatedMessages = [...currentChat.messages, newUserMessage]
    updateChatMessages(currentChat.id, updatedMessages)

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

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-[280px] border-r border-border/50 bg-background
          flex flex-col
          lg:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="h-14 px-3 flex items-center justify-between border-b border-border/50">
          <Link href="/" className="flex items-center gap-2 px-2 hover:opacity-80 transition-opacity">
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sm">AI Chat</span>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            onClick={createNewChat}
            className="w-full justify-start gap-2 h-9 font-normal"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3 pb-3">
          <div className="space-y-1">
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`
                  group relative flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer
                  transition-colors duration-150
                  ${currentChatId === chat.id
                    ? 'bg-secondary/80 text-foreground'
                    : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
                  }
                `}
                onClick={() => {
                  setCurrentChatId(chat.id)
                  setSidebarOpen(false)
                }}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate font-medium">{chat.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {chat.messages.length} {chat.messages.length === 1 ? 'message' : 'messages'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteChat(chat.id)
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-border/50 p-3">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-2 h-9 font-normal">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {currentChat ? (
          <>
            {/* Header */}
            <header className="h-14 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="h-full max-w-4xl mx-auto px-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-9 w-9"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-semibold leading-none">{currentChat.title}</p>
                      <p className="text-xs text-muted-foreground">{currentChat.messages.length} messages</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => deleteChat(currentChat.id)}
                  aria-label="Delete current chat"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 py-8">
                <AnimatePresence initial={false}>
                  {currentChat.messages.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-20 text-center"
                    >
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                        <Bot className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">How can I help you today?</h3>
                      <p className="text-muted-foreground text-sm max-w-md">
                        I'm an AI assistant powered by Google Gemini. Ask me anything!
                      </p>
                    </motion.div>
                  ) : (
                    currentChat.messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`group mb-8 ${message.role === 'user' ? 'flex justify-end' : ''}`}
                      >
                        <div className={`flex gap-4 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <Avatar className="h-8 w-8 border border-border/50">
                              {message.role === 'user' ? (
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              ) : (
                                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs">
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              )}
                            </Avatar>
                          </div>

                          {/* Message Content */}
                          <div className="flex-1 min-w-0">
                            <div className={`
                              ${message.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-2xl px-4 py-3'
                                : ''
                              }
                            `}>
                              {message.role === 'user' ? (
                                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                  {message.content}
                                </p>
                              ) : (
                                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border/50">
                                  <ReactMarkdown>{message.content}</ReactMarkdown>
                                </div>
                              )}
                            </div>

                            {/* Message Actions (AI only) */}
                            {message.role === 'assistant' && (
                              <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(message.content, message.id)}
                                  className="h-7 px-2 text-xs"
                                >
                                  {copiedId === message.id ? (
                                    <>
                                      <Check className="h-3 w-3 mr-1" />
                                      Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3 mr-1" />
                                      Copy
                                    </>
                                  )}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>

                {/* Loading State */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <div className="flex gap-4">
                      <Avatar className="h-8 w-8 border border-border/50">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2 px-4 py-3 bg-secondary/30 rounded-2xl">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="max-w-4xl mx-auto px-4 py-4">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative flex items-end gap-2 bg-secondary/30 rounded-2xl border border-border/50 focus-within:border-primary/50 transition-colors p-2">
                    <Textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Message AI..."
                      className="flex-1 min-h-[44px] max-h-[200px] resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 py-2 text-sm placeholder:text-muted-foreground/50"
                      disabled={loading}
                      rows={1}
                    />
                    <Button
                      type="submit"
                      disabled={loading || !input.trim()}
                      size="icon"
                      className="h-9 w-9 rounded-xl flex-shrink-0"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-2 text-center">
                    AI can make mistakes. Check important information.
                  </p>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No chat selected</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Start a new conversation to begin
              </p>
              <Button onClick={createNewChat} className="gap-2">
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
