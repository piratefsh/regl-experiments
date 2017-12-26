precision mediump float;
uniform float u_time; // tick
uniform vec2 u_resolution; // canvas size
uniform vec2 u_mouse; // mouse position
const float PI = 3.1415926535897932384626433832795;
float plot(vec2 pos, float pct){
  return smoothstep(pct-0.005, pct, pos.y) - smoothstep(pct, pct+0.005, pos.y);
}
void main () {
  vec2 location = (u_mouse - gl_FragCoord.xy) / u_resolution;
  gl_FragColor = vec4(1., location.x, location.y, 1.0);

  vec2 pos = gl_FragCoord.xy/u_resolution - vec2(0.5, 0.5);
  float y = 0.5 * sin(pos.x * PI * 2.); pow(pos.x, mod(floor(u_time * 10.), 10.));
  vec3 color = vec3(0);

  float pct = plot(pos, y);
  color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 0.0);

  gl_FragColor = vec4(color, 1.0);
}