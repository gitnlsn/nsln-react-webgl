# Description

This package is a React Component that uses WebGL to draw structured meshes over the Canvas.

# Usage - WebGLView2D

1. Have the structured data to display in WebGL format
2. Specify rendering evironment configurations
3. Include as a React component

## Data

The data is a JSON object with the following attributes.

The `vertices` property is an floating point number array, where every three numbers define coordinates of a vertex. Vertices are defined in 3D coordinates. 

> Set z=0 for each vertex, to in a single plane.

The `segments` property is a integer number array, where every two numbers define the indices of the vertices that compose the segment.

The `triangles` property is a integer number array, where every three numbers define the indices of the vertices that compose the triangle.

The `values` property is a floating point number array, where every four numbers define a RGBA value. Each color match the vertex in the same order they are defined.

The following example draws a unit cube with colors.

```Javascript
const data = {
    vertices: [
        /* Vertices at front */
        -1.0, -1.0, 1.0, /* 0-th vertex */
        1.0, -1.0, 1.0, /* 1-th vertex */
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,

        /* Vertices at back */
        -1.0, -1.0, -1.0, /* 4-th vertex */
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0, /* 7-th vertex */

    ],
    values: [ 
        /* rgba as floating value */
        0.0, 1.0, 1.0, 1.0,    // green
        1.0, 0.0, 0.0, 1.0,    // red
        0.0, 1.0, 0.0, 1.0,    // green
        0.0, 0.0, 1.0, 1.0,    // blue

        0.0, 1.0, 1.0, 1.0,    // green
        1.0, 0.0, 0.0, 1.0,    // red
        0.0, 1.0, 0.0, 1.0,    // green
        0.0, 0.0, 1.0, 1.0,    // blue
    ],
    triangles: [
        // front
        0, 1, 2,
        0, 2, 3,

        // back
        4, 5, 6,
        4, 6, 7,

        // top
        2, 3, 5,
        2, 5, 6,

        // bottom
        0, 1, 7,
        4, 7, 0,

        // right
        1, 2, 6,
        6, 7, 1,

        // left
        0, 3, 4,
        4, 5, 3,
    ],
    segments: [
        // front
        0, 1, 1, 2, 2, 0,
        0, 2, 2, 3, 3, 0,

        // back
        4, 5, 5, 6, 6, 4,
        4, 6, 6, 7, 7, 4,

        // top
        2, 3, 3, 5, 5, 2,
        2, 5, 5, 6, 6, 2,

        // bottom
        0, 1, 1, 7, 7, 0,
        4, 7, 7, 0, 0, 4,

        // right
        1, 2, 2, 6, 6, 1,
        6, 7, 7, 1, 1, 6,

        // left
        0, 3, 3, 4, 4, 0,
        4, 5, 5, 3, 3, 4,
    ],
};
```

> Note: to draw triangles only, hide segments; provide vertices, triangles and values.

> Note: to draw segments only, hide triangles and values; provide vertices and segments.

## Config

The configuration is a JSON object composed of the following properties.

A `backgroundColor` property which specifies the color rendered at the background of the canvas.

A `strokeWidth` property which specifies the stroke width of the segments drawn to define boundaries of triangles. It is defined in canvas pixels. The more the resolution, the thinner they are.

A `defaultSegmentColor` property which specifies the color of the segments drawn to define boudaries of triangles.

A `resolution` property which species ratio of the canvas size over the window viewport. Canvas default size 1 is to match the the browser window with full viewport size (100vw,100vv).

```Javascript
const config = {
    backgroundColor: [0.9, 0.9, 0.9, 1.0],
    strokeWidth: 5,
    defaultSegmentColor: [0.0, 0.0, 0.0, 1.0],
    resolution: 2,
};
```

## Rendering the component

```Javascript
import GL from 'nlsn-react-webgl';

const App = () => (
    <GL.WebGLView2d
        data={data}
        config={config}
        onError={error => console.log(error)}
    />
);
```
