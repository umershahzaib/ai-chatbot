import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  MessageSquare,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  Bot,
  Users,
  TrendingUp
} from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">AI Chat Bot</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="#features" className="text-sm hover:text-primary transition hidden md:inline">
              Features
            </Link>
            <Link href="/chat">
              <Button>Start Chatting</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-6 text-sm">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              <span>Powered by GPT-4, Claude, and more</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Chat with the World's Most Advanced AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Experience intelligent conversations with multiple AI models.
              Get instant answers, creative ideas, and expert assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Chatting Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for AI Conversations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional features designed for seamless AI interactions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Multiple AI Models</CardTitle>
                <CardDescription>
                  Access GPT-4, Claude 3, and other leading AI models in one platform
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Get instant responses with optimized API connections and smart caching
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your conversations are processed securely with industry-standard encryption
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Chat History</CardTitle>
                <CardDescription>
                  Never lose context with automatic conversation history saved locally
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>No Sign-up Required</CardTitle>
                <CardDescription>
                  Start chatting immediately without creating an account or logging in
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Sparkles className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Custom Models</CardTitle>
                <CardDescription>
                  Choose the perfect model for each task - from fast to most capable
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience AI Conversations?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Start chatting with advanced AI models right now - no sign-up required
          </p>
          <Link href="/chat">
            <Button size="lg" variant="secondary">
              Start Chatting Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-bold">AI Chat Bot</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your intelligent conversation partner powered by the latest AI technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="/chat">Chat</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#">Privacy</Link></li>
                <li><Link href="#">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 AI Chat Bot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
