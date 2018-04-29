import { Component, Input, ElementRef } from '@angular/core';
import * as THREE from 'three';


@Component({
   selector: 'three-scene',
   template: '<div style="height: 100%; overflow: hidden" (tap)="onTap($event)" (touchmove)="onMove($event)" (touchstart)="onMoveStart($event)"></div>'
})
export class ThreeSceneComponent {

   @Input()
   scope: string;

   renderer: any;
   scene: any;
   camera: any;
   raycaster: any;
   mouse: any;

   rotation: any;
   distance: any;

   lights: any;
   floors: any;
   areas: any;

   parentPage: any;

   animating: boolean;

   constructor(private threeSceneElement: ElementRef) {

      this.lights = [];
      this.floors = [];
      this.areas = [];

      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer();
      this.raycaster = new THREE.Raycaster();

      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

      this.mouse = new THREE.Vector2(-100, -100);

      this.lights['point'] = new THREE.PointLight(0xffffff, 0.8, 1000);
      this.lights['point'].position.set(-100, 200, 100);
      this.lights['ambient'] = new THREE.AmbientLight(0xffffff, 0.2);
      this.scene.add(this.lights['point']);
      this.scene.add(this.lights['ambient']);
   }

   ngAfterViewInit() {
      this.threeSceneElement.nativeElement.childNodes[0].appendChild(this.renderer.domElement);
      let width = this.threeSceneElement.nativeElement.childNodes[0].clientWidth;
      let height = this.threeSceneElement.nativeElement.childNodes[0].clientHeight;

      var sky = new THREE.Mesh(new THREE.SphereGeometry(200, 25, 25), this.loadTexturedMaterial('assets/textures/sky.jpg'));
      this.scene.add(sky);

      this.renderer.setSize(width, height);
      var gridHelper = new THREE.GridHelper(100, 100);
      gridHelper.position.y = -0.05;
      switch (this.scope) {
         case "room":
            this.scene.add(gridHelper);
            this.rotation = 0;
            this.distance = 20;
            this.camera.position.x = Math.cos(this.rotation) * Math.sqrt(this.distance * this.distance / 2);
            this.camera.position.y = Math.sqrt(this.distance * this.distance / 2);
            this.camera.position.z = Math.sin(this.rotation) * Math.sqrt(this.distance * this.distance / 2);
            break;
         case "floor":
            this.scene.add(gridHelper);
            this.camera.position.y = 20;
            break;
         case "building":
         default:
            this.camera.position.z = 20;
            break;
      }
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
   }

   loadTexturedMaterial(imageURI: String) {

      var material = new THREE.MeshBasicMaterial();
      new THREE.TextureLoader().load(
         imageURI,
         function (texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.offset.x = 90 / (2 * Math.PI);
            material.map = texture;
            material.side = THREE.BackSide
         },
         function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
         },
         function (xhr) {
            console.log('An error happened');
         }
      );
      return material;
   }

   startAnimation() {
      this.animating = true;
      this.render();
   }

   stopAnimation() {
      this.animating = false;
   }

   render() {
      this.renderer.render(this.scene, this.camera);
      if (this.animating) { requestAnimationFrame(() => { this.render() }); };
   }

   onTap(e) {
      this.mouse.x = ((e.center.x - e.target.offsetParent.offsetLeft) / e.target.offsetWidth) * 2 - 1;
      this.mouse.y = -((e.center.y - e.target.offsetParent.offsetTop) / e.target.offsetHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children);
      if (intersects.length > 0) {
         switch (this.scope) {
            case "room":
               break;
            case "floor":
               this.parentPage.navCtrl.push(this.parentPage.liveModePage, { scope: "room", oid: intersects[0].object.oid });
               break;
            case "building":
            default:
               this.parentPage.navCtrl.push(this.parentPage.liveModePage, { scope: "floor", oid: intersects[0].object.oid });
               break;
         }
      }
   }

   onMove(e) {
      let x = e.touches[0].pageX;
      let y = e.touches[0].pageY;

      switch (this.scope) {
         case "room":
            let dx = this.mouse.x - x;
            let dy = this.mouse.y - y;

            this.rotation -= dx * Math.PI / 180;
            this.distance += dy / 15;
            if (this.distance < 5) this.distance = 5;
            if (this.distance > 40) this.distance = 40;

            this.camera.position.x = Math.cos(this.rotation) * Math.sqrt(this.distance * this.distance / 2);
            this.camera.position.y = Math.sqrt(this.distance * this.distance / 2);
            this.camera.position.z = Math.sin(this.rotation) * Math.sqrt(this.distance * this.distance / 2);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            break;
         case "floor":
            this.camera.position.x += (this.mouse.x - x) / 15;
            this.camera.position.z += (this.mouse.y - y) / 15;
            this.camera.lookAt(new THREE.Vector3(this.camera.position.x, 0, this.camera.position.z));
            break;
         case "building":
         default:
            this.camera.position.y -= (this.mouse.y - y) / 15;
            this.camera.lookAt(new THREE.Vector3(0, this.camera.position.y, 0));
            break;
      }

      this.mouse.x = x;
      this.mouse.y = y;
   }

   onMoveStart(e) {
      this.mouse.x = e.touches[0].pageX;
      this.mouse.y = e.touches[0].pageY;
   }

   addFloorText(floor) {
      var canvas1 = document.createElement('canvas');
      var context1 = canvas1.getContext('2d');
      context1.font = "Bold 40px Arial";
      context1.fillStyle = "rgba(0,0,0,1)";
      context1.fillText(floor.name, 0, 50);

      // canvas contents will be used for a texture
      var texture1 = new THREE.Texture(canvas1)
      texture1.needsUpdate = true;

      var material1 = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
      material1.transparent = true;

      var mesh1 = new THREE.Mesh(
         new THREE.PlaneGeometry(canvas1.width, canvas1.height),
         material1
      );
      mesh1.position.x = 4;
      mesh1.position.y = (floor.position - 1) * 2.5 - 2;
      mesh1.scale.set(0.025, 0.025, 0.025);
      this.scene.add(mesh1);
   }

   addFloor(floor: any) {
      var floorMesh: any = new THREE.Mesh(new THREE.BoxGeometry(5, 2, 5), new THREE.MeshPhongMaterial({ color: 0xffffff }));
      floorMesh.oid = floor._id;
      floorMesh.type = "FLOOR";
      floorMesh.name = floor.name;
      floorMesh.position.x = -4;
      floorMesh.position.y = (floor.position - 1) * 2.5 - 1;
      this.scene.add(floorMesh);
      this.floors.push(floorMesh);

      this.addFloorText(floor);
   }

   addArea(area: any) {
      var areaMesh: any;
      switch (this.scope) {
         case "room":
            areaMesh = new THREE.Mesh(new THREE.BoxGeometry(area.sizeX, 3, area.sizeY),
               new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide }));
            areaMesh.position.y = 1.5;
            break;
         case "floor":
            areaMesh = new THREE.Mesh(new THREE.BoxGeometry(area.sizeX, 0.1, area.sizeY),
               new THREE.MeshPhongMaterial({ color: 0xffffff }));
            areaMesh.position.x = area.posX + area.sizeX / 2;
            areaMesh.position.z = area.posY + area.sizeY / 2;
            areaMesh.position.y = 0.05;
            break;
         case "building":
         default:
            return;
      }
      areaMesh.oid = area._id;
      areaMesh.type = "ROOM";
      areaMesh.name = area.name;

      this.scene.add(areaMesh);
      this.areas.push(areaMesh);
   }

   ordinalSuffix(num) {
      var a = num % 10,
         b = num % 100;
      if (a == 1 && b != 11) {
         return num + "st";
      }
      if (a == 2 && b != 12) {
         return num + "nd";
      }
      if (a == 3 && b != 13) {
         return num + "rd";
      }
      return num + "th";
   }

   clear() {
      this.floors = []
      this.areas = []
   }

}

