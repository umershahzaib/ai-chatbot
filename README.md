# AI Chat Bot - No Auth Version

A modern, full-stack AI chat application built with Next.js 16, featuring multiple AI models (GPT-4, Claude) without authentication requirements.

## Features

✨ **Multiple AI Models**
- OpenAI (GPT-3.5 Turbo, GPT-4, GPT-4 Turbo)
- Anthropic (Claude 3 Haiku, Sonnet, Opus)
- Easy model switching per conversation

💬 **Advanced Chat Features**
- Real-time AI conversations
- Local chat history with localStorage
- Markdown rendering
- Beautiful, responsive UI
- No sign-up or login required

🚀 **Easy Deployment**
- No database required
- Serverless-ready
- Deploy to Vercel in minutes

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **AI Providers:** OpenAI, Anthropic
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Deployment:** Vercel

## Prerequisites

- Node.js 18+
- OpenAI API key OR Anthropic API key (at least one)

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ai-chat-bot
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
# At least one API key is required
OPENAI_API_KEY=sk-xxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

#### Get Your API Keys:

**OpenAI** (Required for GPT models)
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an API key
3. Copy to `OPENAI_API_KEY`

**Anthropic** (Optional - for Claude models)
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an API key
3. Copy to `ANTHROPIC_API_KEY`

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/          # Chat API endpoint
│   │   ├── chat/              # Chat interface page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   └── ui/                # UI components
│   └── lib/
│       ├── ai.ts              # AI provider integrations
│       └── utils.ts           # Utilities
├── .env                       # Environment variables
├── next.config.js             # Next.js config
└── tailwind.config.ts         # Tailwind config
```

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-chat-bot)

### Manual Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Add environment variables:
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY` (optional)
5. Deploy!

Your app will be live at `https://your-app.vercel.app`

## Usage

### Start Chatting

1. Visit the application
2. Click "Start Chatting" or go to `/chat`
3. Select your preferred AI model from the dropdown
4. Type your message and press Enter (or Shift+Enter for new line)
5. Your chat history is saved locally in your browser

### Switching Models

- Use the model selector dropdown to switch between different AI models
- Each chat can use a different model
- Changes take effect immediately for new messages

### Managing Chats

- Click "New Chat" to start a fresh conversation
- Click the trash icon to delete a chat
- All chats are stored in browser localStorage

## Features

- ✅ No authentication required
- ✅ No database needed
- ✅ Works offline (after first load)
- ✅ Privacy-focused (chat stored locally)
- ✅ Fast and responsive
- ✅ Mobile-friendly
- ✅ Dark mode support (system preference)

## API Endpoints

- `POST /api/chat` - Send a message to AI
  - Body: `{ message, messages, model, provider }`
  - Returns: `{ message }`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes* | OpenAI API key for GPT models |
| `ANTHROPIC_API_KEY` | Yes* | Anthropic API key for Claude models |

*At least one API key is required

## Troubleshooting

### API Errors

If you see API errors:
- Verify your API keys are correct in `.env`
- Check your API quota/billing
- Ensure you have credits in your account

### Chat Not Saving

If chats don't persist:
- Check browser localStorage is enabled
- Clear browser cache and try again
- Check browser console for errors

### Build Errors

If build fails:
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## Cost Estimation

This app uses pay-as-you-go AI APIs:
- GPT-3.5 Turbo: ~$0.002 per 1K tokens
- GPT-4: ~$0.03 per 1K tokens
- Claude 3 Haiku: ~$0.00025 per 1K tokens

Average conversation (20 messages): $0.05 - $0.50 depending on model

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and AI technology.
