import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const CanvasProvider = ({
    onDrag,
    onClick,
    onWheel,
    onGlContextAvailable,
    resolution,
}) => {
    const canvasRef = useRef();
    let dragReference = null;

    useEffect(() => {
        const glContext = canvasRef.current.getContext('webgl');
        onGlContextAvailable(glContext);
    }, [onGlContextAvailable]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                /* width and height will occupy the parent component  */
                width: '100%',
                height: '100%',
            }}

            /* Simple click event */
            onClick={event => onClick({
                x: event.clientX,
                y: event.clientY,
            })}

            /* Mouse wheel up and down */
            onWheel={event => onWheel({
                dr: event.deltaY > 0 ? 1 : -1,
            })}

            /* Draging event composition */
            onMouseDown={(event) => {
                dragReference = {
                    x: event.clientX,
                    y: event.clientY,
                };
            }}
            onMouseUp={() => { dragReference = null; }}
            onMouseOut={() => { dragReference = null; }}
            onMouseMove={event => {
                if (dragReference) {
                    onDrag({
                        dx: event.clientX - dragReference.x,
                        dy: event.clientY - dragReference.y,
                    });
                    dragReference = {
                        x: event.clientX,
                        y: event.clientY,
                    };
                }
            }}

            /* Improved resolution with 5 times bigger than window */
            width={window.innerWidth * resolution}
            height={window.innerHeight * resolution}
        />
    );
};

CanvasProvider.defaultProps = {
    resolution: 1,
}

CanvasProvider.propTypes = {
    onError: PropTypes.func.isRequired,
};

export default CanvasProvider;
