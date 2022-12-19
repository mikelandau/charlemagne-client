import * as THREE from 'three';

import OrthogonalDirection from '../types/orthogonal-direction';

function getVectorFromDirection(direction: OrthogonalDirection, scalar?: number): THREE.Vector3 {
    const actualScalar = scalar ?? 1;
    
    switch (direction) {
        case 'backward': 
            return new THREE.Vector3(0, 0, actualScalar);
        case 'forward':
            return new THREE.Vector3(0, 0, -actualScalar);
        case 'left':
            return new THREE.Vector3(-actualScalar, 0, 0);
        case 'right':
            return new THREE.Vector3(actualScalar, 0, 0);
        case 'up':
            return new THREE.Vector3(0, actualScalar, 0);
        case 'down':
            return new THREE.Vector3(0, -actualScalar, 0);
    }
}

export default getVectorFromDirection;
