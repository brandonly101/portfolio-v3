// Copyright 2017 Brandon Ly all rights reserved.

// Node package imports.
import React from 'react';
import * as THREE from 'three';

const ringInstVS = '\
precision highp float;\n\
\n\
// uniform mat4 modelViewMatrix;\n\
// uniform mat4 projectionMatrix;\n\
\n\
// attribute vec3 position;\n\
attribute vec4 ringInstPos;\n\
\
varying vec3 worldPos;\
\
\n\
void main() {\n\
    worldPos = position;\
	gl_Position = projectionMatrix * modelViewMatrix * vec4(ringInstPos.xyz + ringInstPos.a * position, 1.0);\n\
}\n\
';

const ringInstPS = '\
precision highp float;\
\
uniform vec3 color;\
\
varying vec3 worldPos;\
\
void main() {\
    float lambertian = dot(normalize(worldPos), normalize(cameraPosition));\
    gl_FragColor = vec4(color * lambertian * 0.2 + color * 0.8, 1);\
}\
';

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
        // const width = window.innerWidth;
        const width = document.body.clientWidth;
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
            require('../assets/landingThree/images/skybox/space/px.jpg'),
            require('../assets/landingThree/images/skybox/space/nx.jpg'),
            require('../assets/landingThree/images/skybox/space/py.jpg'),
            require('../assets/landingThree/images/skybox/space/ny.jpg'),
            require('../assets/landingThree/images/skybox/space/pz.jpg'),
            require('../assets/landingThree/images/skybox/space/nz.jpg')
        ]);
        scene.background = cubeTexture;
        scene.fog = new THREE.Fog(new THREE.Color('#000304'), 100, 1000)

        // Create Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
        dirLight.position.set(0, 0, 1);
        scene.add(ambientLight);
        scene.add(dirLight);
        this.ambientLight = ambientLight;
        this.dirLight = dirLight;

        // Add meshes (basic cubes and spheres for now)
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(require('../assets/landingThree/images/flakes_n.png'));

        const sphereCenter = new THREE.Mesh(
            new THREE.SphereBufferGeometry(1, 100, 100),
            new THREE.MeshPhongMaterial({
                color: '#ffef8c',
                shininess: 0,
                normalMap: texture,
                // map: texture,
                // emissive: '#ffef8c',
                // emissiveIntensity: 1
                // metalness: 0,
                // roughness: 0,
                // envMap: cubeTexture,
            })
        );
        sphereCenter.rotation.z -= Math.PI / 12;
        const sphereCenterScale = 50;
        sphereCenter.scale.set(sphereCenterScale, sphereCenterScale, sphereCenterScale);

        // const sphereLeft = new THREE.Mesh(
        //     new THREE.SphereBufferGeometry(1, 100, 100),
        //     new THREE.MeshPhysicalMaterial({
        //         color: '#FF0000',
        //         metalness: 0,
        //         roughness: 0,
        //         envMap: cubeTexture
        //     })
        // );
        // sphereLeft.position.x = -100;
        // sphereLeft.scale.set(10, 10, 10);

        // const cubeRight = new THREE.Mesh(
        //     new THREE.BoxBufferGeometry(),
        //     new THREE.MeshPhongMaterial({
        //         color: '#00EEFF',
        //         shininess: 0
        //     })
        // );
        // cubeRight.position.x = 100;
        // cubeRight.scale.set(10, 10, 10);

        // Add everything to the scene and set up the renderer

        scene.add(sphereCenter);
        // scene.add(sphereLeft);
        // scene.add(cubeRight);

        const ringWidth = 24;
        const ringNumber = 8192;
        const ringCount = 8;

        let ringPositions = []; // should be ringNumber * 3
        let ringPos1 = [];
        let ringPos2 = [];
        for (let i = 0; i < ringCount; i++) {
            const ringRadius = 100 * (i + 1);

            let ringInstPos = [];
            for (let j = 0; j < ringNumber; j++) {
                const theta = Math.random() * 2 * Math.PI;
                const x = Math.cos(theta);
                const y = Math.sin(theta);

                const rOffset = (Math.random() > 0.5 ? 1 : -1) * ringWidth * Math.pow(Math.random(), 0.525);
                const r = ringRadius + rOffset;

                const phiOffset = Math.random() * 2 * Math.PI;
                const thetaOffset = Math.random() * 2 * Math.PI;

                const xOffset = rOffset * Math.sin(thetaOffset) * Math.cos(phiOffset);
                const yOffset = rOffset * Math.sin(thetaOffset) * Math.sin(phiOffset);
                const zOffset = rOffset * Math.cos(thetaOffset);

                // ringPositions.push(new THREE.Vector4(
                //     x * r + xOffset,
                //     y * r + yOffset,
                //     zOffset,
                //     (1 - Math.pow(rOffset / ringWidth, 2)) * 1.5
                // ));
                if (i % 2 == 0) {
                    ringPos1.push(x * r + xOffset);
                    ringPos1.push(y * r + yOffset);
                    ringPos1.push(zOffset);
                    ringPos1.push((1 - Math.pow(rOffset / ringWidth, 2)) * 1.5);
                } else {
                    ringPos2.push(x * r + xOffset);
                    ringPos2.push(y * r + yOffset);
                    ringPos2.push(zOffset);
                    ringPos2.push((1 - Math.pow(rOffset / ringWidth, 2)) * 1.5);
                }
            }
        }

        // const mat = new THREE.MeshLambertMaterial({
        //     color: '#d1e8ff',
        //     // shininess: 0,
        //     // emissive: '#ffef8c',
        //     // emissiveIntensity: 1.5
        // });
        // const mat2 = new THREE.MeshLambertMaterial({
        //     color: '#ffef8c',
        //     // shininess: 0,
        //     // emissive: '#ffef8c',
        //     // emissiveIntensity: 1.5
        // });

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                "color": { value: new THREE.Color('#d1e8ff').toArray() }
            },
            vertexShader: ringInstVS,
            fragmentShader: ringInstPS,
            transparent: false
        });
        const mat2 = new THREE.ShaderMaterial({
            uniforms: {
                "color": { value: new THREE.Color('#ffef8c').toArray() }
            },
            vertexShader: ringInstVS,
            fragmentShader: ringInstPS,
            transparent: false
        });

        const geomSphere = new THREE.SphereBufferGeometry(1, 5, 5);

        const geomInst = new THREE.InstancedBufferGeometry().copy(geomSphere);
        geomInst.addAttribute('ringInstPos', new THREE.InstancedBufferAttribute(new Float32Array(ringPos1), 4));
        const ringInst = new THREE.Mesh(geomInst, mat);
        scene.add(ringInst);
        
        const geomInst2 = new THREE.InstancedBufferGeometry().copy(geomSphere);
        geomInst2.addAttribute('ringInstPos', new THREE.InstancedBufferAttribute(new Float32Array(ringPos2), 4));
        const ringInst2 = new THREE.Mesh(geomInst2, mat2);
        scene.add(ringInst2);
        
        ringInst2.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        // const geom = new THREE.SphereGeometry();
        const rings = [ ringInst, ringInst2 ];
        // for (let i = 0; i < ringCount; i++) {
        //     const ring = new THREE.Group();

        //     for (let j = i * ringNumber; j < (i + 1) * ringNumber; j++) {
        //         const p = ringPositions[j];

        //         const tempSphere = new THREE.Mesh(geom, (i % 2) === 0 ? mat : mat2);
        //         tempSphere.scale.set(p.w, p.w, p.w);
        //         tempSphere.rotation.set(p.x, p.y, p.z);
        //         tempSphere.position.set(p.x, p.y, p.z);

        //         ring.add(tempSphere);
        //     }

        //     if ((i % 2) !== 0) {
        //         ring.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        //     }

        //     scene.add(ring);
        //     rings.push(ring);
        // }

        // Add everything to this component
        this.sphereCenter = sphereCenter;
        // this.sphereLeft = sphereLeft;
        // this.cubeRight = cubeRight;
        this.rings = rings;

        this.radius = camera.position.z = 175;
        this.loopingPi = 0;
        this.ringCount = ringCount;

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

        this.sphereCenter.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.01);

        // const sphereLeftScale = 10;
        // const f = Math.sin(this.loopingPi) * 0.25 * sphereLeftScale;
        // this.sphereLeft.scale.x = sphereLeftScale + f;
        // this.sphereLeft.scale.y = sphereLeftScale + f;
        // this.sphereLeft.scale.z = sphereLeftScale + f;

        // this.cubeRight.rotation.x += 0.01;
        // this.cubeRight.rotation.y += 0.01;

        const ringCount = this.rings.length;
        for (let i = 0; i < ringCount; i++) {
            this.rings[i].rotateOnAxis(
                new THREE.Vector3(0, 0, 1),
                ((i % 2) === 0 ? -1 : 1) * 0.001 * (ringCount - i) / ringCount
            );
        }

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
        const width = document.body.clientWidth;
        const height = window.innerHeight;

        const phi = (e.x / width - 0.5) * width / height * Math.PI / 5;
        const theta = (e.y / height) * Math.PI / 2 + Math.PI / 4;

        const r = this.radius;
        const x = r * Math.sin(theta) * Math.sin(phi);
        const y = r * Math.cos(theta);
        const z = r * Math.sin(theta) * Math.cos(phi);

        this.camera.position.set(x, y, z);
        this.dirLight.position.set(x, y, z);
        // this.dirLight.position.set(-x, -y, -z);
        this.camera.lookAt(0, 0 ,0);
    }

    // React DOM render function. Not to be confused with Three.js's render
    // function.
    render() { return (<div ref={node => this.container = node} />); }
}
