# CineFind 🎬

CineFind is a React movie discovery application that uses a live API to display real movie and TV show data.

Users can explore shows, search for movies, view detailed information, and save their favorite shows.

## Features

- 🎬 Browse movies and TV shows
- 🔎 Search for shows
- ⭐ Add and remove favorites
- 💾 Favorites are saved using localStorage
- 📄 View detailed information about a show
- 🧭 Navigation between multiple pages
- 📱 Responsive design for desktop and mobile
- ⏳ Loading state while data is being fetched
- ❌ Error state when API requests fail
- 📭 Empty state when no results are found
- 🌙 Dark movie-themed UI

## Pages

### Home

The home page introduces CineFind and displays featured/recommended shows.

### Explore

The Explore page allows users to search and browse movies and shows from the live API.

### Show Details

The Show Details page displays detailed information about a selected show.

### Favorites

The Favorites page displays shows that the user has saved as favorites.

## Technologies Used

- React
- JavaScript
- React Router
- CSS
- REST API
- LocalStorage
- Vite

## Project Structure

```text
src/
│
├── api/
│   └── API related functions
│
├── components/
│   ├── Navbar/
│   ├── Footer/
│   └── Other reusable components
│
├── hooks/
│   └── useFavorites.js
│
├── pages/
│   ├── Home/
│   ├── Explore/
│   ├── ShowDetails/
│   └── Favorites/
│
├── utils/
│   └── storage.js
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
