# AI Chat Bot - Quick Setup Guide

## Step 1: Get Your API Keys

You need at least ONE of these API keys:

### Option A: Google Gemini (Recommended)
1. Go to https://aistudio.google.com/app/apikey
2. Sign up or log in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Paste it in `.env` as `GOOGLE_API_KEY`

**Note:** Google Gemini offers a generous free tier - perfect for getting started!

### Option B: Anthropic (For Claude)
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Create an API key
4. Copy the key (starts with `sk-ant-`)
5. Paste it in `.env` as `ANTHROPIC_API_KEY`

## Step 2: Update .env File

Edit the `.env` file in the root directory:

```bash
# Add your API key(s) here
GOOGLE_API_KEY=your-google-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

## Step 3: Run the Application

```bash
npm run dev
```

Open http://localhost:3001 in your browser.

## Step 4: Start Chatting!

1. Click "Start Chatting"
2. Select a model from the dropdown
3. Type your message and press Enter
4. Enjoy!

## Deploy to Vercel

1. Push to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables (your API keys)
5. Deploy!

## Troubleshooting

**"API key not configured" error:**
- Make sure you added your API key to `.env`
- Restart the dev server after updating `.env`

**"Insufficient quota" error:**
- Your API account needs billing enabled
- Add credits to your OpenAI/Anthropic account

**Port 3000 already in use:**
- The app will automatically use port 3001
- Or stop the other process using port 3000

## That's it!

Your AI Chat Bot is ready to use. No database, no authentication, just pure AI chat functionality.
