export default class ShapeUtils {
    static calculateTotalSurfaceArea(shapes) {
        let totalArea = 0;

        for (let i = 0; i < shapes.length; i++) {
            totalArea += ShapeUtils.calculateShapeArea(shapes[i]);
        }

        return totalArea;
    }

    static calculateShapeArea(shape) {
        return shape.shape.visible ? 2500 : 0;
    }
}
