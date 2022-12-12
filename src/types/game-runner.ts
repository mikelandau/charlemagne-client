import Game from './game';

interface GameRunner {
    _game: Game;
    runStep: () => Promise<void>;
};

export default GameRunner;