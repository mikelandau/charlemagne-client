import * as THREE from 'three';

import Game from './types/game';
import KeyBindings from './types/key-bindings';
import GameMode from './types/game-mode';
import GameContext from './types/game-context';
import getInputContext from './input/get-input-context';
import slewModeUpdater from './updaters/slew-mode-updater';
import Eye from './types/eye';

class Charlemagne implements Game {
    public domElement: HTMLCanvasElement;

    public keys: Set<string> = new Set<string>();

    public mouseX: number = 0.0;
    public mouseY: number = 0.0;

    public debug = '';
    
    private _context: GameContext;

    private _gameMode: GameMode = 'slew';

    constructor() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        
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

        this._context = {
            boxes,
            camera,
            renderer,
            scene,
            slewModeEye
        };
        this.domElement = renderer.domElement;
    }

    async initialize(): Promise<void> {

        this._context.camera.position.set(0, 0, 100);
        this._context.camera.lookAt(0, 0, 0);

        this._context.boxes.forEach(box => {
            const geometry = new THREE.BoxGeometry(box.width, box.height, box.depth);
            const material = new THREE.MeshBasicMaterial({ color: box.color });
            const mesh = new THREE.Mesh(geometry, material);
            this._context.scene.add(mesh);
        });

        const geometry = new THREE.BoxGeometry(1,1,1);
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        
        const cube = new THREE.Mesh(geometry, material);

        this._context.scene.add(cube);
    }

    async update(): Promise<void> {
        const { mouseX, mouseY } = this;
        this.mouseX = 0.0;
        this.mouseY = 0.0;

        const inputContext = getInputContext(this.keys, mouseX, mouseY);

        slewModeUpdater(this._context, inputContext);

        const debugMessages: string[] = [];
        if (this._gameMode === 'slew') {
            const { x, y, z, pitch, yaw } = this._context.slewModeEye;
            debugMessages.push('Slew Mode');
            debugMessages.push(`${x},${y},${z}`);
            debugMessages.push(`pitch: ${pitch}`);
            debugMessages.push(`yaw: ${yaw}`);
        }

        this.debug = debugMessages.join('\n');
    }

    async draw(): Promise<void> {
        const { camera, renderer, scene } = this._context;
        renderer.render(scene, camera);
    }
}

export default Charlemagne;
