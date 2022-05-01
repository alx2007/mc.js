import {Face} from "./face.js";

export class Block {
  constructor (x, y, z, blocktype) {
    switch (blocktype) {
      case "grassBlock":
        this.faces = {
          front : new Face(x, y, z, "grassBlock", "front").mesh,
          back : new Face(x, y, z, "grassBlock", "back").mesh,
          top : new Face(x, y, z, "grassBlock", "top").mesh,
          bottom : new Face(x, y, z, "grassBlock", "bottom").mesh,
          left: new Face(x, y, z, "grassBlock", "left").mesh,
          right : new Face(x, y, z, "grassBlock", "right").mesh
        };
        
      break;
    };
  };
  
  delete (scene, face) {
    switch (face) {
      case "front":
        scene.remove(this.faces.front);
        this.faces.front = null;
        break;

      case "back":
        scene.remove(this.faces.back);
        this.faces.back = null;
        break;

      case "top":
        scene.remove(this.faces.top);
        this.faces.top = null;
        break;

      case "bottom":
        scene.remove(this.faces.bottom);
        this.faces.bottom = null;
        break;

      case "left":
        scene.remove(this.faces.left);
        this.faces.left = null;
        break;

      case "right":
        scene.remove(this.faces.right);
        this.faces.right = null;
        break;
    };
  };

  load (scene) {
    // for (let face of this.faces) {
    //   scene.add(face);
    // };
    scene.add(this.faces.front);
    scene.add(this.faces.back);
    scene.add(this.faces.top);
    scene.add(this.faces.bottom);
    scene.add(this.faces.left);
    scene.add(this.faces.right);
  };
};
