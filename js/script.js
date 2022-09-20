// import './style.css'
// import * as THREE from 'three'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Texture loader
const textureLoader = new THREE.TextureLoader()

// Objects
var map = textureLoader.load( "../static/srishti.png" );
var imageMaterial = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
var srishtiImage = new THREE.Sprite( imageMaterial );
srishtiImage.scale.set(2, 2, 2)
srishtiImage.position.set(0, 0, 0.6)
scene.add(srishtiImage)

let sphereRadius;

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    srishtiImage.scale.set(1.2, 1.2, 1.2)
    sphereRadius = 0.7;
} else {
    sphereRadius = 1.1;
}

// const sphereGeometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 16);
// const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

// Coordinates of points
const posArray = new Float32Array(particlesCnt * 3)

for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials
const sphereMaterial = new THREE.PointsMaterial({
    size: 0.01
})

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.01,
    color: 0x802BB1
})

sphereMaterial.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Points(sphereGeometry, sphereMaterial)
// sphere.position.z = -0.5

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(sphere, particlesMesh)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#000000'), 1)
// renderer.setClearColor(new THREE.Color('#2D283E'), 1)

document.addEventListener('mousemove', animateParticles);

// /**
//  * Animate
//  */

const clock = new THREE.Clock()

let mouseX = 0,
  mouseY = 0, flag = 0;

function animateParticles(e) {
    mouseX = e.clientX / canvas.width * 20 - 10;
    mouseY = e.clientY / canvas.height * 20 - 10;
    flag = 1;
}

const tick = () => {
    const deltaTime = clock.getDelta();

    sphere.rotation.y += .25 * deltaTime
    sphere.rotation.x += .25 * deltaTime

    if(flag == 0) {
        particlesMesh.rotation.y -= deltaTime * 0.05;
    }
  
    particlesMesh.rotation.x -= mouseY * deltaTime * 0.03;
    particlesMesh.rotation.y -= mouseX * deltaTime * 0.03;

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick()