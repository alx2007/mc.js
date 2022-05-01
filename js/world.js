import * as THREE from "three";
import {PointerLockControls} from "./pointerlockcontrols.js";
import {Chunk} from "./terrain/chunk/chunk.js";

export class World {
  constructor (x, y, z, worldX, worldZ) {
    this.time = performance.now();
    
    this.initWorld();
    this.initControls();

    this.createChunks(x, y, z, worldX, worldZ);
    
    // this.cullFaces(x, y, z);

    this.camera.lookAt(0, 0, 0);
  };

  createChunks (x, y, z, worldX, worldZ) {
    this.chunks = [];

    for (let i = 0; i < worldZ; i++) {
      this.chunks.push([]);
      for (let j = 0; j < worldX; j++) {
        const startX = -x + j * x;
        const startZ = -z + i * z;
        this.chunks.push(new Chunk(startX, startZ, x, y, z, this.scene));
      };
    };
  };

  initWorld () {
    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.y = 10;
    this.scene.add(this.camera);
    
    this.renderer = new THREE.WebGLRenderer({antialias : true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  };

  initControls () {
    this.speed = 0.2;
    
    this.controls = new PointerLockControls(this.camera, this.renderer.domElement);
    
    this.renderer.domElement.addEventListener("mousemove", () => {
      this.controls.lock();
    });

    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 87 :
          this.controls.moveForward(this.speed);
          break;
        case 83 :
          this.controls.moveForward(-this.speed);
          break;
        case 65 :
          this.controls.moveRight(-this.speed);
          break;
        case 68 :
          this.controls.moveRight(this.speed);
          break;
        case 32 :
          this.camera.position.y += this.speed;
          break;
        case 16 :
          this.camera.position.y -= this.speed;
          break;
      };
    });
  };

  round (num, nearest) {
    let output = num / nearest;
    output = Math.round(output);
    output *= nearest;
    return output;
  };

  pseudoNormalise (vec, mag) {
    const vecMag = Math.sqrt(vec.x ** 2 + vec.y ** 2 + vec.z ** 2);
    const scale = vecMag / mag;
    vec.x /= scale;
    vec.y /= scale;
    vec.z /= scale;
  };

  getTargetedBlock () {
    let interval = this.camera.rotaton;

    let targetingBlock = false;

    while (targetingBlock == false) {
      const start = this.camera.rotation;
      const next = start.add(interval);
      interval.add(interval);
    };
  };
  
  animate () {   
    this.renderer.render(this.scene, this.camera);
  };
};
