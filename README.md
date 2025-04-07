# XPLR App

A modern, secure, and performant web application built with Next.js 14, Supabase, and deployed on Cloudflare Pages. Features a beautiful UI with dark mode support, secure authentication, and edge-ready architecture.

## 🌟 Features

### 🎨 Modern Design System
- Sleek, responsive interface built with Tailwind CSS
- Seamless dark/light mode with system preference detection
- Smooth theme transitions and animations
- Modern component architecture using React Server Components
- Accessible UI components following WCAG guidelines

### 🔐 Authentication System
- Secure email-based authentication with Supabase
- Protected routes with middleware
- Session management and persistence
- Email verification flow
- Secure password handling
- CSRF protection

### 🚀 Performance Features
- Edge-ready with Cloudflare Pages
- React Server Components for optimal loading
- Automatic image optimization
- Dynamic imports and code splitting
- Optimized font loading
- Minified production builds

### 🛡️ Security Features
- Strict Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- Secure cookie handling
- XSS protection headers
- Frame protection headers
- Modern auth practices

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/jdeeduk/xplr.git
   cd xplr
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Production Build**
   ```bash
   npm run build
   ```

## 📁 Project Structure

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
│   ├── header.tsx        # Site header
│   ├── theme-toggle.tsx  # Theme switcher
│   └── theme-provider.tsx # Theme context
├── lib/                  # Utility functions
│   └── supabase/         # Supabase clients
└── middleware.ts         # Auth middleware
```

## 🎨 Theme System

The application includes a sophisticated theme system:

- **Automatic Detection**: Detects and applies system color scheme
- **Manual Override**: Users can override system preference
- **Persistence**: Remembers user preference
- **Smooth Transitions**: Animated theme changes
- **CSS Variables**: Dynamic theme values
- **Tailwind Integration**: Utility-first styling

## 🔒 Security Implementation

Security is a top priority:

- **Authentication**: Secure email-based auth with Supabase
- **Session Management**: Secure cookie-based sessions
- **Headers**: Comprehensive security headers
- **CORS**: Strict CORS policy
- **Environment Variables**: Secure configuration
- **Input Validation**: Strict input validation

## 🚀 Deployment

The application is deployed on Cloudflare Pages:

- **Production URL**: https://xplr-app.pages.dev
- **Edge Runtime**: Enabled for auth callbacks
- **Automatic Deployments**: CI/CD pipeline
- **Environment Management**: Secure variable handling

### 🛠️ Deploy Your Own

1. Fork this repository
2. Create a Supabase project
3. Configure Cloudflare Pages:
   - Build command: `npm run build && npm run pages:build`
   - Build output directory: `.vercel/output/static`
   - Add environment variables

## 🧪 Development Guidelines

- TypeScript for type safety
- Functional components
- Custom hooks for logic reuse
- Proper error handling
- Comprehensive testing
- Consistent code style
- Performance optimization

## 🔜 Roadmap

- [ ] Social authentication (Google, GitHub)
- [ ] User profile customization
- [ ] Password reset flow
- [ ] Email template customization
- [ ] Role-based access control
- [ ] Enhanced theme customization
- [ ] API rate limiting
- [ ] Analytics integration
- [ ] Progressive Web App (PWA)
- [ ] Improved accessibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please follow our coding standards and include tests for new features.

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase team for the auth system
- Cloudflare for the hosting platform
- All contributors and supporters
