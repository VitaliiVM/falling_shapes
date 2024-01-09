import ShapeUtils from './ShapeUtils.js';
import FallingShape from './FallingShape.js';

class Main {
    static init() {
        Main.app = new PIXI.Application({
            width: 300,
            height: 300,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
        });

        document.body.appendChild(Main.app.view);

        Main.shapes = [];
        Main.shapesPerSecond = 1;
        Main.gravity = 1;

        document.getElementById('minusShapesPerSecond').addEventListener('click', () => Main.changeShapesPerSecond(-1));
        document.getElementById('plusShapesPerSecond').addEventListener('click', () => Main.changeShapesPerSecond(1));
        document.getElementById('minusGravity').addEventListener('click', () => Main.changeGravity(-1));
        document.getElementById('plusGravity').addEventListener('click', () => Main.changeGravity(1));

        Main.shapesInterval = setInterval(Main.generateRandomShape, 2000 / Main.shapesPerSecond);
        Main.app.ticker.add(Main.update);
    }

    static generateRandomShape() {
        let shapeType = Math.floor(Math.random() * 3);
        let shapeColor = Math.random() * 0xFFFFFF;

        let shape = new FallingShape(
            Math.random() * Main.app.screen.width,
            50,
            Main.getShapeType(shapeType),
            shapeColor
        );

        Main.app.stage.addChild(shape.shape);
        Main.shapes.push(shape);
    }

    static update() {
        for (let i = 0; i < Main.shapes.length; i++) {
            Main.shapes[i].shape.y += Main.gravity;
            if (Main.shapes[i].shape.y > Main.app.screen.height) {
                Main.shapes[i].shape.y = -50;
                Main.shapes[i].shape.visible = true;
            }
        }

        Main.updateTextFields();
    }

    static updateTextFields() {
        let visibleShapes = Main.shapes.filter(shape => shape.shape.visible);
        document.getElementById('numberOfShapes').innerText = String(visibleShapes.length);
        let totalSurfaceArea = ShapeUtils.calculateTotalSurfaceArea(visibleShapes);
        document.getElementById('surfaceArea').innerText = `${totalSurfaceArea.toFixed(2)}`;
    }

    static changeShapesPerSecond(amount) {
        Main.shapesPerSecond += amount;
        Main.shapesPerSecond = Math.max(1, Main.shapesPerSecond);
        document.getElementById('shapesPerSecond').innerText = Main.shapesPerSecond;
        clearInterval(Main.shapesInterval);
        Main.shapesInterval = setInterval(Main.generateRandomShape, 2000 / Main.shapesPerSecond);
    }

    static changeGravity(amount) {
        Main.gravity += amount;
        Main.gravity = Math.max(1, Main.gravity);
        document.getElementById('gravityValue').innerText = Main.gravity;
    }

    static getShapeType(type) {
        const shapeTypeMap = {
            0: 'triangle',
            1: 'rectangle',
            2: 'pentagon',
            default: 'rectangle',
        };
        return shapeTypeMap[type] || shapeTypeMap.default;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Main.init();
});
