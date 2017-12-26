/*
  tags: basic

  <p> This example is a simple demonstration of how to use regl to draw a triangle. </p>
 */

// The default method exposed by the module wraps a canvas element
const regl = require('regl')()
const mouse = require('mouse-change')()
const fragmentShader = require('./fragment.glsl');
const vertexShader = require('./vertex.glsl');
const pixels = regl.texture()

// This clears the color buffer to black and the depth buffer to 1
regl.clear({
  color: [0, 0, 0, 1],
  depth: 1
})

// In regl, draw operations are specified declaratively using. Each JSON
// command is a complete description of all state. This removes the need to
// .bind() things like buffers or shaders. All the boilerplate of setting up
// and tearing down state is automated.
const draw = regl({

  // In a draw call, we can pass the shader source code to regl
  frag: fragmentShader,
  vert: vertexShader,
  attributes: {
    position: [
      [-5, 0],
      [10, -5],
      [1, 5]
    ]
  },

  uniforms: {
    u_texture: pixels,
    u_resolution: (context)=>[context.viewportWidth, context.viewportHeight],
    u_mouse: ({pixelRatio, viewportHeight}) => [
      mouse.x * pixelRatio,
      viewportHeight - mouse.y * pixelRatio
    ],
    u_time: ({tick}) => { return 0.01 * tick }
  },

  count: 3
});

regl.frame(({tick}) => {
  regl.clear({
    color: [0, 0, 0, 1]
  })

  draw()
})