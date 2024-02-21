import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {maxHeight, maxWidth, setAspectRatioStr} from "./helpers/aspect_ratio";
import {defaultPaneHelpers, initPaneAtLeft} from "./helpers/tweakpane";
import {setBackground} from "./helpers/color";

// Description: Drawing system.
// Date: 2/20/24 00:21:14Z

const q = {
    param: 3,
};
const {pane, uiWidth} = initPaneAtLeft(1.1, {title: "control panel"});
pane.addBinding(q, "param", {min: 0, max: 100, step: 1});

init(P5);
const sketch = (s: p5SVG) => {
    let img: P5.Graphics = null;

    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        defaultPaneHelpers(pane, s, sketch, maxWidth(800, uiWidth));
        setBackground(s.color("#999999"));
        setAspectRatioStr(s, "1x1", maxWidth(800, uiWidth), maxHeight());
        img = s.createGraphics(s.width, s.height);
    };

    s.draw = () => {
        s.background(255);
        s.image(img, 0, 0);

        if (s.mouseIsPressed) {
            img.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
        }
    };

    s.mouseClicked = () => {
    };

    s.mouseDragged = () => {

    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);
    };

};
new P5(sketch, document.body);