export const initBuffer = (
    gl, 
    data,
) => {
    // Create a buffer for the square's positions.
    const buffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(
        gl.ARRAY_BUFFER, 
        buffer,
    );

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(data),
        gl.STREAM_DRAW,
    );

    return buffer;
};

export const initIndicesBuffer = (
    gl, 
    data,
) => {
   // Create a buffer for the square's positions.
   const buffer = gl.createBuffer();

   // Select the positionBuffer as the one to apply buffer
   // operations to from here out.
   gl.bindBuffer(
       gl.ELEMENT_ARRAY_BUFFER, 
       buffer,
   );

   // Now pass the list of positions into WebGL to build the
   // shape. We do this by creating a Float32Array from the
   // JavaScript array, then use it to fill the current buffer.
   gl.bufferData(
       gl.ELEMENT_ARRAY_BUFFER,
       new Uint16Array(data),
       gl.STREAM_DRAW,
   );

   return buffer;
}
