/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// const regl = require('regl')()
// const mouse = require("mouse-change")();
var createReglRecorder = __webpack_require__(1);



const VIDEO_WIDTH = (VIDEO_HEIGHT = 600);

const regl = __webpack_require__(2)(
  __webpack_require__(3)(VIDEO_WIDTH, VIDEO_HEIGHT, { preserveDrawingBuffer: true })
);
var recorder = createReglRecorder(regl, 100);

var fsh = __webpack_require__(4);
var vsh = __webpack_require__(5);

const pixels = regl.texture();

const drawFeedback = regl({
  frag: fsh,
  vert: vsh,
  attributes: {
    position: [-2, 0, 0, -2, 2, 2]
  },

  uniforms: {
    resolution: context => [context.viewportWidth, context.viewportHeight],
    // resolution: context => [VIDEO_WIDTH, VIDEO_HEIGHT],
    
    // texture: pixels,
    // mouse: ({ pixelRatio, viewportHeight }) => [
      // mouse.x * pixelRatio,
      // viewportHeight - mouse.y * pixelRatio
    // ],
    // t: ({ tick }) => 0.01 * tick
    tick :({tick})=>tick
    
  },
  count: 3
});

regl.frame(function({viewportWidth,viewportHeight}) {
  regl.clear({
    depth:1,
    color: [0, 0, 0, 1]
  });

  drawFeedback();

  // pixels({
  //   copy: true
  // });
  recorder.frame(viewportWidth, viewportHeight)
  
  
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("regl-recorder");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("regl");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("gl");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nuniform float tick;\nuniform vec2 resolution;\n// uniform sampler2D texture;\n// uniform vec2 mouse;\nvarying vec2 uv;\nfloat PI = 3.14159;\nvec2 doModel(vec3 p);\n\nfloat t = sin(tick * PI * 2. /100. )*0.5;\n\n// Originally sourced from https://www.shadertoy.com/view/ldfSWs\n// Thank you Iñigo :)\n\nvec2 calcRayIntersection_7_0(vec3 rayOrigin, vec3 rayDir, float maxd, float precis) {\n  float latest = precis * 2.0;\n  float dist   = +0.0;\n  float type   = -1.0;\n  vec2  res    = vec2(-1.0, -1.0);\n\n  for (int i = 0; i < 90; i++) {\n    if (latest < precis || dist > maxd) break;\n\n    vec2 result = doModel(rayOrigin + rayDir * dist);\n\n    latest = result.x;\n    type   = result.y;\n    dist  += latest;\n  }\n\n  if (dist < maxd) {\n    res = vec2(dist, type);\n  }\n\n  return res;\n}\n\nvec2 calcRayIntersection_7_0(vec3 rayOrigin, vec3 rayDir) {\n  return calcRayIntersection_7_0(rayOrigin, rayDir, 20.0, 0.001);\n}\n\n\n\n// Originally sourced from https://www.shadertoy.com/view/ldfSWs\n// Thank you Iñigo :)\n\nvec3 calcNormal_8_1(vec3 pos, float eps) {\n  const vec3 v1 = vec3( 1.0,-1.0,-1.0);\n  const vec3 v2 = vec3(-1.0,-1.0, 1.0);\n  const vec3 v3 = vec3(-1.0, 1.0,-1.0);\n  const vec3 v4 = vec3( 1.0, 1.0, 1.0);\n\n  return normalize( v1 * doModel( pos + v1*eps ).x +\n                    v2 * doModel( pos + v2*eps ).x +\n                    v3 * doModel( pos + v3*eps ).x +\n                    v4 * doModel( pos + v4*eps ).x );\n}\n\nvec3 calcNormal_8_1(vec3 pos) {\n  return calcNormal_8_1(pos, 0.002);\n}\n\n\n\nfloat orenNayarDiffuse_9_2(\n  vec3 lightDirection,\n  vec3 viewDirection,\n  vec3 surfaceNormal,\n  float roughness,\n  float albedo) {\n  \n  float LdotV = dot(lightDirection, viewDirection);\n  float NdotL = dot(lightDirection, surfaceNormal);\n  float NdotV = dot(surfaceNormal, viewDirection);\n\n  float s = LdotV - NdotL * NdotV;\n  float t = mix(1.0, max(NdotL, NdotV), step(0.0, s));\n\n  float sigma2 = roughness * roughness;\n  float A = 1.0 + sigma2 * (albedo / (sigma2 + 0.13) + 0.5 / (sigma2 + 0.33));\n  float B = 0.45 * sigma2 / (sigma2 + 0.09);\n\n  return albedo * max(0.0, NdotL) * (A + B * s / t) / 3.14159265;\n}\n\n\nfloat gaussianSpecular_10_3(\n  vec3 lightDirection,\n  vec3 viewDirection,\n  vec3 surfaceNormal,\n  float shininess) {\n  vec3 H = normalize(lightDirection + viewDirection);\n  float theta = acos(dot(H, surfaceNormal));\n  float w = theta / shininess;\n  return exp(-w*w);\n}\n\n\nvec2 squareFrame_12_4(vec2 screenSize) {\n  vec2 position = 2.0 * (gl_FragCoord.xy / screenSize.xy) - 1.0;\n  position.x *= screenSize.x / screenSize.y;\n  return position;\n}\n\nvec2 squareFrame_12_4(vec2 screenSize, vec2 coord) {\n  vec2 position = 2.0 * (coord.xy / screenSize.xy) - 1.0;\n  position.x *= screenSize.x / screenSize.y;\n  return position;\n}\n\n\n\nmat3 calcLookAtMatrix_14_5(vec3 origin, vec3 target, float roll) {\n  vec3 rr = vec3(sin(roll), cos(roll), 0.0);\n  vec3 ww = normalize(target - origin);\n  vec3 uu = normalize(cross(ww, rr));\n  vec3 vv = normalize(cross(uu, ww));\n\n  return mat3(uu, vv, ww);\n}\n\n\n\n\nvec3 getRay_13_6(mat3 camMat, vec2 screenPos, float lensLength) {\n  return normalize(camMat * vec3(screenPos, lensLength));\n}\n\nvec3 getRay_13_6(vec3 origin, vec3 target, vec2 screenPos, float lensLength) {\n  mat3 camMat = calcLookAtMatrix_14_5(origin, target, 0.0);\n  return getRay_13_6(camMat, screenPos, lensLength);\n}\n\n\n\n\nvoid orbitCamera_11_7(\n  in float camAngle,\n  in float camHeight,\n  in float camDistance,\n  in vec2 screenResolution,\n  out vec3 rayOrigin,\n  out vec3 rayDirection\n) {\n  vec2 screenPos = squareFrame_12_4(screenResolution);\n  vec3 rayTarget = vec3(0.0);\n\n  rayOrigin = vec3(\n    camDistance * sin(camAngle),\n    camHeight,\n    camDistance * cos(camAngle)\n  );\n\n  rayDirection = getRay_13_6(rayOrigin, rayTarget, screenPos, 2.0);\n}\n\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_1_8(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nfloat mod289_1_8(float x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nvec4 permute_1_9(vec4 x) {\n     return mod289_1_8(((x*34.0)+1.0)*x);\n}\n\nfloat permute_1_9(float x) {\n     return mod289_1_8(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_10(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt_1_10(float r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4_1_11(float j, vec4 ip)\n  {\n  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n  vec4 p,s;\n\n  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n  s = vec4(lessThan(p, vec4(0.0)));\n  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n  return p;\n  }\n\n// (sqrt(5) - 1)/4 = F4, used once below\n#define F4 0.309016994374947451\n\nfloat snoise_1_12(vec4 v)\n  {\n  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\n                        0.276393202250021,  // 2 * G4\n                        0.414589803375032,  // 3 * G4\n                       -0.447213595499958); // -1 + 4 * G4\n\n// First corner\n  vec4 i  = floor(v + dot(v, vec4(F4)) );\n  vec4 x0 = v -   i + dot(i, C.xxxx);\n\n// Other corners\n\n// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\n  vec4 i0;\n  vec3 isX = step( x0.yzw, x0.xxx );\n  vec3 isYZ = step( x0.zww, x0.yyz );\n//  i0.x = dot( isX, vec3( 1.0 ) );\n  i0.x = isX.x + isX.y + isX.z;\n  i0.yzw = 1.0 - isX;\n//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\n  i0.y += isYZ.x + isYZ.y;\n  i0.zw += 1.0 - isYZ.xy;\n  i0.z += isYZ.z;\n  i0.w += 1.0 - isYZ.z;\n\n  // i0 now contains the unique values 0,1,2,3 in each channel\n  vec4 i3 = clamp( i0, 0.0, 1.0 );\n  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n  //  x0 = x0 - 0.0 + 0.0 * C.xxxx\n  //  x1 = x0 - i1  + 1.0 * C.xxxx\n  //  x2 = x0 - i2  + 2.0 * C.xxxx\n  //  x3 = x0 - i3  + 3.0 * C.xxxx\n  //  x4 = x0 - 1.0 + 4.0 * C.xxxx\n  vec4 x1 = x0 - i1 + C.xxxx;\n  vec4 x2 = x0 - i2 + C.yyyy;\n  vec4 x3 = x0 - i3 + C.zzzz;\n  vec4 x4 = x0 + C.wwww;\n\n// Permutations\n  i = mod289_1_8(i);\n  float j0 = permute_1_9( permute_1_9( permute_1_9( permute_1_9(i.w) + i.z) + i.y) + i.x);\n  vec4 j1 = permute_1_9( permute_1_9( permute_1_9( permute_1_9 (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\n// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n  vec4 p0_1_13 = grad4_1_11(j0,   ip);\n  vec4 p1 = grad4_1_11(j1.x, ip);\n  vec4 p2 = grad4_1_11(j1.y, ip);\n  vec4 p3 = grad4_1_11(j1.z, ip);\n  vec4 p4 = grad4_1_11(j1.w, ip);\n\n// Normalise gradients\n  vec4 norm = taylorInvSqrt_1_10(vec4(dot(p0_1_13,p0_1_13), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_13 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  p4 *= taylorInvSqrt_1_10(dot(p4,p4));\n\n// Mix contributions from the five corners\n  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\n  m0 = m0 * m0;\n  m1 = m1 * m1;\n  return 49.0 * ( dot(m0*m0, vec3( dot( p0_1_13, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n\n  }\n\n\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_2_14(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_2_14(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_2_15(vec3 x) {\n  return mod289_2_14(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_2_16(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_2_14(i); // Avoid truncation effects in permutation\n  vec3 p = permute_2_15( permute_2_15( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_5_17(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_5_17(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_5_18(vec4 x) {\n     return mod289_5_17(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_5_19(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_5_20(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_5_21 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_5_22 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_5_22;\n  vec3 i1 = min( g_5_22.xyz, l.zxy );\n  vec3 i2 = max( g_5_22.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_5_21.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_5_17(i);\n  vec4 p = permute_5_18( permute_5_18( permute_5_18(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_5_21.wyz - D_5_21.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_5_23 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_5_24 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_5_23.xy,h.z);\n  vec3 p3 = vec3(a1_5_23.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_5_19(vec4(dot(p0_5_24,p0_5_24), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_5_24 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_5_24,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nfloat fbm3d_3_25(vec3 x, const in int it) {\n    float v = 0.0;\n    float a = 0.5;\n    vec3 shift = vec3(100);\n\n    \n    for (int i = 0; i < 32; ++i) {\n        if(i<it) {\n            v += a * snoise_5_20(x);\n            x = x * 2.0 + shift;\n            a *= 0.5;\n        }\n    }\n    return v;\n}\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_6_26(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nfloat mod289_6_26(float x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nvec4 permute_6_27(vec4 x) {\n     return mod289_6_26(((x*34.0)+1.0)*x);\n}\n\nfloat permute_6_27(float x) {\n     return mod289_6_26(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_6_28(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt_6_28(float r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4_6_29(float j, vec4 ip)\n  {\n  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n  vec4 p,s;\n\n  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n  s = vec4(lessThan(p, vec4(0.0)));\n  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n  return p;\n  }\n\n// (sqrt(5) - 1)/4 = F4, used once below\n#define F4 0.309016994374947451\n\nfloat snoise_6_30(vec4 v)\n  {\n  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\n                        0.276393202250021,  // 2 * G4\n                        0.414589803375032,  // 3 * G4\n                       -0.447213595499958); // -1 + 4 * G4\n\n// First corner\n  vec4 i  = floor(v + dot(v, vec4(F4)) );\n  vec4 x0 = v -   i + dot(i, C.xxxx);\n\n// Other corners\n\n// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\n  vec4 i0;\n  vec3 isX = step( x0.yzw, x0.xxx );\n  vec3 isYZ = step( x0.zww, x0.yyz );\n//  i0.x = dot( isX, vec3( 1.0 ) );\n  i0.x = isX.x + isX.y + isX.z;\n  i0.yzw = 1.0 - isX;\n//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\n  i0.y += isYZ.x + isYZ.y;\n  i0.zw += 1.0 - isYZ.xy;\n  i0.z += isYZ.z;\n  i0.w += 1.0 - isYZ.z;\n\n  // i0 now contains the unique values 0,1,2,3 in each channel\n  vec4 i3 = clamp( i0, 0.0, 1.0 );\n  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n  //  x0 = x0 - 0.0 + 0.0 * C.xxxx\n  //  x1 = x0 - i1  + 1.0 * C.xxxx\n  //  x2 = x0 - i2  + 2.0 * C.xxxx\n  //  x3 = x0 - i3  + 3.0 * C.xxxx\n  //  x4 = x0 - 1.0 + 4.0 * C.xxxx\n  vec4 x1 = x0 - i1 + C.xxxx;\n  vec4 x2 = x0 - i2 + C.yyyy;\n  vec4 x3 = x0 - i3 + C.zzzz;\n  vec4 x4 = x0 + C.wwww;\n\n// Permutations\n  i = mod289_6_26(i);\n  float j0 = permute_6_27( permute_6_27( permute_6_27( permute_6_27(i.w) + i.z) + i.y) + i.x);\n  vec4 j1 = permute_6_27( permute_6_27( permute_6_27( permute_6_27 (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\n// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n  vec4 p0_6_31 = grad4_6_29(j0,   ip);\n  vec4 p1 = grad4_6_29(j1.x, ip);\n  vec4 p2 = grad4_6_29(j1.y, ip);\n  vec4 p3 = grad4_6_29(j1.z, ip);\n  vec4 p4 = grad4_6_29(j1.w, ip);\n\n// Normalise gradients\n  vec4 norm = taylorInvSqrt_6_28(vec4(dot(p0_6_31,p0_6_31), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_6_31 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  p4 *= taylorInvSqrt_6_28(dot(p4,p4));\n\n// Mix contributions from the five corners\n  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\n  m0 = m0 * m0;\n  m1 = m1 * m1;\n  return 49.0 * ( dot(m0*m0, vec3( dot( p0_6_31, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n\n  }\n\n\n\n\nfloat fbm4d_4_32(vec4 x, const in int it) {\n    float v = 0.0;\n    float a = 0.5;\n    vec4 shift = vec4(100);\n    \n    for (int i = 0; i < 32; ++i) {\n        if(i<it) {\n            v += a * snoise_6_30(x);\n            x = x * 2.0 + shift;\n            a *= 0.5;\n        }\n    }\n    return v;\n}\n\n\n\n// #pragma glslify: noise3d = require('glsl-noise/simplex/3d')\n\n// #pragma glslify: noise4d = require(glsl-noise/simplex/4d)\n\n\nvec2 doModel(vec3 p) {\n  // p.x -=(( mouse.x/resolution.x ) - 0.5)*4.0;\n  // p.y -=(( mouse.y/resolution.y ) - 0.5)*4.0;\n  \n  float r  = 1.0 + snoise_1_12(vec4(p, t)) * 0.35;\n  // float r  = 1.5 + fbm4d(vec4(p,t*0.1), 9) * 0.45;\n  \n  // r*=sin(t)*mouse.x;\n  \n  float d  = length(p) - r;\n  // float wall = (p.y + 1.0 + noise3d(vec3(p.xz*0.9,t))*0.2 )- length(p.zy);\n\n  // d = min(wall, d);\n  // d = max(-p.y, d);\n  \n  float id = 0.0;\n  d += fbm4d_4_32(vec4(p,t),7)*0.2;\n  return vec2(d, id);\n}\n\nvec3 lighting(vec3 pos, vec3 nor, vec3 ro, vec3 rd) {\n  vec3 dir1 = normalize(vec3(0, 1, 0));\n  vec3 col1 = vec3(3.0, 0.7, 0.4);\n  vec3 dif1 = col1 * orenNayarDiffuse_9_2(dir1, -rd, nor, 0.15, 1.0);\n  vec3 spc1 = col1 * gaussianSpecular_10_3(dir1, -rd, nor, 0.15);\n\n  vec3 dir2 = normalize(vec3(0.4, -1, 0.4));\n  vec3 col2 = vec3(0.4, 0.4, 0.9);\n  vec3 dif2 = col2 * orenNayarDiffuse_9_2(dir2, -rd, nor, 0.15, 1.0);\n  vec3 spc2 = col2 * gaussianSpecular_10_3(dir2, -rd, nor, 0.15);\n\n  return dif1 + spc1 + dif2 + spc2;\n}\n\nvoid main() {\n  vec3 color = vec3(0.0);\n  vec3 ro, rd;\n\n  float rotation = 0.;\n  float height   = 2.5;\n  float dist     = 4.0;\n  orbitCamera_11_7(rotation, height, dist, resolution, ro, rd);\n  bool touched = false;\n  vec2 tr = calcRayIntersection_7_0(ro, rd);\n  if (tr.x > -0.5) {\n    vec3 pos = ro + rd * tr.x;\n    vec3 nor = calcNormal_8_1(pos);\n\n    color = lighting(pos, nor, ro, rd);\n    touched = true;\n  }\n\n  // gamma correction\n  color = pow(color, vec3(0.5545));\n  \n  \n  // float a = noise3d( vec3(uv*20.,t*0.1) ) * PI*2.;\n  // vec4 sample = texture2D(texture, uv + vec2( (cos(a)*3.0)/resolution.x, (sin(a)*3.0)/resolution.y ));\n  \n  // if(length(sample)>1.6){\n    // color = vec3(1.0,0.1,0.1);\n    // color = color*0.5 + sample.rgb*0.5;\n  // }\n  // vec4 back = texture2D(texture, uv+(vec2(0.0, 3./resolution.y)));\n  if(!touched){\n    // color = sample.rgb;\n  }\n  // gl_FragColor.rgb = curlNoise(vec3(uv * 15.,t));\n  // gl_FragColor = vec4(1.0)* fbm4d(vec4(uv*2.0,t,1.0), 3);\n  gl_FragColor.rgb = color;\n  gl_FragColor.a   = 1.0;\n}"

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n#define GLSLIFY 1\nattribute vec2 position;\nvarying vec2 uv;\nvoid main () {\n  uv = position;\n  gl_Position = vec4(2.0 * position - 1.0, 0, 1);\n}"

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map