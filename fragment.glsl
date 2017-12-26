precision mediump float;
#define PI 3.1415926535897932384626433832795

uniform float u_time; // tick
uniform vec2 u_resolution; // canvas size
uniform vec2 u_mouse; // mouse position

float plot(vec2 pos, float pct){
  return smoothstep(pct-0.005, pct, pos.y) - smoothstep(pct, pct+0.005, pos.y);
}

vec4 when_eq(vec4 x, vec4 y){
  return 1.0 - abs(sign(x - y));
}

void main () {
  vec2 location = (u_mouse - gl_FragCoord.xy) / u_resolution;
  gl_FragColor = vec4(1., location.x, location.y, 1.0);


  vec2 pos = gl_FragCoord.xy/u_resolution;

  vec3 colorA = vec3(1., 1., 1.);
  vec3 colorB = vec3(0., 0., 0.);

  vec3 pct = vec3(pos.x);
  // pct.r = smoothstep(0., 1., pos.x);
  // pct.r = ceil(sin(pos.x/2.)) + floor(sin(pos.x/2.));
  float y = sin(pos.x*10.) * 0.5;
  pct.r  = y;
  float scale = 0.1;
  pct.g = floor(pos.x / scale) * scale;
  // pos.y = ceil(pos.x/2.);
  // pct.b = pow(pos.x, 0.5);
  vec3 color = mix(colorA, colorB, pct);
  color = mix(color, vec3(1., 0., 0.), plot(pos, pct.r));
  color = mix(color, vec3(0., 1.0, 0.), plot(pos, pct.g));
  // color = mix(color, vec3(0., 0., 1.), plot(pos, pct.b));
  gl_FragColor = vec4(color, 1.0);
}