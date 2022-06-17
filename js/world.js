import * as THREE from "three";
import {PointerLockControls} from "./pointerlockcontrols.js";
import {Chunk} from "./terrain/chunk/chunk.js";

export class World {
  constructor (x, y, z, worldX, worldZ) {
    this.pos = [0, 0, 0];
    this.initWorld();
    this.initControls();

    this.createChunks(x, y, z, worldX, worldZ);

    this.camera.lookAt(0, 0, 0);
  };

  createChunks (x, y, z, worldX, worldZ) {
    this.chunks = [];

    for (let i = 0; i < worldX; i++) {
      this.chunks.push([]);
      for (let j = 0; j < worldZ; j++) {
        const startX = (-x * worldX) / 2 + j * x + worldX;
        const startZ = (-z * worldZ) / 2 + i * z + worldZ;
        const chunk = new Chunk(startX, startZ, x, y, z, this.scene);
        this.chunks[i].push(chunk);
      };
    };

    for (let i = 0; i < worldX; i++) {
      for (let j = 0; j < worldZ; j++) {
        // neighbours are in the order of north, south, west, east
        const neighbours = [undefined, undefined, undefined, undefined];

        if (j > 0) {
          neighbours[2] = this.chunks[i][j - 1];
        };

        if (j < worldZ - 1) {
          neighbours[3] = this.chunks[i][j + 1];
        };

        if (i > 0) {
          neighbours[0] = this.chunks[i - 1][j];
        };

        if (i < worldX - 1) {
          neighbours[1] = this.chunks[i + 1][j];
        };

        this.chunks[i][j].neighbours = neighbours;
        this.chunks[i][j].createFaces(this.chunks[i][j].x,
                                      this.chunks[i][j].y,
                                      this.chunks[i][j].z);
      };
    };
  };

  initWorld () {
    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.y = 10;
    this.scene.add(this.camera);
    
    this.renderer = new THREE.WebGLRenderer({antialias : true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  };

  initControls () {
    this.speed = 0.4;
    
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
  
  animate () {   
    this.renderer.render(this.scene, this.camera);
  };
};
