import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import isMobile from '../helpers/isMobile';

export default function useTHREE(canvasHTML: HTMLCanvasElement, url: string, container: HTMLElement) {
    
    const width = isMobile('688px') ? (container.clientWidth || window.innerWidth - 20) : window.innerWidth /2 ;
    const height = container.clientHeight || 450;
    if (!canvasHTML) return;
    console.log(height, width)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasHTML
    });

    renderer.setSize(width, height);
    const controls = new OrbitControls(camera, canvasHTML);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    
    const topLight = new THREE.DirectionalLight(new THREE.Color('white'), 0.5);
    topLight.position.set(0, -50, 0);

    const bottomLight = new THREE.DirectionalLight(new THREE.Color('orange'), 0.4);
    bottomLight.position.set(0, 200, 0);

    const ambientLight = new THREE.AmbientLight(new THREE.Color('white'), 0.4);

    scene.add(topLight);
    scene.add(bottomLight);
    scene.add(ambientLight);

    const objLoader = new OBJLoader();
    objLoader.load(url, (object: any) => {
        scene.add(object);
        const boundingBox = new THREE.Box3().setFromObject(object);
        const modelHeight = boundingBox.max.y - boundingBox.min.y;
        object.position.y -= modelHeight / 2;
        object.position.x = 0
    });

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();
}