import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const count = 50;

// count*3*3 coz for 50 traingles we need 3 vertices for every trisngle and every vertices need 3 points x y z
const positionsArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}

//  3 is 1 vertex contains 3 values x,y,z
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttribute);

// const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
// !Deprecated geometry now we use only BufferGeometry
// const vertex1 = new THREE.Vector3(0, 0, 0);
// geometry.vertices.push(vertex1);

// const vertex2 = new THREE.Vector3(0, 3, 0);
// geometry.vertices.push(vertex2);

// const vertex3 = new THREE.Vector3(1, 0, 0);
// geometry.vertices.push(vertex3);

// const face = new THREE.Face3(0, 1, 2);
// geometry.faces.push(face);

const mesh = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 0xff000, wireframe: true })
);

scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let aspectRatio = sizes.width / sizes.height;

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
scene.add(persCamera);
persCamera.lookAt(mesh.position);

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
