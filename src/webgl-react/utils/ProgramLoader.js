//
// Initialize a shader program, so WebGL knows how to draw our data
//
export const createShaderProgram = (
    glContext,
    vsSource,
    fsSource,
) => {
    const vertexShader = loadShader(glContext, glContext.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(glContext, glContext.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    const shaderProgram = glContext.createProgram();
    glContext.attachShader(shaderProgram, vertexShader);
    glContext.attachShader(shaderProgram, fragmentShader);
    glContext.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!glContext.getProgramParameter(shaderProgram, glContext.LINK_STATUS)) {
        throw new Error('Unable to initialize the shader program: ' + glContext.getProgramInfoLog(shaderProgram));
    }

    return shaderProgram;
};

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
export const loadShader = (
    glContext,
    type,
    source
) => {
    const shader = glContext.createShader(type);

    // Send the source to the shader object
    glContext.shaderSource(shader, source);

    // Compile the shader program
    glContext.compileShader(shader);

    // See if it compiled successfully
    if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        glContext.deleteShader(shader);
        throw new Error('An error occurred compiling the shaders: ' + glContext.getShaderInfoLog(shader));
    }

    return shader;
}