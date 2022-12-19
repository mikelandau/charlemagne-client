import * as THREE from 'three';

import Box from './box';
import Eye from './eye';

interface GameContext {
    boxes: Box[];
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    slewModeEye: Eye;
}

export default GameContext;
