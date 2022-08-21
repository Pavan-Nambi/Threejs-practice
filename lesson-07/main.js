// import three js
import * as THREE from "three";
import { CustomBlending } from "three";

// cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = event.clientY / window.innerHeight - 0.5;
});

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.set(2, 2, -8);
// camera.position.set(-3, -3, -9);
// camera.position.set(3, 3, 9);

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
camera.position.set(7, -7, -9);

camera.lookAt(cube.position);
// camera.lookAt(cube2.position);
camera.lookAt(10, 10, 10);
// camera.lookAt(5, 5, 5);

// const camera2 = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   2,
//   6
// );
// camera2.position.set(5, 5, 5);
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(5, 5, 5);
scene.add(cube2);
// camera.lookAt(camera2.position);
// camera2.lookAt(camera.position);
// camera2.lookAt(cube.position);
camera.lookAt(cube.position);

scene.add(camera);
// scene.add(camera2);
// const helper = new THREE.CameraHelper(camera2);
// scene.add(helper);
// const helper2 = new THREE.CameraHelper(camera);
// scene.add(helper2);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
const axes = new THREE.AxesHelper(5);
scene.add(axes);
// cube.position.set(1, 1, 1);
const clock = new THREE.Clock();
const animate = () => {
  requestAnimationFrame(animate);
  // elapsed time
  const elapsedTime = clock.getElapsedTime();
  // cube.rotation.y = elapsedTime;

  camera.position.x = cursor.x * 3;
  camera.position.y = cursor.y * 3;

  renderer.render(scene, camera);
};
animate();
