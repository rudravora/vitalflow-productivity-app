# VitalFlow

## Overview

VitalFlow is a personal productivity ecosystem application that provides users with personalized tips, habit tracking, and gamified progress monitoring. The application adapts to users' current mood and energy levels to deliver contextually relevant productivity advice. Built as a full-stack web application with a React frontend and Express backend, it features a gamified experience with achievements, progress gardens, and comprehensive analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives for consistent, accessible design
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management with custom hooks for productivity features
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: Modular component architecture with separate UI components, page components, and business logic hooks

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with endpoints for user progress, habits, and productivity tips
- **Data Layer**: Abstract storage interface with in-memory implementation for development
- **Middleware**: Custom logging middleware for API request tracking and error handling

### Data Storage Solutions
- **Database**: PostgreSQL using Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL for cloud hosting
- **Data Models**: Users, user progress, habits, and productivity tips with relational structure
- **Development Storage**: In-memory storage implementation with seed data for local development

### Authentication and Authorization
- **Current Implementation**: Demo user system for development and testing
- **Session Management**: Connect-pg-simple for PostgreSQL session storage (configured but not actively used)
- **Future Considerations**: Prepared for user authentication with password hashing and session management

### External Dependencies
- **Database Hosting**: Neon Database for serverless PostgreSQL
- **Development Tools**: Replit-specific plugins for development environment integration
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Date Utilities**: date-fns for date manipulation and formatting
- **Notifications**: Toast notifications using Radix UI Toast primitives

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client for database connectivity
- **drizzle-orm**: Type-safe ORM for database operations and query building
- **drizzle-zod**: Integration between Drizzle ORM and Zod for schema validation

### Frontend Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for styling
- **wouter**: Minimalist routing library for React
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Utility for conditional CSS class names

### Development Dependencies
- **vite**: Fast build tool and development server
- **@replit/vite-plugin-***: Replit-specific development plugins for error handling and environment integration
- **tsx**: TypeScript execution engine for development

### Utility Dependencies
- **zod**: Schema validation and type inference
- **date-fns**: Date manipulation and formatting utilities
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Validation resolvers for React Hook Form

### Database and Session Dependencies
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **drizzle-kit**: Database migration and schema management tools