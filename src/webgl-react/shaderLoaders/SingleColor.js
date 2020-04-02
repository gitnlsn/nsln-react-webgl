import { createShaderProgram } from '../utils/ProgramLoader';

/**
 * Default vertex shader source
 */
const singleColorVertexShaderSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }`;


/**
 * Default fragment shader source
 *      color must be float array with size 4
 */
const singleColorFragmentShaderSource = colorArray => `
    void main(void) {
        gl_FragColor = vec4(${[...colorArray]});
    }`;

/**
 * Create a program that draws segments all with same color
 */
export const createSingleColorSegmentsRender = (
    glContext,
    segmentsColor,
) => {
    const program = createShaderProgram (
        glContext,
        singleColorVertexShaderSource,
        singleColorFragmentShaderSource(
            segmentsColor 
                ? segmentsColor 
                : [0.0, 0.0, 0.0, 0.5], /* alpha == 0.5 will force half transparency as default */
        ),
    );

    return {
        program,
        attribLocations: {
            vertexPosition: glContext.getAttribLocation(program, 'aVertexPosition'),
        },
        uniformLocations: {
            projectionMatrix: glContext.getUniformLocation(program, 'uProjectionMatrix'),
            modelViewMatrix: glContext.getUniformLocation(program, 'uModelViewMatrix'),
        },
    };
};
