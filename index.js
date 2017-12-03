/*
  tags: basic

  <p> This example is a simple demonstration of how to use regl to draw a triangle. </p>
 */

// The default method exposed by the module wraps a canvas element
const regl = require('regl')()
const fragmentShader = require('./fragment.glsl');
const vertexShader = require('./vertex.glsl');

// This clears the color buffer to black and the depth buffer to 1
regl.clear({
  color: [0, 0, 0, 1],
  depth: 1
})

// In regl, draw operations are specified declaratively using. Each JSON
// command is a complete description of all state. This removes the need to
// .bind() things like buffers or shaders. All the boilerplate of setting up
// and tearing down state is automated.
regl({

  // In a draw call, we can pass the shader source code to regl
  frag: fragmentShader,
  vert: vertexShader,
  attributes: {
    position: [
      [-1, 0],
      [0, -1],
      [1, 1]
    ]
  },

  uniforms: {
    color: [1, 0, 0, 1]
  },

  count: 3
})()