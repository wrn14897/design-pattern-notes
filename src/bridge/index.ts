// bridge
interface Renderer {
  renderCircle: (radius: number) => void;
}

class VectorRenderer implements Renderer {
  renderCircle(radius: number) {
    console.log(`Drawing a circle of radius: ${radius}`);
  }
}

class RasterRenderer implements Renderer {
  renderCircle(radius: number) {
    console.log(`Drawing pixels for a circle of radius: ${radius}`);
  }
}

class Circle {
  private readonly renderer: Renderer;

  private radius: number;

  constructor(renderer: Renderer, radius: number) {
    this.renderer = renderer;
    this.radius = radius;
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor: number) {
    this.radius *= factor;
  }
}

const renderer = new RasterRenderer();
const newCircle = new Circle(renderer, 2);

newCircle.draw();
newCircle.resize(2);
newCircle.draw();
