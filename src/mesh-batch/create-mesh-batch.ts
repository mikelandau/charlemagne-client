import MeshBatch from '../types/mesh-batch';

function createMeshBatch(): MeshBatch {
    const batch: MeshBatch = {
        meshes: []
    };
    return batch;
}

export default createMeshBatch;
