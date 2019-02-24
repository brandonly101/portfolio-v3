// Copyright 2017 Brandon Ly all rights reserved.

// Node package imports.
import React from 'react';
import * as THREE from 'three';

export default class LandingThree extends React.Component {
    constructor(props) {
        super(props);

        this.resize = this.resize.bind(this);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize);

        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            65,
            width / height,
            0.03,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const dirLight = new THREE.DirectionalLight();
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: '#433F81' });
        const cube = new THREE.Mesh(geometry, material);
        const cubeTexture = new THREE.CubeTextureLoader();
        cubeTexture.setPath("/assets/images/space/");
        cubeTexture.load([
            'px.png',
            'nx.png',
            'py.png',
            'ny.png',
            'pz.png',
            'nz.png'
        ]);
        // scene.background = cubeTexture;
        scene.background = new THREE.Color( 0x00AA88 );

        dirLight.position.x = 1;
        dirLight.position.y = 1;
        dirLight.position.z = 1;

        camera.position.z = 4;
        scene.add(ambientLight);
        scene.add(dirLight);
        scene.add(cube);
        renderer.setClearColor('#000000');
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.material = material;
        this.cube = cube;

        this.container.appendChild(this.renderer.domElement);
        this.start();
    }

    componentWillUnmount() {
        this.stop();

        window.removeEventListener("resize", this.resize);

        this.container.removeChild(this.renderer.domElement);
    }

    resize() {
        // this.renderer.domElement.setAttribute("style",
        //     "width:" + String(window.innerWidth) + ";" +
        //     "height:" + String(window.innerHeight)
        // );
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
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
        this.frameId = window.requestAnimationFrame(this.update);
    }

    render() {
        return (<div ref={node => this.container = node}/>);
    }
}
