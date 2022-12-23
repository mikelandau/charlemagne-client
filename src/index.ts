import Charlemagne from './charlemagne';
import CharlemagneRunner from './charlemagne-runner';
import Game from './types/game';
import GameRunner from './types/game-runner';

const game: Game = new Charlemagne();
const runner: GameRunner = new CharlemagneRunner(game);

const debugElementId = document.currentScript?.getAttribute('bind-debug');

const debugElement = document.getElementById(debugElementId ?? '');

document.body.appendChild(game.domElement);

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key.length === 1) {
        // HACK: find a better way of doing this
        game.keys.add(key.toLowerCase())
    } else {
        game.keys.add(key);
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key;
    if (key.length === 1) {
        game.keys.delete(key.toLowerCase());
    }
    game.keys.delete(key);
});

document.addEventListener('mousemove', (e) => {
    const mouseX = e.movementX;
    const mouseY = e.movementY;
    game.mouseX += mouseX;
    game.mouseY += mouseY;
})

game.domElement.addEventListener('click', (e) => {
    e.preventDefault();
    const canvas = e.target as HTMLCanvasElement;
    canvas.requestPointerLock();
})

function animate() {
    requestAnimationFrame(animate);
    runner.runStep();
    if (debugElement) {
        debugElement.innerText = game.debug;
    }
}

animate();
