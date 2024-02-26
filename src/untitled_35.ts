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
    minCircleDMult: 0.1,
    maxCircleDMult: 0.95,
    offset: {x: 0, y: 0},
};
const {pane, uiWidth} = initPaneAtLeft(1.1, {title: "Circles"});
pane.addBinding(q, "zoom");
pane.addBinding(q, "numPts");
pane.addBinding(q, "minCircleDMult");
pane.addBinding(q, "maxCircleDMult", {step: 0.05});
pane.addBinding(q, "offset");
pane.addBinding(q, "color1", {expanded: true, picker: "inline",});
pane.addBinding(q, "color2", {expanded: true, picker: "inline",});

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
        s.frameRate(1);
    };

    s.draw = () => {
        s.background(255);
        if (img.width !== s.width || img.height !== s.height) {
            img.resizeCanvas(s.width, s.height, true);
            drawFunc();
        }
        function determineCircleD(x: number, y: number, second: boolean): number {
            let t = 1;
            if (second) {
                t *= -5;
            }
            const v = 2* (s.noise(t*(q.offset.x + x)/q.zoom, (q.offset.y + y)/q.zoom) - 0.5);
            return s.max(q.minCircleDMult*q.spacing, v*q.maxCircleDMult*q.spacing);
        }
        q.spacing = s.width/(q.numPts + 1);
        s.noFill();
        s.translate(s.width/2 - (q.numPts * q.spacing / 2) , s.height/2 - (q.numPts/s.width*s.height * q.spacing / 2));

        s.stroke(q.color1);
        pointsOnGrid(q.numPts, q.numPts/s.width*s.height, (x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            s.circle(pt.x, pt.y, determineCircleD(x, y, false));
        });

        s.translate(q.spacing/2, q.spacing/2);
        s.stroke(q.color2);
        pointsOnGrid(q.numPts, q.numPts/s.width*s.height,(x: number, y: number) => {
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