import * as p5 from "p5";
import QuickSettings from "quicksettings";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {VideoRecorder} from "./helpers/p5.videorecorder";
import {invert} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

// Description: Platform to make pixel art sketches.
// Date: 11/23/23 22:29:32Z

const q = {
    bufWidth: 500,
    bufHeight: 500,
    kernelSize: 10,
    frameMultiplier: 1,
    invert: false
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("bufWidth", 0, 100, q.bufWidth, 1,  q);
settings.bindRange("frameMultiplier", 1, 3, q.frameMultiplier, 1,  q);
settings.addButton("invert", () => {
    q.invert = true;
});


const sketch = (s: p5) => {
    let shader: p5.Shader = null;
    let buf: p5.Graphics = null;
    let kernel: p5.Graphics = null;
    let videoRecorder: any = null;


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

        videoRecorder = new VideoRecorder(s, undefined, "mp4");
        videoRecorder.onFileReady = () => {
            videoRecorder.save(document.title + "_" + (new Date).toISOString());
        };

        settings.addButton("start recording", () => {
            videoRecorder.start();
            settings.hideControl("start recording");
            settings.showControl("stop recording");
        });

        settings.addButton("stop recording", () => {
            videoRecorder.stop();
            settings.hideControl("stop recording");
            settings.showControl("start recording");
        });
        settings.hideControl("stop recording");
        s.frameRate(60);
    };

    const drawKernel = () => {

    };

    s.draw = () => {
        s.background(0);
        for (let i = 0; i < q.frameMultiplier; i++) {
            shader.setUniform("u_resolution", [q.bufWidth, q.bufHeight]);
            shader.setUniform("u_pixelArray", buf);
            drawKernel();
            shader.setUniform("u_kernel", buf);
            shader.setUniform("u_kernelResolution", [q.kernelSize, q.kernelSize]);
            shader.setUniform("u_moveUp", s.keyIsDown(87));
            shader.setUniform("u_moveDown", s.keyIsDown(83));
            shader.setUniform("u_moveLeft", s.keyIsDown(65));
            shader.setUniform("u_moveRight", s.keyIsDown(68));
            shader.setUniform("u_invert", q.invert);
            if (q.invert) {
                q.invert = false;
            }
            // buf.clear(0,0,0,0);
            buf.shader(shader);
            buf.rect(0, 0, q.bufWidth, q.bufHeight);
        }


        // Draw in a lower resolution buffer
        s.image(buf, s.width/2 - s.min(s.width, s.height)/2, s.height/2 - s.min(s.width, s.height)/2, s.min(s.width, s.height), s.min(s.width, s.height));
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

        if (s.key == "e") {
            q.frameMultiplier++;
        }
        if (s.key == "q") {
            q.frameMultiplier--;
        }
    };

};
new p5(sketch, document.body);