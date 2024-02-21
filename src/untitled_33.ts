import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";

// Description: Gradient relief map.
// Date: 2/11/24 16:31:49Z

const q = {
    zoom: 1,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("zoom", 0, 10, q.zoom, 0.25, q);

const sketch = (s: P5) => {
    let shader: P5.Shader = null;

    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight, s.WEBGL);
        s.noSmooth();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        shader = s.createShader(require("./pixel/shaders/relief.vert"), require("./pixel/shaders/relief.frag"));
    };

    s.draw = () => {
        s.noStroke();


        shader.setUniform("u_zoom", q.zoom);


        s.shader(shader);
        s.rect(0-s.width/2, 0-s.height/2, s.width, s.height);
    };

    s.mouseClicked = () => {
    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);

        if (s.keyCode === s.ESCAPE || s.key === "q") {
            settings.toggleVisibility();
        }
    };

};
new P5(sketch, document.body);