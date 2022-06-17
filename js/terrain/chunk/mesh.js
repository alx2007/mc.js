import * as THREE from "three";
import {materials} from "../block/materials.js";

export class Mesh {
  constructor (blocktype, scene, chunkDims) {
    this.dummy = new THREE.Object3D();
    this.geometry = new THREE.PlaneBufferGeometry(1, 1);
    this.count = 0;
    
    switch (blocktype) {
      case "grassBlockTop":
        this.createTexture(materials.grassBlock.top);
        break;
        
      case "grassBlockBottom":
        this.createTexture(materials.grassBlock.bottom);
        break;
        
      case "grassBlockSide":
        this.createTexture(materials.grassBlock.side);
        break;
        
      case "obsidian":
        this.createTexture(materials.obsidian);
        break;
        
      case "gold":
        this.createTexture(materials.gold);
        break;
        
      case "diamond":
        this.createTexture(materials.diamond);
        break;
    };
    
    this.material = new THREE.MeshBasicMaterial({map : this.texture});
    this.mesh = new THREE.InstancedMesh(this.geometry, this.material, chunkDims[0] * chunkDims[1] * chunkDims[2] / 2);
    this.mesh.count = 0;
    scene.add(this.mesh);
  };

  createTexture (address) {
    this.texture = new THREE.TextureLoader().load(address);
  };

  createFace (block, facetype) {
    this.mesh.count += 1;
    
    let xRot = 0, yRot = 0, zRot = 0;
    let x = block.x, y = block.y, z = block.z;
    const quart = Math.PI / 2;

    switch (facetype) {
      case "front":
        z -= 0.5;
        yRot = quart * 2;
        break;
        
      case "back":
        z += 0.5;
        break;
        
      case "top":
        y += 0.5;
        xRot = -quart;
        break;

      case "bottom":
        y -= 0.5;
        xRot = quart;
        break;

      case "left":
        x -= 0.5;
        yRot = -quart;
        break;

      case "right":
        x += 0.5;
        yRot = quart;
        break;
    };

    this.dummy.position.set(x, y, z);
    this.dummy.rotation.set(xRot, yRot, zRot);
    this.dummy.updateMatrix();
    this.mesh.setMatrixAt(this.count, this.dummy.matrix);
    this.count += 1;
  };
};
