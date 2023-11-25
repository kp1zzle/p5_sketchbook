import * as p5 from "p5";
import QuickSettings from "quicksettings";
// import { P5Capture } from "p5.capture";

// Description: Platform to make pixel art sketches.
// Date: 11/23/23 22:29:32Z

const q = {
    bufWidth: 500,
    bufHeight: 500,
    frameRate: 60,
    kernelSize: 10,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("bufWidth", 0, 100, q.bufWidth, 1,  q);

// P5Capture.setDefaultOptions({
//     format: "mp4",
//     framerate: 60,
//     quality: 0.9,
// });

const sketch = (s: p5) => {
    let shader: p5.Shader = null;
    let buf: p5.Graphics = null;
    let kernel: p5.Graphics = null;


    s.setup = () => {

        s.createCanvas(s.windowWidth, s.windowHeight);
        s.noSmooth();
        buf = s.createGraphics(q.bufWidth, q.bufHeight, s.WEBGL);
        buf.rectMode(s.CENTER);
        buf.noStroke();
        buf.background(255);
        buf.fill(0);
        buf.rect(0, 0, 10);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        shader = buf.createShader(require("./pixel/shaders/painter.vert"), require("./pixel/shaders/painter.frag"));

        kernel = s.createGraphics(q.kernelSize, q.kernelSize);

    };

    const drawKernel = () => {

    };

    s.draw = () => {
        s.frameRate(q.frameRate);
        s.background(0);
        shader.setUniform("u_resolution", [q.bufWidth, q.bufHeight]);
        shader.setUniform("u_pixelArray", buf);
        drawKernel();
        shader.setUniform("u_kernel", buf);
        shader.setUniform("u_kernelResolution", [q.kernelSize, q.kernelSize]);
        shader.setUniform("u_moveUp", s.keyIsDown(87));
        shader.setUniform("u_moveDown", s.keyIsDown(83));
        shader.setUniform("u_moveLeft", s.keyIsDown(65));
        shader.setUniform("u_moveRight", s.keyIsDown(68));
        // buf.clear(0,0,0,0);
        buf.shader(shader);
        buf.rect(0, 0, q.bufWidth, q.bufHeight);

        // Draw in a lower resolution buffer
        s.image(buf, s.width/2 - s.min(s.width, s.height)/2, s.height/2 - s.min(s.width, s.height)/2, s.min(s.width, s.height), s.min(s.width, s.height));
        console.log(s.frameRate());
    };

    s.mouseClicked = () => {
    };

    s.mouseDragged = () => {
    };

    s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
    };

    s.keyPressed = () => {
        if (s.keyCode === s.ESCAPE) {
            settings.toggleVisibility();
        }

        if (s.key === "q") {
            q.frameRate -= 5;
        }

        if (s.key === "e") {
            q.frameRate += 5;
        }

    };

};
new p5(sketch, document.body);