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

vec3 hsb2rgb(vec3 c){
  vec3 m = mod(c.x * 6. + vec3(0., 4., 2.), 6.);
  vec3 val = abs(m - 3.) - 1.;
  vec3 rgb = clamp(val, 0., 1.);

  rgb = rgb * rgb * (3. - 2. * rgb);
  return c.z * mix(vec3(1.), rgb, c.y);
}

float parabola(float x, float k){
  return pow(x, k);
}
void main () {
  vec2 location = (u_mouse - gl_FragCoord.xy) / u_resolution;
  gl_FragColor = vec4(1., location.x, location.y, 1.0);


  vec2 pos = gl_FragCoord.xy/u_resolution;

  // vec3 colorA = vec3(1. * sin(u_time), 0, 0);
  // vec3 colorB = vec3(0, 0, 1. - sin(u_time));

  vec3 pct = vec3(pos.x);
  // pct.r = ceil(sin(pos.x/2.)) + floor(sin(pos.x/2.));
  float oscillations = 1.;
  float scaleSin = 0.5;
  float shiftSin = mod(sin(u_time/1000.), 1.);
  float y = sin(pos.x*PI*oscillations) * scaleSin + shiftSin;
  float scale = 0.125;
  pct.r  = y;
  pct.g = ceil(pos.x / scale) * scale;

  vec2 dir = vec2(0.5) - pos;
  float radius = clamp(length(dir) * 2., 0., 1.);
  float angle = atan(dir.x, dir.y);
  angle = angle / (PI * 2.);
  angle =  parabola(angle, abs(sin(u_time/10.)) * 1.);
  vec3 color = vec3(angle, radius, 1);
  gl_FragColor = vec4(hsb2rgb(color), 1.);
}