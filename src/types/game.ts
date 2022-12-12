interface Game {
    readInput: () => Promise<void>;
    update: () => Promise<void>;
    draw: () => Promise<void>;
};

export default Game;