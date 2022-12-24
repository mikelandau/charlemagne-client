import Game from '../types/game';
import drawGame from './draw-game';
import updateGame from './update-game';

async function iterateGameLoop(game: Game) {
    await updateGame(game);
    await drawGame(game);
}

export default iterateGameLoop;