# CaliNetX

A comprehensive mobile application for iOS and Android specifically tailored for calisthenics athletes. The app combines social networking functionality with training tracking and location-based features.

## Features

- **Feed**: Instagram-like feed for sharing workouts and interacting with other users
- **Community**: Overview of calisthenics clubs, groups, and events
- **Training/Workout**: Comprehensive workout planning, tracking, and progress monitoring
- **Map**: Interactive map showing calisthenics parks and facilities
- **Profile**: Personal profile page with level system and activity overview

## Technology Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **API**: RESTful with Supabase client

## Setting Up the Development Environment

### Prerequisites

- Node.js >= 16
- npm or yarn
- Expo CLI
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/username/calisthenics-community-app.git
   cd calisthenics-community-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the development environment:
   ```
   npm start
   ```

### Tests

Run tests:
```
npm test
```

Run linting:
```
npm run lint
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/          # Main app screens
├── navigation/       # Navigation between screens
├── services/         # API calls and external services
├── hooks/            # Custom React Hooks
├── utils/            # Helper functions
└── theme/            # Design system and styling
```

## Contributing

We welcome community contributions! Please note that all contributions fall under this project's license terms, and the project owners retain the sole right to decide which contributions to include.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add feature: XYZ'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## CI/CD

This project uses GitHub Actions for continuous integration and deployment. Automated tests run on every push and pull request, and successful tests trigger app publication to Expo.

## License

This project uses a proprietary license. The source code is publicly viewable, but all rights are reserved.

### Terms of Use

- You may view, fork, and use the code for non-commercial, personal purposes
- You may submit contributions to the project in the form of pull requests
- You need explicit written permission from the project owners for any commercial use, distribution, or publication of derivative works
- The project owners retain all rights to the idea, concept, and CaliNetX brand

© 2025 CaliNetX Team. All rights reserved.