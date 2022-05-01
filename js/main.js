import {World} from "./world.js";

const world = new World(16, 16, 16, 2, 1);

(function () {
  const script = document.createElement('script');
  script.onload = function () {
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop () {
      stats.begin();
      world.animate();
      stats.update();
      requestAnimationFrame(loop);
    });
  };
  script.src='//mrdoob.github.io/stats.js/build/stats.min.js';
  document.head.appendChild(script);
})();
