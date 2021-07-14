import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118.3/examples/jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antiAlias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 0, 3);
controls.update();

const randRange = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

const spheres = [];

// set count and generate spheres
const addSphere = (idx) => {
    const sphereProps = {
        radius: randRange(28, 45) / 100,
        widthSegments: randRange(3, 60),
        heightSegments: randRange(3, 60),
    }
    const { radius, widthSegments, heightSegments } = sphereProps;
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const material = new THREE.MeshNormalMaterial({ shading: THREE.FlatShading });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = Math.random() * idx - 1;
    sphere.position.y = Math.random() * idx - 2;
    sphere.position.z = Math.random() * idx - idx;

    scene.add(sphere);
    spheres.push(sphere);
}

for (let i = 0; i < 30; i++) {
    addSphere(i);
}

const move = (time) => {
    time *= 0.001;
    spheres.forEach((sphere, ndx) => {
        // sphere.rotation.x += Math.sin(time);
        const speed = 0.12 + ndx * 0.075;
        const rot = time * speed;
        sphere.rotation.x = rot;
        sphere.rotation.y = rot;
        sphere.position.x = Math.sin(rot);
        sphere.position.y = Math.cos(rot);
    })
}

// animate on loop
function animate(time) {
    move(time);
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();