<template>
  <div id="page" v-loading.fullscreen.lock="fullscreenLoading">
    <p class="top animate__animated animate__zoomInDown">鼠标可以拉拽，旋转场景</p>
    <div class="enter animate__animated animate__zoomInDown">
      <h2>Welcome to my town</h2>
      <p @click="welcome">Enter to Blog</p>
    </div>
    <button @click="manage">Admin Login</button>
  </div>
</template>

<script>
import * as THREE from "three";
// import * as dat from "dat.gui";
// import * as Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default {
  name: "Page",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      light: null,
      clock: null,
      model: null,
      width: null,
      height: null,
      param: null,
      objUrl: null,
      mtlUrl: null,
      controls: null,
      api: { state: "Idle" },
      activeAction: "",
      mixer: "",
      fullscreenLoading: true
    };
  },
  methods: {
    welcome() {
      this.$router.push({ path: "/blog" });
    },
    manage() {
      this.$router.push({ path: "/edit" });
    },
    init() {
      //相机
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.25,
        100
      );
      this.camera.position.set(-5, 3, 10);
      this.camera.lookAt(new THREE.Vector3(0, 2, 0));
      //场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x87ceeb);
      this.scene.fog = new THREE.Fog(0x87ceeb, 20, 100);

      this.clock = new THREE.Clock();

      // 灯光
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      hemiLight.position.set(0, 20, 0);
      this.scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(0, 20, 10);
      this.scene.add(dirLight);

      // 地面
      const loader = new THREE.TextureLoader();
      const groundTexture = loader.load("../../grass.jpg");
      groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
      groundTexture.repeat.set(25, 25);
      groundTexture.anisotropy = 16;
      groundTexture.encoding = THREE.sRGBEncoding;

      const groundMaterial = new THREE.MeshLambertMaterial({
        map: groundTexture,
      });

      let mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        groundMaterial
      );
      mesh.position.y = -0.2;
      mesh.rotation.x = -Math.PI / 2;
      mesh.receiveShadow = true;

      this.scene.add(mesh);

      // const grid = new THREE.GridHelper(100, 60, 0x000000, 0x000000);
      // grid.material.opacity = 0.2;
      // grid.material.transparent = true;
      // this.scene.add(grid);

      // 模型
      this.gltfLoader = new GLTFLoader();
      this.gltfLoader.load(
        //public省略
        "../../Zero.glb",
        (gltf) => {
          console.log(gltf, "gltf");
          gltf.scene.scale.set(0.4, 0.4, 0.4);
          gltf.scene.position.set(0, 0, 0); //定位
          gltf.scene.rotation.y = -0.5;
          // 模型是否否需要阴影
          gltf.scene.traverse((obj) => {
            obj.castShadow = true;
            obj.receiveShadow = true;
          });
          this.fullscreenLoading = false;
          this.scene.add(gltf.scene);
          const animations = gltf.animations;
          this.mixer = new THREE.AnimationMixer(gltf.scene);
          this.mixer.clipAction(animations[1]).play();

          this.animate();
        }
      );
      this.gltfLoader.load(
        //public省略
        "../../Bell_Tower.glb",
        (gltf) => {
          gltf.scene.position.set(8, 0, -5); //定位
          gltf.scene.rotation.y = -0.5;
          // 模型是否否需要阴影
          gltf.scene.traverse((obj) => {
            obj.castShadow = true;
            obj.receiveShadow = true;
          });
          this.scene.add(gltf.scene);
        }
      );
      this.gltfLoader.load(
        //public省略
        "../../Blacksmith.glb",
        (gltf) => {
          gltf.scene.position.set(5, 0, -5); //定位
          gltf.scene.rotation.y = -0.5;
          // 模型是否否需要阴影
          gltf.scene.traverse((obj) => {
            obj.castShadow = true;
            obj.receiveShadow = true;
          });
          this.scene.add(gltf.scene);
        }
      );
      this.gltfLoader.load(
        //public省略
        "../../Inn.glb",
        (gltf) => {
          gltf.scene.position.set(-4, 0, -1); //定位
          gltf.scene.rotation.y = 1.2;
          // 模型是否否需要阴影
          gltf.scene.traverse((obj) => {
            obj.castShadow = true;
            obj.receiveShadow = true;
          });
          this.scene.add(gltf.scene);
        }
      );
      this.gltfLoader.load(
        //public省略
        "../../Stable.glb",
        (gltf) => {
          
          gltf.scene.position.set(3, 0, -8); //定位
          gltf.scene.rotation.y = -0.5;
          // 模型是否否需要阴影
          gltf.scene.traverse((obj) => {
            obj.castShadow = true;
            obj.receiveShadow = true;
          });
          this.scene.add(gltf.scene);
        }
      );
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      page.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      window.addEventListener("resize", this.onWindowResize);

    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    animate() {
      const dt = this.clock.getDelta();
      if (this.mixer) this.mixer.update(dt);

      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
  },

  mounted() {
    this.init();
    this.animate();
    
  },
};
</script>
<style scoped lang="scss">
#page {
  width: 100%;
  height: 100%;
  position: relative;
  // overflow: hidden;
  .enter {
    width: 100%;
    height: 30px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    bottom: 30%;
    left: 50%;
    transform: translateX(-50%);
    h2 {
      font-size: 20px;
      color: rgb(250, 245, 245);
      font-weight: bold;
      margin-bottom: 30px;
    }
    p{
      color: rgb(250, 245, 245);
      cursor: pointer;
      border-radius: 8px;
      border: 2px solid rgb(253, 252, 252);
      padding: 5px;
    }
    p:hover{
      color: rgb(16, 238, 16);
      border: 2px solid rgb(16, 238, 16);
    }
  }
  button{
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .top{
    position: absolute;
    top: 10px;
    right: 50%;
    transform: translateX(50%);
    font-size: 10px;
  }
}
</style>