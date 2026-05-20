const canvas = document.getElementById('fractalCanvas');
const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
const devicePixelRatio = window.devicePixelRatio || 1;
const glAttributes = { alpha: false, antialias: !isMobileDevice, premultipliedAlpha: false };
const gl = canvas.getContext('webgl', glAttributes) || canvas.getContext('experimental-webgl', glAttributes);

let width = 0;
let height = 0;
let startTime = performance.now();
let mouseX = 0.5;
let mouseY = 0.5;
let mandalaState = 0;
let qualityScale = 1.0;
let fpsAccumulator = 0;
let fpsFrameCount = 0;
let lastFrameTime = performance.now();

const vertexSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const fragmentSource = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_state;

vec3 palette(float t) {
  vec3 a = vec3(0.8, 0.2, 0.4);
  vec3 b = vec3(0.15, 0.65, 0.75);
  vec3 c = vec3(0.9, 0.7, 0.2);
  vec3 d = vec3(0.4, 0.15, 0.6);
  float w = smoothstep(0.0, 1.0, t);
  return mix(mix(a, b, fract(t * 1.8)), mix(c, d, fract(t * 0.95)), w) * (0.85 + 0.25 * sin(t * 8.0));
}

float stripes(vec2 p, float frequency) {
  float angle = atan(p.y, p.x);
  float value = abs(sin((p.x + p.y * 0.4) * frequency + angle * 3.0));
  return smoothstep(0.38, 0.42, value);
}

float overlapCircle(vec2 p, float radius, float width) {
  return smoothstep(radius + width, radius, length(p));
}

float mandalaShape(vec2 uv, float a, float r, float time, float state) {
  float shape = 0.0;
  float fabric = sin(uv.x * 12.0 + time * 0.8) * sin(uv.y * 10.0 + time * 1.2) * 0.3;
  if (state < 0.5) {
    float waves = sin(r * 18.0 - time * 2.5 + sin(a * 6.0 + time * 1.2) * 0.5) * 0.5;
    float flow = abs(sin(a * 5.0 + time * 1.8 + r * 2.5));
    shape = smoothstep(0.20, 0.12, abs(flow - 0.4) * 0.85 + waves * 0.3);
  } else if (state < 1.5) {
    float silk = sin(r * 16.0 - time * 3.2) * cos(a * 7.0 + time * 1.5);
    float drape = abs(cos(a * 9.0 + r * 3.5 - time * 2.0));
    shape = smoothstep(0.22, 0.14, drape * 0.75 + silk * 0.5 + fabric * 0.2);
  } else if (state < 2.5) {
    float weave = sin((uv.x + uv.y) * 14.0 - time * 2.2 + a * 4.0) * 0.4;
    float shimmer = abs(sin(a * 11.0 + r * 6.0 + time * 1.6));
    shape = smoothstep(0.24, 0.16, shimmer * 0.8 + weave + fabric * 0.25);
  } else {
    float petals = abs(sin(a * 13.0 + r * 4.5 - time * 2.2));
    float ripple = sin(r * 12.0 - time * 2.8 + a * 5.0) * 0.35;
    shape = smoothstep(0.22, 0.15, petals * 0.7 + ripple + fabric * 0.15);
  }
  return clamp(shape, 0.0, 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  float time = u_time * 0.0008;
  vec2 mouse = (u_mouse - 0.5) * 2.0;
  float r = length(uv);
  float a = atan(uv.y, uv.x);
  float state = floor(mod(u_state, 4.0) + 0.5);

  vec3 colorA = palette(r * 1.1 + time);
  vec3 colorB = palette(a * 0.16 + 0.25 + time);
  vec3 colorC = palette(0.5 + sin(time * 1.25) * 0.2);

  vec3 base = mix(colorA, colorB, 0.45 + 0.45 * sin(time * 1.3));
  vec3 glow = mix(colorC, vec3(1.0, 0.8, 0.45), smoothstep(0.7, 0.4, r));

  float mandala = mandalaShape(uv, a, r, time, state);
  float aura = smoothstep(0.56, 0.50, abs(sin(a * 8.0 + time * 1.2)) + r * 0.8);

  vec3 color = mix(base * 0.24, glow, mandala * 0.92 + 0.08);
  color += vec3(0.10, 0.06, 0.18) * (1.0 - r);
  color += vec3(0.18, 0.04, 0.28) * aura * 0.28;
  color += vec3(0.12, 0.06, 0.18) * mandala * 0.22;
  color *= 1.0 - smoothstep(0.92, 1.0, r);

  gl_FragColor = vec4(color, 1.0);
}`;

function resizeCanvas() {
  const baseWidth = window.innerWidth;
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  const baseHeight = Math.floor(vh);

  const maxRenderArea = isMobileDevice ? 900000 : 1800000;
  const effectivePixelRatio = Math.min(devicePixelRatio, isMobileDevice ? 1.5 : 2) * qualityScale;
  const estimatedArea = baseWidth * baseHeight * effectivePixelRatio * effectivePixelRatio;
  const scaleDown = estimatedArea > maxRenderArea ? Math.sqrt(maxRenderArea / estimatedArea) : 1;
  const renderScale = effectivePixelRatio * scaleDown;

  width = canvas.width = Math.max(1, Math.floor(baseWidth * renderScale));
  height = canvas.height = Math.max(1, Math.floor(baseHeight * renderScale));
  canvas.style.width = `${baseWidth}px`;
  canvas.style.height = `${baseHeight}px`;

  if (gl) {
    gl.viewport(0, 0, width, height);
  }
}

if (!gl) {
  console.warn('WebGL not supported, background animation will be simplified.');
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(width * 0.5, height * 0.4, 0, width * 0.5, height * 0.4, Math.max(width, height) * 0.7);
  gradient.addColorStop(0, 'rgba(255, 0, 170, 0.18)');
  gradient.addColorStop(1, 'rgba(9, 2, 15, 0.92)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
} else {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexSource);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentSource);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(fragmentShader));
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
  }

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const timeLocation = gl.getUniformLocation(program, 'u_time');
  const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
  const stateLocation = gl.getUniformLocation(program, 'u_state');

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  function render() {
    const now = performance.now();
    const delta = now - lastFrameTime;
    lastFrameTime = now;
    fpsAccumulator += delta;
    fpsFrameCount += 1;

    if (fpsFrameCount >= 40) {
      const avgFps = 1000 * fpsFrameCount / fpsAccumulator;
      fpsAccumulator = 0;
      fpsFrameCount = 0;

      const previousQuality = qualityScale;
      if (avgFps < 40 && qualityScale > 0.5) {
        qualityScale = Math.max(0.5, qualityScale - 0.1);
      } else if (avgFps > 55 && qualityScale < 1.0) {
        qualityScale = Math.min(1.0, qualityScale + 0.1);
      }
      if (qualityScale !== previousQuality) {
        resizeCanvas();
      }
    }

    const t = now - startTime;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolutionLocation, width, height);
    gl.uniform1f(timeLocation, t);
    gl.uniform2f(mouseLocation, mouseX * width, (1.0 - mouseY) * height);
    gl.uniform1f(stateLocation, mandalaState);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

window.addEventListener('resize', resizeCanvas);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', resizeCanvas);
  window.visualViewport.addEventListener('scroll', resizeCanvas);
}

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX / width;
  mouseY = event.clientY / height;
});

document.addEventListener('touchstart', (event) => {
  if (event.touches.length > 0) {
    mouseX = event.touches[0].clientX / width;
    mouseY = event.touches[0].clientY / height;
  }
});

document.addEventListener('touchmove', (event) => {
  if (event.touches.length > 0) {
    mouseX = event.touches[0].clientX / width;
    mouseY = event.touches[0].clientY / height;
  }
});

canvas.addEventListener('click', () => {
  if (!isMobileDevice) {
    mandalaState = (mandalaState + 1) % 4;
  }
});

canvas.addEventListener('touchend', (event) => {
  event.preventDefault();
  mandalaState = (mandalaState + 1) % 4;
});

resizeCanvas();
