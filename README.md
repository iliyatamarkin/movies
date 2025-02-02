# Movie Booking System

A React-based movie seat booking system with real-time seat updates.

## Features

- Real-time seat booking status
- Interactive seat selection
- Redux state management
- Responsive design
- Mock API with MSW

## Prerequisites

- Node.js (>= 21.4.0)
- npm or yarn

## Installation

1. Check your Node.js version:

```bash
node --version
```

Make sure it's 21.4.0 or higher. If not, update Node.js from [nodejs.org](https://nodejs.org/)

2. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-booking.git
cd movie-booking
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Start the development server:

```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
movie-booking/
├── src/
│   ├── components/      # React components
│   ├── store/          # Redux store and slices
│   ├── services/       # API services
│   ├── mocks/          # MSW mock handlers
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
```

## Technologies Used

- React 18
- TypeScript 5
- Redux Toolkit
- Material-UI
- MSW (Mock Service Worker)
- React Router

## Development

To run the mock API:

```bash
npm run start:mock
# or
yarn start:mock
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
