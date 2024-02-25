import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {maxHeight, maxWidth, setAspectRatioStr} from "./helpers/aspect_ratio";
import {defaultPaneHelpers, initPaneAtLeft} from "./helpers/tweakpane";
import {setBackground} from "./helpers/color";
import {initDrawingSystem} from "./helpers/drawing";
import {pointCoords, pointsOnGrid} from "./helpers/grid";

// Description: Untitled_17 (circles) revisited.
// Date: 2/25/24 02:31:14Z

const q = {
    numPts: 75,
    spacing: 8,
    zoom: 25,
    color1: "#0773ff",
    color2: "#e236ff",
    minCircleD: 1,
    maxCircleDMult: 0.5,
    background: "#000000",
    xOffset: 0,
    yOffset: 0,
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
        function determineCircleD(x: number, y: number, second: boolean): number {
            const v = s.noise((q.xOffset + x)/q.zoom, (q.yOffset + y)/q.zoom) - 0.5;
            let t = 3;
            if (second) {
                t *= -1;
            }
            return s.max(q.minCircleD, t*v*q.maxCircleDMult*q.spacing);
        }

        s.background(q.background);
        s.noFill();
        s.translate(s.width/2 - (q.numPts * q.spacing / 2) , s.height/2 - (q.numPts/11*14 * q.spacing / 2));

        s.stroke(q.color1);
        pointsOnGrid(q.numPts, q.numPts/11*14, (x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            s.circle(pt.x, pt.y, determineCircleD(x, y, false));
        });

        s.translate(q.spacing/2, q.spacing/2);
        s.stroke(q.color2);
        pointsOnGrid(q.numPts, q.numPts/11*14,(x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            s.circle(pt.x, pt.y,  determineCircleD(x, y, true));
        });

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