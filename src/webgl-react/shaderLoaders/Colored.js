import { createShaderProgram } from '../utils/ProgramLoader';

/**
* Default vertex shader source
*/
const coloredVertexShaderSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
    }`;

/**
* Default fragment shader source
*/
const coloredFragmentShaderSource = `
    varying lowp vec4 vColor;

    void main(void) {
        gl_FragColor = vColor;
    }`;


/**
 * Create a program that draws segments that are colored by vertexes
 * @param {*} glContext Instace of a WebGLRenderingContext
 */
export const createColoredSegmentsRender = (
    glContext,
) => {
    const program = createShaderProgram (
        glContext,
        coloredVertexShaderSource,
        coloredFragmentShaderSource,
    );
    
    return {
        program,
        attribLocations: {
            vertexPosition: glContext.getAttribLocation(program, 'aVertexPosition'),
            vertexColor: glContext.getAttribLocation(program, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: glContext.getUniformLocation(program, 'uProjectionMatrix'),
            modelViewMatrix: glContext.getUniformLocation(program, 'uModelViewMatrix'),
        },
    };
};
