import * as THREE from 'three';

function rotateCamera(camera: THREE.PerspectiveCamera, rotateX: number, rotateY: number) {
    camera.rotateX(rotateX);
    camera.rotateY(rotateY);
    camera.rotation.z = 0;
}

export default rotateCamera;