import ProgramLoader from '../shaderLoaders';
import { initIndicesBuffer, initBuffer } from '../utils/BufferLoader';

const drawColoredSegments = ({
    glContext,
    projectionMatrix,
    modelViewMatrix,
    data: {
        vertices,
        values,
        segments,
    },
    strokeWidth,
    onError,
}) => {
    try {
        const programInfo = ProgramLoader.colored(glContext);

        glContext.useProgram(programInfo.program);
    
        glContext.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix,
        );
        
        glContext.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix,
        );
    
        glContext.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition,
        );
        
        glContext.enableVertexAttribArray(
            programInfo.attribLocations.vertexColor,
        );
    
        const positionBuffer = initBuffer(glContext, vertices);
        glContext.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            3, /* two values per iteration */
            glContext.FLOAT, /* number type */
            false, /* not to normalize */
            0, /* 0: use type and components */
            0, /* 0: bytes to skip */
        );
        
        const colorBuffer = initBuffer(glContext, values);
        glContext.vertexAttribPointer(
            programInfo.attribLocations.vertexColor,
            4, /* two values per iteration */
            glContext.FLOAT, /* number type */
            false, /* not to normalize */
            0, /* 0: use type and components */
            0, /* 0: bytes to skip */
        );
    
        const segmentsBuffer = initIndicesBuffer(glContext, segments);
        strokeWidth && glContext.lineWidth(strokeWidth);
        glContext.drawElements(
            glContext.LINES,
            segments.length, /* vertexCount */
            glContext.UNSIGNED_SHORT, /* offset, vertices to skip */
            0, /* offset, vertices to skip */
        );
    } catch (error) {
        onError(error);
    }
}

export default {
    renderer: drawColoredSegments,
};
