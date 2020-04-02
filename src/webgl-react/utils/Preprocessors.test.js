import { getRecBoundaries } from './Preprocessors';

describe('Preprocessors', () => {
    describe('getRecBoundaries', () => {
        const data = {
            vertices: [
                -1.1, -1.2, -1.3,
                1.0, 0.0, 0.0,
                0.0, 2.0, 0.0,
                0.0, 0.0, 3.0,
            ],
        };
        it('Should provide expected min through x,y,z', () => {
            const boundaries = getRecBoundaries(data);
            expect(boundaries.x.min).toBeCloseTo(-1.1);
            expect(boundaries.y.min).toBeCloseTo(-1.2);
            expect(boundaries.z.min).toBeCloseTo(-1.3);
        })
        it('Should provide expected max through x,y,z', () => {
            const boundaries = getRecBoundaries(data);
            expect(boundaries.x.max).toBeCloseTo(1.0);
            expect(boundaries.y.max).toBeCloseTo(2.0);
            expect(boundaries.z.max).toBeCloseTo(3.0);
        })
        it('Should provide central values', () => {
            const boundaries = getRecBoundaries(data);
            expect(boundaries.x.center).toBeCloseTo(-0.05);
            expect(boundaries.y.center).toBeCloseTo( 0.40);
            expect(boundaries.z.center).toBeCloseTo( 0.85);
        })
        it('Should provide central values', () => {
            const boundaries = getRecBoundaries(data);
            expect(boundaries.x.length).toBeCloseTo(2.1);
            expect(boundaries.y.length).toBeCloseTo(3.2);
            expect(boundaries.z.length).toBeCloseTo(4.3);
        })
        it('Shoudl provide radius', () => {
            const boundaries = getRecBoundaries(data);
            expect(boundaries.radius).toBeCloseTo(2.65);
        })
    });
});