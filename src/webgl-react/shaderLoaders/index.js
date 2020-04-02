import { createSingleColorSegmentsRender } from './SingleColor';
import { createColoredSegmentsRender } from './Colored';

export default {
    colored: createColoredSegmentsRender,
    singleColor: createSingleColorSegmentsRender,
};
