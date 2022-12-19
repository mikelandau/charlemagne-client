import GameContext from './game-context';
import InputContext from './input-context';

type Updater = (gc: GameContext, ic: InputContext) => GameContext;

export default Updater;
