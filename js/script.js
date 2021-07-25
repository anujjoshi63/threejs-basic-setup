// import * as THREE from "https://raw.githubusercontent.com/mrdoob/three.js/master/build/three.js";
import "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
import { OrbitControls } from "https://unpkg.com/three@0.120.1/examples/jsm/controls/OrbitControls";
let camera, scene, renderer;
scene = new THREE.Scene();
scene.background = new THREE.Color(0x999999);

scene.add(new THREE.AmbientLight(0x999999));

camera = new THREE.PerspectiveCamera(
	35,
	window.innerWidth / window.innerHeight,
	1,
	500
);

// Z is up for objects intended to be 3D printed.

camera.up.set(0, 0, 1);
camera.position.set(0, -9, 6);

camera.add(new THREE.PointLight(0xffffff, 0.8));

scene.add(camera);
const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({
		color: 0xffffff,
		// wireframe: true,
		transparent: true,
		opacity: 0.9,
		wireframeLinewidth: 1
	})
);
cube.position.z = 2;
var speed = 0.3;

scene.add(cube);

window.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
	var keyCode = event.which;
	if (keyCode == 65) {
		// alert(1);
		cube.position.x -= speed;
		// camera.position.y += speed;
	} else if (keyCode == 87) {
		cube.position.y += speed;
		// camera.position.y -= speed;
	} else if (keyCode == 68) {
		// camera.position.x -= speed;
		cube.position.x += speed;
	} else if (keyCode == 83) {
		// camera.position.x += speed;
		cube.position.y -= speed;
	} else if (keyCode == 32) {
		// camera.position.x += speed;
		cube.position.z += 1.1 * speed;
	} else if (keyCode == 17) {
		// camera.position.x += speed;
		cube.position.z -= 1.1 * speed;
	}
	render();
}
document.addEventListener("keydown", function (event) {
	if (event.ctrlKey && event.key === "s") {
		event.preventDefault();
	}
});
const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
grid.rotateOnAxis(new THREE.Vector3(1, 0, 0), 90 * (Math.PI / 180));
scene.add(grid);
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls = new OrbitControls(camera, renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);
controls.target.set(0, 1.2, 2);
controls.update();

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	render();
}
function render() {
	renderer.render(scene, camera);
}

// renderer.render(scene, camera);
