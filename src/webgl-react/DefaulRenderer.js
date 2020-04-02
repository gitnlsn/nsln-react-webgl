import SegmentsRender from './segmentsRender'
import TrianglesRender from './trianglesRender'

import {
    createProjectionMatrix,
    createModelViewMatrix,
} from './utils/ObserverLoader';

const renderMesh = ({
    glContext,
    observer: {
        projectionMatrix: {
            fieldOfView,
            zNear,
            zFar,
        },
        modelViewMatrix: modelViewMatrixParams,
    },
    data: {
        vertices,
        triangles,
        segments,
        values,
    },
    config: {
        backgroundColor,
        defaultSegmentColor,
        strokeWidth,
        grid, /* boolean */
    },
    onError,
}) => {
    const projectionMatrix = createProjectionMatrix({
        fieldOfView,
        /* 
            aspect must be created from glContext canvas size,
            so that width by height ratio prevents distortion
         */
        aspect: glContext.canvas.clientWidth / glContext.canvas.clientHeight,
        zFar,
        zNear,
    });

    const modelViewMatrix = createModelViewMatrix(modelViewMatrixParams);

    glContext.clearColor(...backgroundColor);  // Clear to black, fully opaque
    glContext.clearDepth(1.0);                 // Clear everything
    glContext.enable(glContext.DEPTH_TEST);           // Enable depth testing
    glContext.depthFunc(glContext.LEQUAL);            // Near things obscure far things
    glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);

    if (Array.isArray(triangles)) {
        TrianglesRender.drawColored({
            glContext,
            projectionMatrix,
            modelViewMatrix,
            data: {
                vertices,
                triangles,
                values,
            },
            defaultColor: defaultSegmentColor,
            onError: error => onError(error),
        });
    }

    if (Array.isArray(segments)) {
        SegmentsRender.drawSingleColor({
            glContext,
            projectionMatrix,
            modelViewMatrix,
            data: {
                vertices,
                segments,
                values,
            },
            defaultColor: defaultSegmentColor,
            strokeWidth,
            onError: error => onError(error),
        });
    }

    if (grid) {
        
    }
};

export default renderMesh;