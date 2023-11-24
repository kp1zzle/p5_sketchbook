import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import {pointCoords, pointsOnGrid} from "./helpers/grid";

// Description: Platform to make pixel art sketches.
// Date: 11/23/23 22:29:32Z

const q = {
    bufWidth: 50,
    bufHeight: 50,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("bufWidth", 0, 100, q.bufWidth, 1,  q);


init(P5);
const sketch = (s: p5SVG) => {
    let shader: P5.Shader = null;
    let buf: P5.Graphics = null;

    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        s.noSmooth();
        buf = s.createGraphics(q.bufWidth, q.bufHeight, s.WEBGL);
        shader = buf.createShader(require("./pixel/shaders/painter.vert"), require("./pixel/shaders/painter.frag"));

    };

    s.draw = () => {
        s.background(255)
        buf.clear(0,0,0,0);
        buf.shader(shader);
        buf.rectMode(s.CENTER);
        buf.rect(0, 0, q.bufWidth, q.bufHeight)



        // Draw in a lower resolution buffer
        s.image(buf, s.width/2 - s.min(s.width, s.height)/2, s.height/2 - s.min(s.width, s.height)/2, s.min(s.width, s.height), s.min(s.width, s.height))

    };

    s.mouseClicked = () => {
    };

    s.mouseDragged = () => {
    };

    s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight)
    }

    s.keyPressed = () => {
        defaultKeys(s, sketch);

        if (s.keyCode === s.ESCAPE || s.key === "q") {
            settings.toggleVisibility();
        }
    };

};
new P5(sketch, document.body);