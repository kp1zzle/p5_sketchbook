import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {maxHeight, maxWidth, setAspectRatioStr} from "./helpers/aspect_ratio";
import {defaultPaneHelpers, initPaneAtLeft} from "./helpers/tweakpane";
import {setBackground} from "./helpers/color";
import {initDrawingSystem} from "./helpers/drawing";

// Description: Drawing system.
// Date: 2/20/24 00:21:14Z

const q = {
};
const {pane, uiWidth} = initPaneAtLeft(1.1, {title: "untitled_34"});

let img: P5.Graphics = null;
let updateFunc: () => void;
let drawFunc: () => void;

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        setBackground(s.color("#999999"));
        setAspectRatioStr(s, "1x1", maxWidth(800, uiWidth), maxHeight());
        if (img === null) {
            const o = initDrawingSystem(s, pane, s.width, s.height);
            img = o.img;
            updateFunc = o.updateFunc;
            drawFunc = o.drawFunc;
        }
        defaultPaneHelpers(pane, s, sketch, maxWidth(800, uiWidth));
    };

    s.draw = () => {
        s.background(255);
        if (img.width !== s.width || img.height !== s.height) {
            img.resizeCanvas(s.width, s.height, true);
            drawFunc();
        }

        s.image(img, 0, 0);

        updateFunc();

    };

    s.mousePressed = () => {
    };

    s.mouseReleased = () => {
    };

    s.mouseDragged = () => {

    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);
    };

};
new P5(sketch, document.body);