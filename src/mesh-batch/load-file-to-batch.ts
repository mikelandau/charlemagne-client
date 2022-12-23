import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { v4 as uuidv4 } from 'uuid';

import MeshBatch from '../types/mesh-batch';
import MeshResource from '../types/mesh-resource';

async function loadFbxData(path: string): Promise<THREE.Group> {
    const loader = new FBXLoader();
    const data = await loader.loadAsync(path);
    return data;
}

async function loadData(path: string): Promise<THREE.Group> {
    const fileExtension = path.split('.').pop()?.trim().toLowerCase();
    
    if (fileExtension === 'fbx') {
        const fbxData = await loadFbxData(path);
        return fbxData;
    }
    else {
        throw new Error(`unknown file type: ${path}`);
    }
}

async function loadFileToBatch(meshBatch: MeshBatch, path: string) {
    const existingMesh = meshBatch.meshes.find(x => x.path === path);
    if (existingMesh) {
        return existingMesh;
    }
    
    const data = await loadData(path);
    
    const resourceId = uuidv4();
    const newResource: MeshResource = { data, path, resourceId };

    meshBatch.meshes.push(newResource);

    return newResource;
}

export default loadFileToBatch;
