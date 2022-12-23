import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { v4 as uuidv4 } from 'uuid';

import MeshResource from './types/mesh-resource';

class MeshBatch {
    private meshes: MeshResource[] = [];

    private async loadFbxData(path: string): Promise<THREE.Group> {
        const loader = new FBXLoader();
        const data = await loader.loadAsync(path);
        return data;
    }

    private async loadData(path: string): Promise<THREE.Group> {
        const fileExtension = path.split('.').pop()?.trim().toLowerCase();
        
        if (fileExtension === 'fbx') {
            const fbxData = await this.loadFbxData(path);
            return fbxData;
        }
        else {
            throw new Error(`unknown file type: ${path}`);
        }
    }

    public getById(id: string): MeshResource {
        const mesh = this.meshes.find(x => x.resourceId === id);
        if (!mesh) {
            throw new Error(`no mesh with id ${id}`);
        }
        return mesh;
    }

    public async loadFileToBatch(path: string): Promise<MeshResource> {
        const existingMesh = this.meshes.find(x => x.path === path);
        if (existingMesh) {
            return existingMesh;
        }
        
        const data = await this.loadData(path);
        
        const resourceId = uuidv4();
        const newResource: MeshResource = { data, path, resourceId };

        this.meshes.push(newResource);

        return newResource;
    }
}

export default MeshBatch;