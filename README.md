# Trafalgar Clone Project

This project is a clone of the Trafalgar "Best of Italy" tour page, focusing on the "Your Itinerary" tab. It consists of two main parts:

- `frontend`: A Next.js application.
- `studio`: A Sanity CMS setup for managing content.

### Top Tour Summary

![Top Tour Summary](frontend/public/1.%20Top%20Tour%20Summary.png)

### Day by Day Itinerary

![Day by Day Itinerary](frontend/public/2.%20Day%20by%20Day%20Itinerary.png)

### Sightseeing Highlights

![Sightseeing Highlights](frontend/public/3.%20Sightseeing%20Highlights.png)

### Travel Highlights

![Travel Highlights](frontend/public/4.%20Travel%20Highlights.png)

### Frequently Asked Questions

![Frequently Asked Questions](frontend/public/5.%20Frequently%20Asked%20Questions.png)

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
