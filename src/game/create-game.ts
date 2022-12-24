import * as THREE from 'three';

import createMeshBatch from '../mesh-batch/create-mesh-batch';
import Eye from '../types/eye';
import Game from '../types/game';
import resetGame from './reset-game';

async function createGame(): Promise<Game> {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    scene.background = new THREE.Color(0x888888);
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const boxes = [{
        x: 0,
        y: -1,
        z: 0,
        width: 100,
        height: 10,
        depth: 100,
        color: 0x8888aa,
    }];

    const slewModeEye: Eye = {
        x: 0,
        y: 0,
        z: 0,
        pitch: 0,
        yaw: 0
    };

    const context = {
        boxes,
        camera,
        renderer,
        scene,
        slewModeEye
    };

    const meshBatch = createMeshBatch();
    

    const newGame: Game = {
        context,
        debug: '',
        domElement: renderer.domElement,
        gameMode: 'slew',
        keys: new Set<string>(),
        meshBatch,
        mouseX: 0,
        mouseY: 0
    }

    await resetGame(newGame);

    return newGame;
}

export default createGame;
