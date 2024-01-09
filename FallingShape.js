export default class FallingShape {
    constructor(x, y, type, color) {
        this.shape = new PIXI.Graphics();
        this.shape.beginFill(color);
        this.generateShape(type);
        this.shape.x = x;
        this.shape.y = y;
        this.shape.interactive = true;
        this.shape.buttonMode = true;
        this.shape.on('pointerdown', this.handleClick.bind(this));
    }

    generateShape(type) {
        const shapeDrawers = {
            triangle: () => this.drawTriangle(),
            rectangle: () => this.drawRect(),
            pentagon: () => this.drawPolygon(5, 25),
        };

        if (shapeDrawers[type]) {
            shapeDrawers[type]();
        } else {
            console.error(`Unknown shape type: ${type}`);
        }
    }

    drawTriangle() {
        this.shape.moveTo(25, 0);
        this.shape.lineTo(50, 50);
        this.shape.lineTo(0, 50);
        this.shape.lineTo(25, 0);
    }

    drawRect() {
        this.shape.drawRect(0, 0, 50, 50);
    }

    drawPolygon(sides, size) {
        const angleStep = (Math.PI * 2) / sides;
        for (let i = 0; i < sides; i++) {
            const angle = angleStep * i;
            const x = Math.cos(angle) * size + 25;
            const y = Math.sin(angle) * size + 25;
            if (i === 0) {
                this.shape.moveTo(x, y);
            } else {
                this.shape.lineTo(x, y);
            }
        }
        this.shape.lineTo(Math.cos(0) * size + 25, Math.sin(0) * size + 25);
    }

    handleClick() {
        this.shape.visible = false;
    }
}
