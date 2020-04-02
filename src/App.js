import React from 'react';
import WebGL from './webgl-react';

const App = () => {
    const data = {
        vertices: [
            // Front face
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,

            // Back face
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,
        ],
        values: [
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

    const config = {
        backgroundColor: [0.9, 0.9, 0.9, 1.0],
        strokeWidth: 3,
        defaultSegmentColor: [0.0, 0.0, 0.0, 1.0],
        resolution: 10,
    };

    return (
        <div
            style={{
                width: '900px',
                height: '600px',
            }}
        >
            <WebGL.WebGLView2d
                data={data}
                config={config}
            />
        </div>
    );
}

export default App;
