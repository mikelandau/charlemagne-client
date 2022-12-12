import Charlemagne from './charlemagne';
import CharlemagneRunner from './charlemagne-runner';
import Game from './types/game';
import GameRunner from './types/game-runner';

const game: Game = new Charlemagne();
const runner: GameRunner = new CharlemagneRunner(game);

document.body.appendChild(game.domElement);

document.addEventListener('keydown', (e) => {
    const key = e.key;
    game.keys.add(key);
});

document.addEventListener('keyup', (e) => {
    const key = e.key;
    game.keys.delete(key);
});

function animate() {
    requestAnimationFrame(animate);
    runner.runStep();
}

animate();
