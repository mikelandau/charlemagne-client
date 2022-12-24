import { Euler, Vector3 } from 'three';
import GameContext from '../types/game-context';
import InputContext from '../types/input-context';

const MOVESPEED = 1;

const SENSITIVITY = 0.1;

const HALF_PI = Math.PI / 2;
const TWO_PI = 2 * Math.PI;

const slewModeUpdater = (gameContext: GameContext, inputContext: InputContext): GameContext => {
    const { slewModeEye } = gameContext;

    const movementVector = new Vector3();

    if (inputContext.moveUp) {
        movementVector.y += MOVESPEED;
    }
    if (inputContext.moveDown) {
        movementVector.y -= MOVESPEED;
    }
    if (inputContext.moveLeft) {
        movementVector.x -= MOVESPEED;
    }
    if (inputContext.moveRight) {
        movementVector.x += MOVESPEED;
    }
    if (inputContext.moveForward) {
        movementVector.z -= MOVESPEED;
    }
    if (inputContext.moveBack) {
        movementVector.z += MOVESPEED;
    }

    movementVector.applyEuler(new Euler(slewModeEye.pitch, slewModeEye.yaw, 0, "YXZ"));

    slewModeEye.x += movementVector.x;
    slewModeEye.y += movementVector.y;
    slewModeEye.z += movementVector.z;

    const { mouseX, mouseY } = inputContext;

    // X mouse movement translates to Y axis rotation, vise versa.
    const pitchChange = -mouseY * (Math.PI / 180) * SENSITIVITY;
    const yawChange = -mouseX * (Math.PI / 180) * SENSITIVITY;
    
    const newPitch = Math.max(-HALF_PI, Math.min(HALF_PI, slewModeEye.pitch + pitchChange));

    const newYaw = (slewModeEye.yaw + yawChange) % TWO_PI;
    const adjustedYaw = newYaw < 0 ? newYaw + TWO_PI : newYaw;
    
    slewModeEye.pitch = newPitch;    
    slewModeEye.yaw = adjustedYaw;

    gameContext.camera.position.set(slewModeEye.x, slewModeEye.y, slewModeEye.z);
	var rotation = new Euler( slewModeEye.pitch, slewModeEye.yaw, 0, "YXZ" );
    gameContext.camera.rotation.copy(rotation);

    return gameContext;
};

export default slewModeUpdater;