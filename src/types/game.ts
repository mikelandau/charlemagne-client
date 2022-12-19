interface Game {
    debug: string;
    domElement: HTMLCanvasElement;
    keys: Set<string>;
    mouseX: number;
    mouseY: number;

    initialize: () => Promise<void>;
    update: () => Promise<void>;
    draw: () => Promise<void>;
};

export default Game;