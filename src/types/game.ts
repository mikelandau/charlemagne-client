interface Game {
    domElement: HTMLCanvasElement;
    keys: Set<string>;

    initialize: () => Promise<void>;
    update: () => Promise<void>;
    draw: () => Promise<void>;
};

export default Game;