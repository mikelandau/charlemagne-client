import getInputContext from '../input/get-input-context';
import Game from '../types/game';
import slewModeUpdater from '../updaters/slew-mode-updater';

async function updateGame(game: Game) {
    const { context, gameMode, keys, mouseX, mouseY } = game;
    game.mouseX = 0.0;
    game.mouseY = 0.0;

    const inputContext = getInputContext(keys, mouseX, mouseY);

    slewModeUpdater(game.context, inputContext);

    const debugMessages: string[] = [];
    if (gameMode === 'slew') {
        const { x, y, z, pitch, yaw } = context.slewModeEye;
        debugMessages.push('Slew Mode');
        debugMessages.push('Move with W/A/S/D/Space/Control');
        debugMessages.push(`${x},${y},${z}`);
        debugMessages.push(`pitch: ${pitch}`);
        debugMessages.push(`yaw: ${yaw}`);
        debugMessages.push([...keys].map(x => x === ' ' ? 'SPACE' : x).join(','));
    }

    game.debug = debugMessages.join('\n');
}

export default updateGame;
