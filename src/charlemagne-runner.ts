import Game from './types/game';
import GameRunner from './types/game-runner';

class CharlemagneRunner implements GameRunner {
    _game: Game;

    constructor(game: Game) {
        this._game = game;
        this._game.initialize();
    }

    async runStep() {
        //await this._game.readInput();
        await this._game.update();
        await this._game.draw();
    }
};

export default CharlemagneRunner;
