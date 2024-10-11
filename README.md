# Trafalgar Clone Project

This project is a clone of the Trafalgar "Best of Italy" tour page, focusing on the "Your Itinerary" tab. It consists of two main parts:

- `frontend`: A Next.js application.
- `studio`: A Sanity CMS setup for managing content.

## Getting Started

### Frontend

The frontend is built with Next.js and Tailwind CSS.

1. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

### Studio

The studio is a Sanity CMS setup for managing content.

1. **Install the Sanity CLI**:
   ```bash
   npm install -g @sanity/cli
   ```
2. **Login to Sanity**:
   ```bash
   sanity login
   ```
3. **Install dependencies**:
   ```bash
   cd studio
   npm install
   ```
4. **Start the studio**:
   ```bash
   sanity start
   ```
5. **Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.**
