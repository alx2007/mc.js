import {Block} from "../block/block.js";
import {Mesh} from "./mesh.js";
import {materials} from "../block/materials.js";

export class Chunk {
  constructor (startX, startZ, x, y, z, scene, neighbours) {
    [this.startX,
     this.startZ,
     this.x,
     this.y,
     this.z] = [startX,
                startZ,
                x,
                y,
                z];
    this.scene = scene;
    this.neighbours = neighbours;
    this.createChunk(startX, startZ, x, y, z);
    this.dimensions = [x, y, z];
  };

  createChunk (startX, startZ, x, y, z) {
    this.blocks = [];
    
    for (let i = 0; i < x; i++) {
      this.blocks.push([]);
      for (let j = 0; j < y; j++) {
        this.blocks[i].push([]);
        for (let k = 0; k < z; k++) {
          const block = new Block(startX + i - x / 2, 0 - j, startZ + k - z / 2, "grassBlock");
          this.blocks[i][j].push(block);
        };
      };
    };
  };

  testForBlock (neighbourAddress, x, y, z) {
    
    switch (neighbourAddress) {
      // North
      case 0:
        if (!this.neighbours[0]) {
          return true;
        } else if (this.neighbours[0].blocks[x][y][this.z - 1].blocktype == "air") {
          return true;
        };
                
        break;

      // South
      case 1:
        if (!this.neighbours[1]) {
          return true;
        } else if (this.neighbours[1].blocks[x][y][0].blocktype == "air") {
          return true;
        };
        
        break;

      // West
      case 2:
        if (!this.neighbours[2]) {
          return true;
        } else if (this.neighbours[2].blocks[this.x - 1][y][z].blocktype == "air") {
          return true;
        };
        
        break;

      // East
      case 3:
        if (!this.neighbours[3]) {
          return true;
        } else if (this.neighbours[3].blocks[0][y][z].blocktype == "air") {
          return true;
        };
        
        break;
    };

    return false;
  };

  createFaces (x, y, z) {
    this.meshes = {
      grassBlock : {
        top : new Mesh("grassBlockTop", this.scene, this.dimensions),
        bottom : new Mesh("grassBlockBottom", this.scene, this.dimensions),
        side : new Mesh("grassBlockSide", this.scene, this.dimensions)
      },

      obsidian : new Mesh("obsidian", this.scene, this.dimensions),

      gold : new Mesh("gold", this.scene, this.dimensions),

      diamond : new Mesh("diamond", this.scene, this.dimensions)
    };
    
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        for (let k = 0; k < z; k++) {
          const faces = [];

          switch (i) {
            case 0:
              if (this.testForBlock(2, i, j, k)) {
                faces.push("left");
              };
              
              break;
              
            case x - 1:
              if (this.testForBlock(3, i, j, k)) {
                faces.push("right");
              };
              
              break;
          };

          switch (j) {
            case 0:
              faces.push("top");
              
              break;
              
            case y - 1:
              faces.push("bottom");
              
              break;
          };

          switch (k) {
            case 0:
              if (this.testForBlock(0, i, j, k)) {
                faces.push("front");
              };
              break;
            case z - 1:
              if (this.testForBlock(1, i, j, k)) {
                faces.push("back");
              };
              break;
          };
          
          if (i > 0) {
            const left = this.blocks[i - 1][j][k];
            if (left.blocktype == "air") {
              faces.push("left");
            };
          };

          if (i < x - 1) {
            const right = this.blocks[i + 1][j][k];
            if (right.blocktype == "air") {
              faces.push("right");
            };
          };

          if (j > 0) {
            const top = this.blocks[i][j - 1][k];
            if (top.blocktype == "air") {
              faces.push("top");
            };
          };

          if (j < y - 1) {
            const bottom = this.blocks[i][j + 1][k];
            if (bottom.blocktype == "air") {
              faces.push("bottom");
            };
          };

          if (k > 0) {
            const front = this.blocks[i][j][k - 1];
            if (front.blocktype == "air") {
              faces.push("front");
            };
          };

          if (k < z - 1) {
            const back = this.blocks[i][j][k + 1];
              if (back.blocktype == "air") {
                faces.push("back");
            };
          };

          const current = this.blocks[i][j][k];
          const blocktype = current.blocktype;
          
          for (const face of faces) {
            let mesh;

            switch (blocktype) {
              case "grassBlock":
                switch (face) {
                  case "top":
                    mesh = this.meshes.grassBlock.top;
                    break;
                    
                  case "bottom":
                    mesh = this.meshes.grassBlock.bottom;
                    break;
                    
                  case "left":
                    mesh = this.meshes.grassBlock.side;
                    break;
                    
                  case "right":
                    mesh = this.meshes.grassBlock.side;
                    break;
                    
                  case "front":
                    mesh = this.meshes.grassBlock.side;
                    break;
                    
                  case "back":
                    mesh = this.meshes.grassBlock.side;
                    break;
                };
                break;

              case "obsidian":
                mesh = this.meshes.obsidian;
                break;

              case "gold":
                mesh = this.meshes.gold;
                break;

              case "diamond":
                mesh = this.meshes.diamond;
                break;
            };

            mesh.createFace(current, face);
          };
        };
      };
    };
  };
};
