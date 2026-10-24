import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MOTION, IS_TOUCH } from '../lib/fx'

/** Wireframe architectural pavilion (slabs, columns, glass, reflecting pool) that orbits slowly and follows the pointer + scroll. */
export default function Pavilion3D({ className = '', color = '#8a9487', density = 1 }) {
  const wrap = useRef(null)

  useEffect(() => {
    if (!MOTION) return undefined
    const el = wrap.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) } catch { return undefined }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.className = 'gl-canvas'; renderer.domElement.setAttribute('aria-hidden', 'true')
    el.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x151715, 16, 34)
    const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 60)
    const col = new THREE.Color(color)
    const lineMat = (o = 0.9) => new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: Math.min(1, o * 1.5) })
    const group = new THREE.Group(); scene.add(group)
    const box = (w, h, d, x, y, z, o = 0.9, solid = 0) => {
      const g = new THREE.BoxGeometry(w, h, d)
      const m = new THREE.LineSegments(new THREE.EdgesGeometry(g), lineMat(o)); m.position.set(x, y, z); group.add(m)
      if (solid) { const f = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0x222522, transparent: true, opacity: solid })); f.position.copy(m.position); group.add(f) }
      return m
    }
    // terrace + floating roof + volumes
    box(7, 0.18, 4.6, 0, 0, 0, 0.8, 0.55)
    const roof = box(7.8, 0.14, 5.4, 0, 2.2, 0, 1, 0.5)
    box(2.4, 1.9, 2.2, -1.9, 1.04, -0.6, 0.85, 0.35)
    box(2.2, 1.9, 1.6, 2.3, 1.04, -1.0, 0.85, 0.35)
    for (const [x, z] of [[-3.5, 2.2], [-1.2, 2.2], [1.2, 2.2], [3.5, 2.2], [-3.5, -2.2], [3.5, -2.2]]) box(0.1, 2.1, 0.1, x, 1.1, z, 0.9)
    // glass panes
    for (let i = 0; i < 5; i++) { const p = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.1, 1.9)), lineMat(0.35)); p.position.set(-2.4 + i * 1.2, 1.05, 2.2); group.add(p) }
    // reflecting pool: concentric rings
    const rings = []
    for (let i = 1; i <= 6 * density; i++) {
      const r = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 64 }, (_, k) => { const a = (k / 64) * Math.PI * 2; return new THREE.Vector3(Math.cos(a) * i * 0.34, 0.12, Math.sin(a) * i * 0.2) })), lineMat(0.5))
      r.position.set(0.4, 0, 1.0); rings.push(r); group.add(r)
    }
    const grid = new THREE.GridHelper(40, 60, col, col); grid.material.transparent = true; grid.material.opacity = 0.22; grid.position.y = -0.02; scene.add(grid)
    group.position.y = -0.7

    const size = () => { const { width, height } = el.getBoundingClientRect(); renderer.setSize(width, height, false); cam.aspect = width / Math.max(1, height); cam.updateProjectionMatrix(); cam.position.set(0, 3.6, width < 700 ? 19 : 14.5) }
    size(); const ro = new ResizeObserver(size); ro.observe(el)
    const m = { x: 0, y: 0, tx: 0, ty: 0 }
    const move = (e) => { m.tx = (e.clientX / innerWidth - 0.5); m.ty = (e.clientY / innerHeight - 0.5) }
    if (!IS_TOUCH) window.addEventListener('pointermove', move)
    let visible = true; const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(el)
    let raf; const t0 = performance.now()
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      const t = (now - t0) / 1000
      m.x += (m.tx - m.x) * 0.05; m.y += (m.ty - m.y) * 0.05
      const r = el.getBoundingClientRect(); const sp = (r.top + r.height / 2 - innerHeight / 2) / innerHeight
      group.rotation.y = -0.55 + Math.sin(t * 0.18) * 0.35 + m.x * 0.9 + sp * 0.5
      cam.position.y = 3.6 - m.y * 1.6 + sp * 1.2
      cam.lookAt(0, 0.9, 0)
      roof.position.y = 2.2 + Math.sin(t * 0.8) * 0.06
      rings.forEach((rg, i) => { rg.scale.setScalar(1 + Math.sin(t * 1.2 - i * 0.5) * 0.04); rg.material.opacity = 0.2 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.2 - i * 0.6)) })
      renderer.render(scene, cam)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', move)
      scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.() })
      renderer.dispose(); renderer.domElement.remove()
    }
  }, [color, density])

  return <div ref={wrap} className={`${className.includes("absolute") ? "" : "relative"} ${className}`} aria-hidden data-no-anim />
}
