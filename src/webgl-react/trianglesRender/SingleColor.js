import ProgramLoader from '../shaderLoaders';
import { initBuffer, initIndicesBuffer } from '../utils/BufferLoader';

const drawSingleColorTriangles = ({
    glContext,
    projectionMatrix,
    modelViewMatrix,
    data: {
        vertices,
        triangles,
    },
    defaultColor,
    onError,
}) => {
    try {
        const programInfo = ProgramLoader.singleColor(
            glContext, 
            defaultColor,
        );
        glContext.useProgram(programInfo.program);
    
        glContext.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix, /* setting projectionMatrix */
        );
        
        glContext.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix, /* setting modelViewMatrix */
        );
    
        glContext.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
        
        const positionBuffer = initBuffer(glContext, vertices);
        glContext.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            3, /* three values per iteration: 3 dimensions for each vertex */
            glContext.FLOAT, /* number type */
            false, /* not to normalize */
            0, /* 0: use type and components */
            0, /* 0: bytes to skip */
            );
            
        const segmentsBuffer = initIndicesBuffer(glContext, triangles);
        
        glContext.drawElements(
            glContext.TRIANGLES,
            triangles.length, /* vertexCount */
            glContext.UNSIGNED_SHORT, /* offset, vertices to skip */
            0, /* offset, vertices to skip */
        );
    } catch (error) {
        onError(error);
    }
};

export default {
    renderer: drawSingleColorTriangles,
};
