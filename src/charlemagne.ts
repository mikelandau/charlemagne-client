import Game from './types/game';
import * as THREE from 'three';
import Box from './types/box';
import KeyBindings from './types/key-bindings';
import GameMode from './types/game-mode';

class Charlemagne implements Game {
    public domElement: HTMLCanvasElement;

    public keys: Set<string> = new Set<string>();

    public gameModeDebug = '';
    
    private _scene = new THREE.Scene();
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;

    private _gameMode: GameMode = 'slew';

    private _keyBindings: KeyBindings = {
        moveForward: 'w',
        moveBack: 's',
        moveLeft: 'a',
        moveRight: 'd',
        moveUp: ' ',
        moveDown: 'Control'
    };

    private _boxes: Box[];

    constructor() {
        this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight);

        this.domElement = this._renderer.domElement;

        this._boxes = [{
            x: 0,
            y: -1,
            z: 0,
            width: 100,
            height: 10,
            depth: 100,
            color: 0x8888aa,
        }];
    }

    async initialize(): Promise<void> {

        this._camera.position.set(0, 0, 100);
        this._camera.lookAt(0, 0, 0);

        this._boxes.forEach(box => {
            const geometry = new THREE.BoxGeometry(box.width, box.height, box.depth);
            const material = new THREE.MeshBasicMaterial({ color: box.color });
            const mesh = new THREE.Mesh(geometry, material);
            this._scene.add(mesh);
        });

        const geometry = new THREE.BoxGeometry(1,1,1);
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        
        const cube = new THREE.Mesh(geometry, material);

        this._scene.add(cube);
    }

    async update(): Promise<void> {
        const keys = this.keys;
        const keyBindings = this._keyBindings;
        if (keys.has(keyBindings.moveForward)) {
            this._camera.position.add(new THREE.Vector3(0, 0, -1));
        }
        if (keys.has(keyBindings.moveLeft)) {
            this._camera.position.add(new THREE.Vector3(-1, 0, 0));
        }
        if (keys.has(keyBindings.moveBack)) {
            this._camera.position.add(new THREE.Vector3(0, 0, 1));
        }
        if (keys.has(keyBindings.moveRight)) {
            this._camera.position.add(new THREE.Vector3(1, 0, 0));
        }
        if (keys.has(keyBindings.moveUp)) {
            this._camera.position.add(new THREE.Vector3(0, 1, 0));
        }
        if (keys.has(keyBindings.moveDown)) {
            this._camera.position.add(new THREE.Vector3(0, -1, 0));
        }

        if (this._gameMode === 'slew') {
            this.gameModeDebug = 'Slew Mode';
        }
    }

    async draw(): Promise<void> {
       this._renderer.render(this._scene, this._camera);
    }
}

export default Charlemagne;