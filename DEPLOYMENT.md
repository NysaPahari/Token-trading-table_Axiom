# Deployment Guide - Vercel

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "Add New Project"
3. Import your GitHub repository: `Token-trading-table_Axiom`
4. Vercel will automatically detect Next.js and configure the project
5. Click "Deploy" - your site will be live in minutes!

## Option 2: Deploy via Vercel CLI

1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Deploy to production:
   ```bash
   vercel --prod
   ```

3. Follow the prompts to link your project

## Environment Variables

If you need any environment variables, add them in the Vercel dashboard under:
Project Settings → Environment Variables

## Automatic Deployments

Once connected to GitHub, Vercel will automatically deploy:
- Every push to `main` branch → Production deployment
- Every pull request → Preview deployment

## Project Configuration

The project is configured with:
- Framework: Next.js 16
- Build Command: `npm run build`
- Output Directory: `.next`
- Node Version: 18.x (auto-detected)

