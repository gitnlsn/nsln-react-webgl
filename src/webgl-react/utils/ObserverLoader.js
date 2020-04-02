import { mat4 } from 'gl-matrix';

export const createProjectionMatrix = ({
    fieldOfView,
    aspect,
    zNear,
    zFar,
}) => {
    const projectionMatrix = mat4.create();

    mat4.perspective(
        projectionMatrix,
        fieldOfView || 45 * Math.PI / 180,
        aspect,
        zNear || 0.1,
        zFar || 100,
    );

    return projectionMatrix;
};

export const createModelViewMatrix = params => {
    const modelViewMatrix = mat4.create();
    
    params.forEach(param => {
        switch (param.action) {
            case 'translate':
                mat4.translate(
                    modelViewMatrix,
                    modelViewMatrix,
                    param.values.delta,
                );
                break;
            case 'rotate':
                mat4.rotate(
                    modelViewMatrix,
                    modelViewMatrix,
                    param.values.delta,
                    param.values.axis,
                );
                break;
            /* TODO: extend rotation case */
            default: 
                break;
        }
    });

    return modelViewMatrix;
}