# Next Knitting App

A modern Next.js application for browsing knitting patterns, managing projects, and interacting with the Ravelry community. This app integrates with the Ravelry API to provide a seamless experience for knitters and crocheters.

## Features

- **Authentication**: Secure OAuth2 authentication with Ravelry using Better Auth
- **Pattern Browsing**: Search and browse knitting patterns from Ravelry
- **Pattern Details**: View detailed information about patterns including descriptions, pricing, and craft types
- **Comments**: Read and interact with pattern comments
- **My Space**: Personal dashboard to view your projects
- **Internationalization**: Support for English and Czech languages
- **Component Library**: Storybook integration for component development and documentation
- **Analytics**: Google Analytics 4 integration for usage tracking
- **Error Tracking**: Sentry integration for error monitoring

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query) (React Query)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest with React Testing Library
- **Component Development**: Storybook
- **Error Monitoring**: Sentry
- **Analytics**: Google Analytics 4

## Prerequisites

- Node.js 18+
- Yarn package manager
- Ravelry API credentials (Client ID and Client Secret)
- A Ravelry OAuth application configured with appropriate redirect URIs

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd next-knitting-app
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

### Environment Setup

1. Copy the environment example file:

   ```bash
   cp .env.example .env.local
   ```

2. Generate a secure `BETTER_AUTH_SECRET`:

   ```bash
   openssl rand -base64 32
   ```

   Copy the generated secret and add it to your `.env.local` file:

   ```
   BETTER_AUTH_SECRET=your-generated-secret-here
   ```

3. Fill in all required environment variables in `.env.local`:

   **Required Server Variables:**
   - `APP_BASE_URL`: Base URL of your application (e.g., `http://localhost:3000`)
   - `RAVELRY_URL`: Ravelry API base URL
   - `RAVELRY_CLIENT_ID`: Your Ravelry OAuth client ID
   - `RAVELRY_CLIENT_SECRET`: Your Ravelry OAuth client secret
   - `RAVELRY_AUTHORIZATION_URL`: Ravelry OAuth authorization endpoint
   - `RAVELRY_TOKEN_URL`: Ravelry OAuth token endpoint
   - `RAVELRY_REDIRECT_URI`: OAuth redirect URI configured in your Ravelry app
   - `BETTER_AUTH_SECRET`: Secret key for Better Auth (generated above)

   **Optional Client Variables:**
   - `NEXT_PUBLIC_GA4_MEASUREMENT_ID`: Google Analytics 4 measurement ID
   - `NEXT_PUBLIC_SENTRY_DSN`: Sentry DSN for error tracking

   **Optional Server Variables:**
   - `ENV_NAME`: Environment name (`local`, `staging`, or `production`), defaults to `local`

### Running the Development Server

Start the development server with HTTPS support:

```bash
yarn dev
```

The application will be available at `https://localhost:3000` (or the port specified by Next.js).

## Available Scripts

- `yarn dev` - Start the development server with HTTPS
- `yarn build` - Build the application for production
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint to check code quality
- `yarn format:check` - Check code formatting with Prettier
- `yarn format:write` - Format code with Prettier
- `yarn typecheck` - Run TypeScript type checking
- `yarn test` - Run all tests with Vitest
- `yarn test:unit` - Run unit tests only (skips Storybook tests)
- `yarn test:storybook` - Run Storybook tests
- `yarn storybook` - Start Storybook development server on port 6006
- `yarn build-storybook` - Build Storybook for production

## Project Structure

```
next-knitting-app/
├── src/
│   ├── api/              # API routes and query hooks
│   ├── app/              # Next.js App Router pages
│   │   ├── [locale]/     # Localized routes
│   │   │   ├── my-space/ # User dashboard and projects
│   │   │   └── patterns/ # Pattern browsing and details
│   │   └── api/          # API route handlers
│   ├── components/       # React components
│   │   ├── component-library/ # Reusable UI components
│   │   ├── my-space/     # User space components
│   │   └── patterns/     # Pattern-related components
│   ├── configs/          # Configuration files
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization setup
│   ├── lib/              # Utility libraries
│   │   └── auth/         # Authentication configuration
│   ├── locales/          # Translation files (en, cs)
│   ├── schema/           # Zod schemas for validation
│   └── types/            # TypeScript type definitions
├── .storybook/           # Storybook configuration
├── public/               # Static assets
└── middleware.ts         # Next.js middleware for i18n
```

## Key Features Explained

### Authentication

The app uses Better Auth with a custom Ravelry OAuth2 provider. Users can sign in with their Ravelry credentials, and the app securely stores access tokens for API requests.

### Pattern Browsing

- Search patterns by query
- Browse paginated pattern lists
- View pattern details including images, descriptions, pricing, and craft types
- Read and view pattern comments

### My Space

Authenticated users can access their personal space to:

- View their Ravelry projects
- Manage their knitting projects

### Internationalization

The app supports multiple languages (currently English and Czech). The locale is automatically detected from the URL path (`/en/...` or `/cs/...`).

## Development Guidelines

### Code Style

- Follow the ESLint configuration
- Use Prettier for code formatting
- Write TypeScript with proper type definitions
- Follow React best practices and hooks conventions

### Component Development

Components are developed and documented in Storybook. Each component in `src/components/component-library/` should have a corresponding `.stories.tsx` file.

### Testing

- Write unit tests for components and utilities
- Use Vitest and React Testing Library
- Test files should be co-located with components or in test directories

## Building for Production

1. Set all required environment variables
2. Build the application:
   ```bash
   yarn build
   ```
3. Start the production server:
   ```bash
   yarn start
   ```

## License

[Add your license information here]
