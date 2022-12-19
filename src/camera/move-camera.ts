import * as THREE from 'three';

import OrthogonalDirection from '../types/orthogonal-direction';
import getVectorFromDirection from '../vector/get-vector-from-direction';

function moveCamera(camera: THREE.PerspectiveCamera, direction: OrthogonalDirection, scale?: number): THREE.Vector3 {
    const vector = getVectorFromDirection(direction, scale);
    if (['down', 'up'].indexOf(direction) < 0) {
        vector.applyEuler(camera.rotation);
    }
    const updatedVector = camera.position.add(vector);
    return updatedVector;
}

export default moveCamera;