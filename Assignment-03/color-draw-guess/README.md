# Color Draw Guess

## Overview
Color Draw Guess is an interactive drawing and guessing game where players take turns drawing a word while others guess what it is. The game can be played in single-player mode or with friends in multiplayer mode using Socket.io.

## Project Structure
```
color-draw-guess
├── public
│   ├── index.html        # HTML structure of the game
│   ├── style.css        # Styles for the game
│   └── script.js        # Main JavaScript logic for the game
├── server
│   └── server.js        # Node.js server setup with Socket.io
├── package.json         # npm configuration file
└── README.md            # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd color-draw-guess
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```
   npm install
   ```

3. **Start the server:**
   ```
   node server/server.js
   ```

4. **Open the game:**
   Navigate to `http://localhost:3000` in your web browser to start playing.

## Gameplay Rules

- Players take turns drawing a word while others try to guess it.
- The drawer has a limited time to complete their drawing.
- Players can submit their guesses through an input field.
- Points are awarded for correct guesses, and the game continues until a set number of rounds or a time limit is reached.

## Multiplayer Functionality
- The game supports multiplayer mode using Socket.io, allowing players to connect and play together in real-time.
- Ensure that your server is running to enable multiplayer features.

## Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements for the game!