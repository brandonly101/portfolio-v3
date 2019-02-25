// Copyright 2017 Brandon Ly all rights reserved.

// Node package imports.
import React from 'react';
import * as THREE from 'three';

export default class LandingThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };

        this.resize = this.resize.bind(this);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        const width = document.body.scrollWidth;
        const height = window.innerHeight;

        // Create scene basics.
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            65,
            width / height,
            0.03,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor('#000000');
        renderer.setSize(width, height);
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        // Add a skybox
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const cubeTexture = cubeTextureLoader.load([
            require('../assets/landingThree/images/skybox/space3/px.jpg'),
            require('../assets/landingThree/images/skybox/space3/nx.jpg'),
            require('../assets/landingThree/images/skybox/space3/py.jpg'),
            require('../assets/landingThree/images/skybox/space3/ny.jpg'),
            require('../assets/landingThree/images/skybox/space3/pz.jpg'),
            require('../assets/landingThree/images/skybox/space3/nz.jpg')
        ]);
        scene.background = cubeTexture;

        // Create Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.70);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.30);
        dirLight.position.set(1, 1, 1);
        scene.add(ambientLight);
        scene.add(dirLight);
        this.ambientLight = ambientLight;
        this.dirLight = dirLight;

        // Add meshes (basic cubes and spheres for now)
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(require('../assets/landingThree/images/jupiter.jpg'));

        const sphereCenter = new THREE.Mesh(
            new THREE.SphereBufferGeometry(1, 100, 100),
            new THREE.MeshPhongMaterial({
                color: '#FFFFFF',
                shininess: 0,
                map: texture,
                // metalness: 0,
                // roughness: 0,
                // envMap: cubeTexture
            })
        );
        sphereCenter.rotation.z -= Math.PI / 12;
        sphereCenter.scale.set(25, 25, 25);

        const sphereLeft = new THREE.Mesh(
            new THREE.SphereBufferGeometry(1, 100, 100),
            new THREE.MeshPhysicalMaterial({
                color: '#FF0000',
                metalness: 0,
                roughness: 0,
                envMap: cubeTexture
            })
        );
        sphereLeft.position.x = -100;
        sphereLeft.scale.set(10, 10, 10);

        const cubeRight = new THREE.Mesh(
            new THREE.BoxBufferGeometry(),
            new THREE.MeshPhongMaterial({
                color: '#00EEFF',
                shininess: 0
            })
        );
        cubeRight.position.x = 100;
        cubeRight.scale.set(10, 10, 10);

        // Add everything to the scene and set up the renderer

        scene.add(sphereCenter);
        scene.add(sphereLeft);
        scene.add(cubeRight);

        const ring = new THREE.Group();

        const ringRadius = 225;
        const ringWidth = 50;
        const ringNumber = 750;

        let ringPositions = []; // should be ringNumber * 3
        for (let i = 0; i < ringNumber; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const x = Math.cos(theta);
            const y = Math.sin(theta);

            const ringOffset = ringWidth * (Math.random() - 0.5);
            const r = ringRadius + ringOffset;

            ringPositions.push(new THREE.Vector3(x * r, y * r, 0));
        }

        const geom = new THREE.SphereBufferGeometry(1, 16, 16);
        const mat = new THREE.MeshPhongMaterial({
            color: '#AAAAAA',
            shininess: 0,
            emissive: '#FF0000',
            emissiveIntensity: 0.5
        });
        for (let i = 0; i < ringNumber; i++) {
            const position = ringPositions[i];
            const tempSphere = new THREE.Mesh(geom, mat);
            tempSphere.position.x = position.x;
            tempSphere.position.y = position.y;
            tempSphere.position.z = position.z;
            tempSphere.scale.set(0.5, 0.5, 0.5);
            ring.add(tempSphere);
        }
        scene.add(ring);

        // Add everything to this component
        this.sphereCenter = sphereCenter;
        this.sphereLeft = sphereLeft;
        this.cubeRight = cubeRight;
        this.ring = ring;

        this.radius = camera.position.z = 250;
        this.loopingPi = 0;

        this.container.appendChild(this.renderer.domElement);
        this.start();

        // Add event listeners
        window.addEventListener("resize", this.resize.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    componentWillUnmount() {
        this.stop();
        this.container.removeChild(this.renderer.domElement);

        window.removeEventListener("resize", this.resize);
        window.removeEventListener("mousemove", this.onMouseMove);
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.update);
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    update() {
        this.loopingPi += 0.016666666666 * Math.PI / 2;
        this.loopingPi = this.loopingPi % (2 * Math.PI);

        // this.sphere1.rotation.x -= 0.01;
        // this.sphere1.rotation.y -= 0.01;
        this.sphereCenter.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.01);

        const sphereLeftScale = 10;
        const f = Math.sin(this.loopingPi) * 0.25 * sphereLeftScale;
        this.sphereLeft.scale.x = sphereLeftScale + f;
        this.sphereLeft.scale.y = sphereLeftScale + f;
        this.sphereLeft.scale.z = sphereLeftScale + f;

        this.cubeRight.rotation.x += 0.01;
        this.cubeRight.rotation.y += 0.01;

        this.ring.rotateOnAxis(new THREE.Vector3(0, 0, 1), -0.001);

        this.renderer.render(this.scene, this.camera);
        this.frameId = window.requestAnimationFrame(this.update);
    }

    resize() {
        const width = document.body.clientWidth;
        const height = window.innerHeight;
        const camera = this.camera;
        const renderer = this.renderer;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    onMouseMove(e) {
        const phi = (e.x / window.innerHeight - 0.5) * Math.PI / 4;
        const theta = (e.y / window.innerHeight) * Math.PI / 2 + Math.PI / 4;

        const r = this.radius;
        const x = r * Math.sin(theta) * Math.sin(phi);
        const y = r * Math.cos(theta);
        const z = r * Math.sin(theta) * Math.cos(phi);

        this.camera.position.set(x, y, z);
        this.dirLight.position.set(x, y, z);
        this.camera.lookAt(0, 0 ,0);
    }

    // React DOM render function. Not to be confused with Three.js's render
    // function.
    render() { return (<div ref={node => this.container = node} />); }
}
