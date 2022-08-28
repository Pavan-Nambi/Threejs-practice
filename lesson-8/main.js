// import * as THREE from "three";
// import "./style.css";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// const aspect = window.innerWidth / window.innerHeight;

// const cursor = {
//   x: 0,
//   y: 0,
// };

// window.addEventListener("dblclick", () => {
//   console.log("double click");
// });

// window.addEventListener("resize", () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });
// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / window.innerWidth - 0.5;

//   cursor.y = event.clientY / window.innerHeight - 0.5;

//   // console.log("cursoe x is " + cursor.x);
//   // console.log("cursoe y is " + cursor.y);

//   // console.log("h");
// });

// const scene = new THREE.Scene();
// // const camera = new THREE.OrthographicCamera(
// //   -1 * aspect,
// //   1 * aspect,
// //   1,
// //   -1,
// //   0.1,
// //   100
// // );
// const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100000);
// scene.add(camera);
// camera.position.set(2, 0, 1);
// // camera.position.z = 2;
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x00ffff })
// );
// scene.add(cube);
// // cube.position.set(1, 1, 1);
// const canvas = document.querySelector(".webgl");
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });

// renderer.setSize(window.innerWidth, window.innerHeight);
// const axes = new THREE.AxesHelper(5);
// scene.add(axes);

// const clock = new THREE.Clock();

// // add camera2
// const camera2 = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   1,
//   10
// );
// camera2.position.set(2, 2, 8);
// // add a cube 2
// // const cube2 = new THREE.Mesh(
// //   new THREE.BoxGeometry(1, 1, 1),
// //   new THREE.MeshBasicMaterial({ color: 0xff00ff })
// // );
// // scene.add(cube2);
// // cube2.position.set(2, 2, 8);
// // cube.position.set(1, 1, 1);
// scene.add(camera2);

// // add camera helper
// const helper = new THREE.CameraHelper(camera);
// scene.add(helper);

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// const animate = () => {
//   setTimeout(() => {
//     requestAnimationFrame(animate);

//     // let vector = camera.getWorldDirection(new THREE.Vector3());
//     // let theta = Math.atan2(vector.x, vector.z);
//     // theta *= 180 / Math.PI;
//     // console.log("theta is " + theta);

//     // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 4;
//     // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 4;
//     // camera.position.y = cursor.y * 5;
//     // camera.lookAt(cube.position);

//     // if u r doing damping dont forget to update controls on each frame
//     controls.update();

//     renderer.render(scene, camera);
//   }, 1);
//   // cube.rotation.y = elapsedTime;
// };
// animate();

import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff000 })
);

scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let aspectRatio = sizes.width / sizes.height;

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  persCamera.aspect = sizes.width / sizes.height;

  persCamera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  // console.log("event.clientY = ", event.clientY);
  // console.log("cursor.Y = ", cursor.y);
});

const fov = 75;
// console.log(sizes.width, window.innerWidth);
const near = 0.1;
const far = 1000;
// console.log
// !hhhh

let persCamera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

const camX = 0;
const camY = 0;
const camZ = 3;

persCamera.position.set(camX, camY, camZ);
persCamera.lookAt(mesh.position);
scene.add(persCamera);

const canvas = document.querySelector(".webgl");
// console.log(canvas);

const controls = new OrbitControls(persCamera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const axis = new THREE.AxesHelper();
scene.add(axis);

const clock = new THREE.Clock();
persCamera.lookAt(mesh.position);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();

  renderer.render(scene, persCamera);

  window.requestAnimationFrame(tick);
};
tick();
