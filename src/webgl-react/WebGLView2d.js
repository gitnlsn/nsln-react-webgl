import React, { useRef } from 'react';
import renderMesh from './DefaulRenderer';
import CanvasProvider from './CanvasProvider';
import { getRecBoundaries } from './utils/Preprocessors';

const WebGLView2d = ({
    data,
    config,
    onError,
}) => {
    const glContextRef = useRef();
    const boundaries = getRecBoundaries(data);
    const observer = {
        projectionMatrix: {
            fieldOfView: 60 * Math.PI / 180,
            zNear: 0.1,
            zFar: 100,
        },
        modelViewMatrix: [
            {
                action: 'translate', values: {
                    delta: [
                        -boundaries.x.center,
                        -boundaries.y.center,
                        -boundaries.radius * 2,
                    ]
                }
            },
            /* TODO: implement rotation at z axis and allow user to choose between rotation and translatoin */
            // { action: 'rotate', values: { delta: 0, axis: [0.0, 0.0, 1.0] } },
        ],
    };

    const translate = (dx, dy, dz) => {
        observer.modelViewMatrix[0].values.delta[0] += dx * 4 / glContextRef.current.canvas.clientWidth;
        observer.modelViewMatrix[0].values.delta[1] -= dy * 4 / glContextRef.current.canvas.clientHeight;
        observer.modelViewMatrix[0].values.delta[2] += dz;
    }

    return (
        <CanvasProvider
            onClick={data => {}}
            resolution={config.resolution}

            /* called when user tries to rotate mouse wheel */
            onWheel={wheelData => {
                translate(0, 0, wheelData.dr);
                renderMesh({
                    glContext: glContextRef.current,
                    observer,
                    data,
                    config,
                });
            }}

            /* called when user drag the canvas */
            onDrag={dragginData => {
                translate(dragginData.dx, dragginData.dy, 0);
                renderMesh({
                    glContext: glContextRef.current,
                    observer,
                    data,
                    config,
                });
            }}

            /* called as soon as WebGlRenderingContext is extracted from canvas */
            onGlContextAvailable={context => {
                renderMesh({
                    glContext: context,
                    observer,
                    data,
                    config,
                });
                glContextRef.current = context;
            }}
            onError={error => onError(error)}
        />
    );
}

export default WebGLView2d;
