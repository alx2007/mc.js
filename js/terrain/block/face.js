import * as THREE from "three";
import {materials} from "./materials.js";

export class Face {
  constructor (x, y, z, blockType, faceType) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.angle = math.pi / 2;
    
    this.geometry = new THREE.PlaneGeometry(1, 1);
    
    switch (blockType) {
      case "grassBlock":
        switch (faceType) {
          case "front":
            this.texture = this.createTexture(materials.grassBlock.front);
            this.createMesh();
            this.displace("z", -0.5);
            break;

          case "back":
            this.texture = this.createTexture(materials.grassBlock.back);
            this.createMesh();
            this.displace("z", 0.5);
            break;

          case "top":
            this.texture = this.createTexture(materials.grassBlock.top);
            this.createMesh();
            this.displace("y", 0.5);
            this.rotate("x", this.angle);
            break;

          case "bottom":
            this.texture = this.createTexture(materials.grassBlock.bottom);
            this.createMesh();
            this.displace("y", -0.5);
            this.rotate("x", this.angle);
            break;

          case "left":
            this.texture = this.createTexture(materials.grassBlock.left);
            this.createMesh();
            this.displace("x", -0.5);
            this.rotate("y", this.angle);
            break;

          case "right":
            this.texture = this.createTexture(materials.grassBlock.right);
            this.createMesh();
            this.displace("x", 0.5);
            this.rotate("y", this.angle);
            break;
        };
    };
  };

  createMesh () {
    this.material = new THREE.MeshBasicMaterial({map : this.texture, side : THREE.DoubleSide});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;
  };

  displace (axis, displacement) {
    switch (axis) {
      case "x":
        this.mesh.position.x += displacement;
        break;
        
      case "y":
        this.mesh.position.y += displacement;
        break;
        
      case "z":
        this.mesh.position.z += displacement;
        break;
    };
  };

  rotate (axis, angle) {
    switch (axis) {
      case "x":
        this.mesh.rotation.x += angle;
        break;
        
      case "y":
        this.mesh.rotation.y += angle;
        break;
        
      case "z":
        this.mesh.rotation.z += angle;
        break;
    };
  };

  createTexture (address) {
    return new THREE.TextureLoader().load(address);
  };
};
