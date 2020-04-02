
export const getRecBoundaries = data => {
    let boundaries = {
        x: { min: data.vertices[0], max: data.vertices[0], center: undefined, length: undefined },
        y: { min: data.vertices[1], max: data.vertices[1], center: undefined, length: undefined },
        z: { min: data.vertices[2], max: data.vertices[2], center: undefined, length: undefined },
        radius: undefined,
    };

    boundaries = data.vertices.reduce((acc, coordinate, index) => {
        if (index % 3 === 0) { /* x coordinate case */
            if (coordinate < acc.x.min) {
                acc.x.min = coordinate;
            }
            if (coordinate > acc.x.max) {
                acc.x.max = coordinate;
            }
        }
        if (index % 3 === 1) { /* y coordinate case */
            if (coordinate < acc.y.min) {
                acc.y.min = coordinate;
            }
            if (coordinate > acc.y.max) {
                acc.y.max = coordinate;
            }
        }
        if (index % 3 === 2) { /* z coordinate case */
            if (coordinate < acc.z.min) {
                acc.z.min = coordinate;
            }
            if (coordinate > acc.z.max) {
                acc.z.max = coordinate;
            }
        }
        return acc;
    }, boundaries);

    boundaries.x.center = (boundaries.x.min + boundaries.x.max) / 2.0;
    boundaries.y.center = (boundaries.y.min + boundaries.y.max) / 2.0;
    boundaries.z.center = (boundaries.z.min + boundaries.z.max) / 2.0;

    boundaries.x.length = boundaries.x.max - boundaries.x.min;
    boundaries.y.length = boundaries.y.max - boundaries.y.min;
    boundaries.z.length = boundaries.z.max - boundaries.z.min;

    boundaries.radius = (boundaries.x.length + boundaries.y.length) / 2.0;

    return boundaries;
};