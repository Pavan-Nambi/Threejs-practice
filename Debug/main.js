import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";

console.log(dat);
const gui = new dat.GUI({ closed: true, width: 400 });

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const spin = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
};
const parameters = {
  color: 0xfff000,
  spin: () => {
    spin();
  },
};
gui.add(parameters, "spin");

// gui.add(mesh.position, "x", -10, 10, 0.01);
// gui.add(mesh.position, "y", -10, 10, 0.01);
// gui.add(mesh.position, "z", -10, 10, 0.01);
gui.add(mesh.position, "x").min(-10).max(10).step(0.01).name("x position");

gui.add(mesh, "visible");

gui.add(material, "wireframe");

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
