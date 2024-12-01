import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {maxHeight, maxWidth, setAspectRatioStr} from "./helpers/aspect_ratio";
import {defaultPaneHelpers, initPaneAtLeft} from "./helpers/tweakpane";
import {setBackground} from "./helpers/color";
import {initDrawingSystem} from "./helpers/drawing";
import {pointCoords, pointsOnGrid} from "./helpers/grid";
import {point} from "./helpers/point";
import {FolderApi} from "@tweakpane/core";

// Description: Patterns for studio project.
// Date: 12/1/24 02:31:14Z


const params = {
    layers: 5,
    radius: 50,
};
const {pane, uiWidth} = initPaneAtLeft(1.1, {title: "Circles"});
pane.addBinding(params, "layers");
pane.addBinding(params, "radius");



init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        setBackground(s.color("#999999"));
        setAspectRatioStr(s, "1x1", maxWidth(800, uiWidth), maxHeight());
        defaultPaneHelpers(pane, s, sketch, maxWidth(800, uiWidth));
        s.frameRate(20);
    };

    s.draw = () => {
        s.background(255);
        s.translate(s.width/2, s.height/2);
        drawHexGrid(s, params.layers);

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



function drawHexGrid(s: p5SVG, layers: number) {
    for (let q = -layers; q <= layers; q++) {
        for (let r = Math.max(-layers, -q - layers); r <= Math.min(layers, -q + layers); r++) {
            drawHexagon(s, q, r);
        }
    }
}

function cubeToPixel(q: number, r: number) {
    const x = params.radius * (3/2 * q);
    const y = params.radius * (Math.sqrt(3) * (r + q/2));
    return { x, y };
}

function drawHexagon(s: p5SVG, q: number, r: number) {
    const { x, y } = cubeToPixel(q, r);
    s.beginShape();
    for (let i = 0; i < 6; i++) {
        const angle = s.TWO_PI / 6 * i;
        const xOffset = x + params.radius * s.cos(angle);
        const yOffset = y + params.radius * s.sin(angle);
        s.vertex(xOffset, yOffset);
    }
    s.endShape(s.CLOSE);
}

new P5(sketch, document.body);