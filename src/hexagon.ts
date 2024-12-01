import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {maxHeight, maxWidth, setAspectRatioStr} from "./helpers/aspect_ratio";
import {defaultPaneHelpers, initPaneAtLeft} from "./helpers/tweakpane";
import {setBackground} from "./helpers/color";

// Description: Patterns for re(mediation) studio project.
// Date: 12/1/24 02:31:14Z


const params = {
    layers: 5,
    radius: 50,
};
const {pane, uiWidth} = initPaneAtLeft(1.1, {title: "Circles"});
pane.addBinding(params, "layers");
pane.addBinding(params, "radius");

const hex = new Set<string>();

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
        const {q, r} = pixelToAxial(s.mouseX - s.width/2, s.mouseY - s.height/2);
        const key = q.toString() + " "  + r.toString();
        if (hex.has(key)) {
            hex.delete(key);
        } else {
            hex.add(key);
        }
        console.log(key);
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

function axialToPixel(q: number, r: number) {
    const x = params.radius * (3/2 * q);
    const y = params.radius * (Math.sqrt(3) * (r + q/2));
    return { x, y };
}

function pixelToAxial(x: number, y: number) {
    const q = Math.round((2/3 * x) / params.radius);
    const r = Math.round((-1/3 * x + Math.sqrt(3)/3 * y) / params.radius);
    return { q, r };
}

function drawHexagon(s: p5SVG, q: number, r: number) {
    const { x, y } = axialToPixel(q, r);
    const key = q.toString() + " "  + r.toString();

    s.beginShape();
    for (let i = 0; i < 6; i++) {
        const angle = s.TWO_PI / 6 * i;
        const xOffset = x + params.radius * s.cos(angle);
        const yOffset = y + params.radius * s.sin(angle);
        s.vertex(xOffset, yOffset);
    }
    s.endShape(s.CLOSE);

    if (hex.has(key)) {
        s.push();
        s.strokeWeight(5);
        const lineColors = ["#eb4034", "#addb23", "#23dbb6", "#4523db", "#b023db", "#ff7ddc"];
        let prevVertex = null;

        for (let i = 0; i < 7; i++) {
            const angle = s.TWO_PI / 6 * i;
            const xOffset = x + (params.radius - 5) * s.cos(angle);
            const yOffset = y + (params.radius - 5) * s.sin(angle);
            if (prevVertex !== null) {
                // Values of i correspond to different edges
                // 1 - SE
                // 2 - S
                // 3 - SW
                // 4 - NW
                // 5 - N
                // 6 - NE

                s.stroke(lineColors[i-1]);
                s.line(
                    prevVertex.xOffset,
                    prevVertex.yOffset,
                    xOffset,
                    yOffset,
                );
            }
            prevVertex = {xOffset, yOffset};
        }
        s.pop();
    }

}

new P5(sketch, document.body);