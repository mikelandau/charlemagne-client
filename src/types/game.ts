import GameContext from './game-context';
import GameMode from './game-mode';
import MeshBatch from './mesh-batch';

interface Game {
    context: GameContext;
    debug: string;
    domElement: HTMLCanvasElement;
    gameMode: GameMode;
    keys: Set<string>;
    meshBatch: MeshBatch;
    mouseX: number;
    mouseY: number;
};

export default Game;