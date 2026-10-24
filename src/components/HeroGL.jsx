import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MOTION, IS_TOUCH } from '../lib/fx'

const vert = /* glsl */`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`
const frag = /* glsl */`
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex; uniform vec2 uRes; uniform vec2 uImg; uniform vec2 uMouse; uniform float uVel; uniform float uTime; uniform float uReveal; uniform float uScroll;
void main(){
  // object-fit: cover
  vec2 r = uRes / uImg; float s = max(r.x, r.y);
  vec2 uv = (vUv - 0.5) * uRes / (uImg * s) + 0.5;
  uv.y += uScroll * 0.06;
  uv = clamp(uv, 0.002, 0.998);
  // liquid ripple around the pointer
  vec2 p = vUv * uRes / uRes.y; vec2 m = uMouse * uRes / uRes.y;
  float d = distance(p, m);
  float ring = sin(d * 38.0 - uTime * 3.2) * exp(-d * 5.0);
  vec2 dir = normalize(p - m + 1e-5);
  uv += dir * ring * (0.006 + uVel * 0.03);
  // slow ambient drift
  uv += vec2(sin(vUv.y * 6.0 + uTime * .5), cos(vUv.x * 6.0 + uTime * .4)) * 0.0016;
  // chromatic split follows pointer velocity
  float a = uVel * 0.012;
  vec3 col = vec3(texture2D(uTex, uv + dir * a).r, texture2D(uTex, uv).g, texture2D(uTex, uv - dir * a).b);
  float edge = 1.0 - smoothstep(uReveal - 0.2, uReveal, 1.0 - vUv.y);
  gl_FragColor = vec4(col * (0.97 + 0.03 * sin(uTime)), edge);
}`

/** Image rendered through a WebGL plane: liquid pointer ripple, RGB split and scroll parallax. Falls back to the plain <img>. */
export default function HeroGL({ src, alt = '', className = '', imgClassName = 'w-full h-full object-cover' }) {
  const wrap = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    if (!MOTION) return undefined
    const el = wrap.current
    let renderer, raf, disposed = false, visible = true
    const loader = new THREE.TextureLoader(); loader.setCrossOrigin('anonymous')
    loader.load(src, (tex) => {
      if (disposed) { tex.dispose(); return }
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
      } catch { return }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.domElement.className = 'gl-canvas'
      renderer.domElement.setAttribute('aria-hidden', 'true')
      el.appendChild(renderer.domElement)
      tex.colorSpace = THREE.SRGBColorSpace
      const scene = new THREE.Scene(); const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const u = {
        uTex: { value: tex }, uRes: { value: new THREE.Vector2(1, 1) }, uImg: { value: new THREE.Vector2(tex.image.width, tex.image.height) },
        uMouse: { value: new THREE.Vector2(-5, -5) }, uVel: { value: 0 }, uTime: { value: 0 }, uReveal: { value: 0 }, uScroll: { value: 0 },
      }
      const mat = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms: u, transparent: true })
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat))
      const size = () => { const { width, height } = el.getBoundingClientRect(); renderer.setSize(width, height, false); u.uRes.value.set(width, height) }
      size(); const ro = new ResizeObserver(size); ro.observe(el)
      const target = new THREE.Vector2(-5, -5); let vel = 0; const last = new THREE.Vector2()
      const move = (e) => { const r = el.getBoundingClientRect(); target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height) }
      const leave = () => target.set(-5, -5)
      if (!IS_TOUCH) { el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave) }
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(el)
      let t0 = performance.now()
      let reveal = 0
      const loop = (t) => {
        raf = requestAnimationFrame(loop)
        if (!visible) return
        const dt = (t - t0) / 1000; t0 = t
        u.uTime.value += dt
        if (u.uMouse.value.x < -2) u.uMouse.value.copy(target); else u.uMouse.value.lerp(target, 0.12)
        vel += (Math.min(1, u.uMouse.value.distanceTo(last) * 14) - vel) * 0.1; last.copy(u.uMouse.value); u.uVel.value = vel
        reveal = Math.min(1.3, reveal + dt * 0.8); u.uReveal.value = reveal
        const r = el.getBoundingClientRect(); u.uScroll.value = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight)) * -1
        renderer.render(scene, cam)
      }
      raf = requestAnimationFrame(loop)
      if (imgRef.current) imgRef.current.style.opacity = '0'
      el._cleanup = () => { ro.disconnect(); io.disconnect(); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
    }, undefined, () => { /* CORS or network failure → keep the <img> */ })
    return () => {
      disposed = true; cancelAnimationFrame(raf); el._cleanup?.()
      if (renderer) { renderer.dispose(); renderer.domElement.remove() }
      if (imgRef.current) imgRef.current.style.opacity = ''
    }
  }, [src])

  return (
    <div ref={wrap} className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden ${className}`} data-no-anim>
      <img ref={imgRef} src={src} alt={alt} className={imgClassName} />
    </div>
  )
}
