# Recipe Recommendation & Meal Planning App

A mobile recipe discovery and meal planning application developed as an academic group project using React Native, Expo, Node.js, Express, PostgreSQL, and TheMealDB API.

The application allows users to discover recipes, search meals, view recipe details, save favorites, and organize meal planning through a calendar interface.

## Features

- Browse and discover recipes
- Search recipes by keyword
- View detailed recipe information
- Filter recipes by category
- Save favorite recipes
- Calendar-based meal planning
- Integration with TheMealDB API
- PostgreSQL database integration
- Basic meal classification using a machine learning model

## Technologies Used

### Mobile
- React Native
- Expo
- Expo Router
- JavaScript
- Axios

### Backend
- Node.js
- Express.js
- Drizzle ORM
- Python Shell

### Database
- PostgreSQL
- Neon Database

### Machine Learning
- Python
- Pandas
- Scikit-learn
- Joblib

### External API
- TheMealDB API

## Project Structure

    project/
    ├── backend/
    │   ├── ml/
    │   │   ├── meal_classifier.pkl
    │   │   └── predict.py
    │   └── src/
    │       ├── config/
    │       ├── db/
    │       ├── routes/
    │       └── server.js
    │
    ├── mobile/
    │   ├── app/
    │   ├── assets/
    │   ├── components/
    │   ├── constants/
    │   └── services/
    │
    ├── .gitignore
    └── README.md

## Backend API

The backend provides API endpoints for application health checks and favorite recipe management.

Main endpoints include:

    GET    /api/health
    POST   /api/favorites
    GET    /api/favorites/:userId
    DELETE /api/favorites/:userId/:recipeId
    POST   /predict

## Database

The project uses PostgreSQL hosted on Neon.

The favorites table stores information including:

- User ID
- Recipe ID
- Recipe title
- Image
- Category
- Ingredient count
- Instruction length
- Creation timestamp

## My Contribution

### Testing & Debugging

My contribution focused on testing and debugging the application.

- Performed manual testing on core application flows including recipe browsing, search, recipe details, calendar, and favorites.
- Tested backend API endpoints and database connectivity.
- Verified data insertion and retrieval using the Favorites API.
- Helped identify integration and local environment issues between the mobile application, backend, database, and machine learning component.
- Performed debugging and validation before preparing the project for documentation and portfolio presentation.

## Testing

The following core functionality was manually tested:

    Recipes / Home       ✓
    Search               ✓
    Recipe Details       ✓
    Calendar             ✓
    Backend Health API   ✓
    Neon Database        ✓
    Favorites API        ✓

## Known Limitation

The Favorites backend API and PostgreSQL database integration were successfully tested independently.

However, the Favorites feature from the mobile interface may experience a local environment compatibility issue related to the Python machine learning dependency and NumPy environment.

The remaining application features can still be explored normally.

## Environment Setup

### Backend

Navigate to the backend folder:

    cd backend

Install dependencies:

    npm install

Create a `.env` file:

    DATABASE_URL=your_neon_database_connection_string

Start the backend:

    npm start

The backend runs on:

    http://localhost:5001

### Mobile

Navigate to the mobile folder:

    cd mobile

Install dependencies:

    npm install

Start the Expo application:

    npm start

For web testing:

    npm run web

## Security

Environment variables such as database credentials are stored locally in `.env` and are not included in the repository.

## Project Type

Academic Group Project

## Team

This project was developed collaboratively by a team of five members.