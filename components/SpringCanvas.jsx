"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * KEYFRAMES
 * ---------
 * Each entry describes what the spring looks like at a given point in the
 * page's scroll progress (0 = top of page, 1 = bottom of page).
 *
 * `t`        : scroll progress, 0 -> 1
 * `position` : [x, y, z]
 * `rotation` : [x, y, z] in radians
 * `scale`    : uniform scale
 *
 * At render time we find which two keyframes the current scroll progress
 * falls between and linearly interpolate. This is what makes the motion
 * feel identical regardless of how tall the page is (unlike driving things
 * off raw scrollY, which changes behavior every time you add/remove a
 * section).
 *
 * Tune these five poses by eyeballing each section of the reference site —
 * add more keyframes if you need finer control over a specific section.
 */
const KEYFRAMES = [
  { t: 0.0, position: [2.4, 0.4, 0], rotation: [0.18, 0.0, 0.42], scale: 1.05 },
  { t: 0.25, position: [-1.2, -0.2, -1], rotation: [0.35, 1.1, 0.7], scale: 0.9 },
  { t: 0.5, position: [1.8, 0.1, -1.5], rotation: [0.6, 2.3, 1.0], scale: 0.85 },
  { t: 0.75, position: [-2.2, 0.0, -1], rotation: [0.9, 3.4, 1.4], scale: 0.95 },
  { t: 1.0, position: [0, -0.3, 0], rotation: [1.1, 4.4, 1.7], scale: 0.75 },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getTransformAtProgress(progress) {
  const p = Math.min(Math.max(progress, 0), 1);

  let lower = KEYFRAMES[0];
  let upper = KEYFRAMES[KEYFRAMES.length - 1];

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (p >= KEYFRAMES[i].t && p <= KEYFRAMES[i + 1].t) {
      lower = KEYFRAMES[i];
      upper = KEYFRAMES[i + 1];
      break;
    }
  }

  const span = upper.t - lower.t || 1;
  const localT = (p - lower.t) / span;

  return {
    position: [
      lerp(lower.position[0], upper.position[0], localT),
      lerp(lower.position[1], upper.position[1], localT),
      lerp(lower.position[2], upper.position[2], localT),
    ],
    rotation: [
      lerp(lower.rotation[0], upper.rotation[0], localT),
      lerp(lower.rotation[1], upper.rotation[1], localT),
      lerp(lower.rotation[2], upper.rotation[2], localT),
    ],
    scale: lerp(lower.scale, upper.scale, localT),
  };
}

export default function SpringCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // ---- scene / camera -----------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.3, 9);
    camera.lookAt(0, 0, 0);

    // ---- lighting -------------------------------------------------------
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));

    const keyLight = new THREE.PointLight(0xfff4e0, 40, 30);
    keyLight.position.set(6, 4, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x6fbfff, 35, 30);
    rimLight.position.set(-6, -2, 4);
    scene.add(rimLight);

    const backLight = new THREE.PointLight(0xff7a5c, 20, 30);
    backLight.position.set(0, -5, -6);
    scene.add(backLight);

    // ---- spring geometry --------------------------------------------------
    const COILS = 46;
    const RADIUS = 1.7;
    const LENGTH = 5.2;
    const FLATTEN = 0.62;
    const POINTS_PER_COIL = 24;

    const totalPoints = COILS * POINTS_PER_COIL;
    const curvePoints = [];
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * COILS * Math.PI * 2;
      const x = Math.cos(angle) * RADIUS;
      const y = Math.sin(angle) * RADIUS * FLATTEN;
      const z = (t - 0.5) * LENGTH;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(curve, totalPoints, 0.028, 8, false);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xdedede,
      metalness: 1.0,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
      iridescence: 1.0,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, 500],
      envMapIntensity: 1.2,
    });

    const spring = new THREE.Mesh(tubeGeo, material);
    scene.add(spring);

    // ---- scroll progress -------------------------------------------------
    let targetProgress = 0;
    let currentProgress = 0;
    let frameId = 0;

    const getScrollProgress = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      return window.scrollY / scrollable;
    };

    const onScroll = () => {
      targetProgress = getScrollProgress();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    targetProgress = getScrollProgress();
    currentProgress = targetProgress;

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      targetProgress = getScrollProgress();
    };
    window.addEventListener("resize", onResize);

    // How quickly the spring "catches up" to the real scroll position.
    // Higher = snappier / more tightly coupled to scroll, lower = smoother
    // trailing motion. 0.12–0.18 reads as tightly-coupled like the reference.
    const SMOOTHING = prefersReducedMotion ? 1 : 0.15;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      currentProgress += (targetProgress - currentProgress) * SMOOTHING;

      const { position, rotation, scale } = getTransformAtProgress(currentProgress);
      spring.position.set(position[0], position[1], position[2]);
      spring.rotation.set(rotation[0], rotation[1], rotation[2]);
      spring.scale.setScalar(scale);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      tubeGeo.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}