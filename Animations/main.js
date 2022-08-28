// import three js
import * as THREE from "three";

import { gsap } from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

scene.add(camera);
camera.position.set(10, 10, 10);
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
// look at cube
renderer.setSize(window.innerWidth, window.innerHeight);

gsap.to(cube.position, { duration: 2, delay: 4, x: 0, y: 0, z: 0 });
// axes1
const axes = new THREE.AxesHelper();
scene.add(axes);

const clock = new THREE.Clock();
// request animationframe
const tick = () => {
  cube.position.x += 0.007;
  camera.lookAt(cube.position);

  // console.log(camera.position, cube.position);

  // const radToDeg = (rad) => (rad * 180) / Math.PI;

  // const vector = camera.getWorldDirection(new THREE.Vector3());
  // const angle = Math.atan2(vector.x, vector.z);
  // console.log(angle);
  // animation frame
  requestAnimationFrame(tick);

  renderer.render(scene, camera);
};
tick();
