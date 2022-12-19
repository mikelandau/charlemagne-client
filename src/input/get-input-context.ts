import InputContext from '../types/input-context';
import KeyBindings from '../types/key-bindings';

const keyBindings: KeyBindings = {
    moveForward: 'w',
    moveBack: 's',
    moveLeft: 'a',
    moveRight: 'd',
    moveUp: ' ',
    moveDown: 'Control'
};

function getInputContext(keys: Set<string>, mouseX: number, mouseY: number): InputContext {
    const context: InputContext = {
        mouseX: mouseX,
        mouseY: mouseY,
        moveForward: keys.has(keyBindings.moveForward),
        moveBack: keys.has(keyBindings.moveBack),
        moveLeft: keys.has(keyBindings.moveLeft),
        moveRight: keys.has(keyBindings.moveRight),
        moveUp: keys.has(keyBindings.moveUp),
        moveDown: keys.has(keyBindings.moveDown),
    };

    return context;
}

export default getInputContext;
