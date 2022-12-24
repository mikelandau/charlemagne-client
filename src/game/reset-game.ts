import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import Game from '../types/game';

async function resetGame(game: Game) {
    const { camera, boxes, scene } = game.context;

    scene.clear();

    camera.position.set(0, 0, 100);

    boxes.forEach(box => {
        const geometry = new THREE.BoxGeometry(box.width, box.height, box.depth);
        const material = new THREE.MeshBasicMaterial({ color: box.color });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    });

    const loader = new FBXLoader();
    const obj = await loader.loadAsync('fbx/xbot.fbx');

    scene.add(obj);

    const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xff0000, 1, 300 );
    pointLight.position.set( 100, 50, 100 );
    scene.add( pointLight );
}

export default resetGame;
