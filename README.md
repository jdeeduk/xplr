# XPLR App

A modern web application built with Next.js 14, Supabase, and deployed on Cloudflare Pages.

## Features

- **Modern Design System**
  - Sleek, responsive interface
  - Light and dark mode support
  - System theme detection
  - Smooth theme transitions
  - Modern component architecture

- **Authentication System**
  - Email-based sign up with confirmation
  - Secure sign in
  - Protected dashboard route
  - Session management with Supabase

- **Modern Tech Stack**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Supabase for authentication and database
  - Tailwind CSS for styling
  - Edge Runtime support
  - Cloudflare Pages deployment

## Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd xplr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file with the following:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication routes
│   │   ├── callback/      # Auth callback handling
│   │   ├── signin/        # Sign in page
│   │   └── signup/        # Sign up page
│   ├── dashboard/         # Protected dashboard
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── header.tsx        # Site header with theme toggle
│   ├── theme-toggle.tsx  # Theme switching component
│   └── theme-provider.tsx # Theme context provider
├── lib/                  # Utility functions
│   └── supabase/         # Supabase client utilities
└── middleware.ts         # Auth middleware
```

## Theme System

The application includes a modern theme system with the following features:

- Light and dark mode support
- System theme detection
- Theme persistence
- Smooth theme transitions
- CSS variables for consistent theming
- Tailwind CSS integration

## Security Features

- Content Security Policy (CSP) headers
- Strict Transport Security (HSTS)
- Edge Runtime for authentication
- Secure cookie handling
- XSS protection headers

## Deployment

The application is deployed on Cloudflare Pages with the following configuration:

- Production URL: https://xplr-app.pages.dev
- Edge Runtime enabled for `/auth/callback`
- Automatic builds and deployments
- Custom security headers

### Deploy Your Own

1. Fork this repository
2. Set up a Supabase project
3. Configure Cloudflare Pages:
   - Build command: `npm run build && npm run pages:build`
   - Build output directory: `.vercel/output/static`
   - Environment variables from `.env.local`

## Development Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Implement proper error handling
- Add appropriate TypeScript interfaces
- Use Tailwind CSS for styling
- Test authentication flows thoroughly
- Maintain theme consistency

## Known Limitations

- Email confirmation required for new accounts
- Must use production URL for authentication callbacks
- Requires Edge Runtime support

## Future Enhancements

- [ ] Social authentication providers
- [ ] User profile management
- [ ] Password reset functionality
- [ ] Email customization
- [ ] Role-based access control
- [ ] Additional theme customization options
- [ ] Theme preference API

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License - See LICENSE file for details
