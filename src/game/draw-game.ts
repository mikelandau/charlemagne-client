import Game from '../types/game';

async function drawGame(game: Game) {
    const { camera, renderer, scene } = game.context;
    renderer.render(scene, camera);
}

export default drawGame;