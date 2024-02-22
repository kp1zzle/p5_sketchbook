import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {setBackground} from "./helpers/color";
import {maxHeight, maxWidth, setAspectRatioStr} from "./helpers/aspect_ratio";
import {defaultPaneHelpers, initPaneAtLeft} from "./helpers/tweakpane";

// Description: Gradient relief map.
// Date: 2/11/24 16:31:49Z

const q = {
    zoom: 1,
    color1: {r: 0, g: 148, b: 212},
    color2: {r: 224, g: 153, b: 153}
};
const {pane, uiWidth} = initPaneAtLeft(1.1, {title: "untitled_34"});
pane.addBinding(q, "zoom");
pane.addBinding(q, "color1", {expanded: true, picker: "inline",});
pane.addBinding(q, "color2", {expanded: true, picker: "inline",});

const sketch = (s: P5) => {
    let shader: P5.Shader = null;
    let t = 0;

    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight, s.WEBGL);
        setBackground(s.color("#999999"));
        setAspectRatioStr(s, "1x1", maxWidth(800, uiWidth), maxHeight());
        defaultPaneHelpers(pane, s, sketch, maxWidth(800, uiWidth));

        s.noSmooth();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        shader = s.createShader(require("./pixel/shaders/relief.vert"), require("./pixel/shaders/relief.frag"));

    };

    s.draw = () => {
        s.noStroke();
        t+=0.01;


        shader.setUniform("u_zoom", q.zoom);
        shader.setUniform("u_time", t);
        shader.setUniform("u_color1", [q.color1.r, q.color1.g, q.color1.b]);
        shader.setUniform("u_color2", [q.color2.r, q.color2.g, q.color2.b]);


        s.shader(shader);
        s.rect(0-s.width/2, 0-s.height/2, s.width, s.height);
    };

    s.mouseClicked = () => {
    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);
    };

};
new P5(sketch, document.body);