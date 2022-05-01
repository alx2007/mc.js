import {Block} from "../block/block.js";

export class Chunk {
  constructor (startX, startZ, x, y, z, scene) {
    this.scene = scene;
    this.createChunk(startX, startZ, x, y, z);
    this.cullFaces(x, y, z);
  };

  createChunk (startX, startZ, x, y, z) {
    this.blocks = [];
    
    for (let i = 0; i < x; i++) {
      this.blocks.push([]);
      for (let j = 0; j < y; j++) {
        this.blocks[i].push([]);
        for (let k = 0; k < z; k++) {
          const block = new Block(startX + i - x / 2, 0 - j, startZ + k - z / 2, "grassBlock");
          block.load(this.scene);
          this.blocks[i][j].push(block);
        };
      };
    };
  };

  cullFaces (x, y, z) {
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        for (let k = 0; k < z; k++) {
          const current = this.blocks[i][j][k];

          if (i < x - 1) {
            const right = this.blocks[i + 1][j][k];
            if (right) {
              current.delete(this.scene, "right");
              right.delete(this.scene, "left");
            };
          };

          if (j < y - 1) {
            const bottom = this.blocks[i][j + 1][k];
            if (bottom) {
              current.delete(this.scene, "bottom");
              bottom.delete(this.scene, "top");
            };
          };

          if (k < z - 1) {
            const back = this.blocks[i][j][k + 1];
              if (back) {
                current.delete(this.scene, "back");
                back.delete(this.scene, "front");
            };
          };
        };
      };
    };
  };
};
