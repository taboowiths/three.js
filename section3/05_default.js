import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;
let boxMesh;

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

let windowHalfX = WIDTH / 2;
let windowHalfY = HEIGHT / 2;
const faceGroup = new THREE.Group();

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
  camera.position.set(50, 50, 50);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x0e2255);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  {
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(50, 50, 50); // 카메라와 같은 위치
    spotLight.target.position.set(0, 0, 0); // 원점을 비추게 함
    scene.add(spotLight);
    scene.add(spotLight.target);
  }

  // 기본 도형으로 얼굴 만들기

  // 1. 얼굴
  const geometry = new THREE.BoxGeometry(50, 25, 12);
  const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  boxMesh = new THREE.Mesh(geometry, material);

  // 2. 코
  const geometry_cone = new THREE.ConeGeometry(5, 15, 12);
  const material_cone = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  const cone = new THREE.Mesh(geometry_cone, material_cone);
  cone.rotation.set(1.6, 5, 0);
  cone.position.set(0, 0, 5);

  // 3. 왼쪽 눈
  const geometry_sphere = new THREE.SphereGeometry(1, 10, 10);
  const material_sphere = new THREE.MeshLambertMaterial({ color: 0x000000 });
  const sphere1 = new THREE.Mesh(geometry_sphere, material_sphere);
  sphere1.position.set(-5, 5, 6);

  // 4. 오른쪽 눈
  const sphere2 = new THREE.Mesh(geometry_sphere, material_sphere);
  sphere2.position.set(5, 5, 6);

  faceGroup.add(boxMesh, cone, sphere1, sphere2);
  scene.add(faceGroup);

  document.addEventListener("mousemove", onDocumentMouseMove);
};

const onDocumentMouseMove = (event) => {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
};

const animate = () => {
  targetX = mouseX * 0.002;
  targetY = mouseY * 0.002;

  if (faceGroup) {
    faceGroup.rotation.y += 0.05 * (targetX - faceGroup.rotation.y);
    faceGroup.rotation.x += 0.05 * (targetY - faceGroup.rotation.x);
  }

  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const stageResize = () => {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;

  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
};

init();
animate();
window.addEventListener("resize", stageResize);
