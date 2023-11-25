import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import QuickSettings from "quicksettings-iterator";
import {setAspectRatioStr} from "./helpers/aspect_ratio";

// Description: Demo for Quicksettings-iterator, using a modified version of untitled_16.
// Date: 11/1/23 22:09:35Z

const q = {
    numLines: 75,
    spacing: 10,
    lineLen: 1000,
    ptsPerLine: 10,
    disturbance: 100,
    color1: "#018f14",
    color2: "#002afd",
    zoom: 100,
    weight: 1,
    theta: 30,
};
const settings = QuickSettings.create(10, 10, "settings");
// settings.bindNumber("numLines", 0, 1000, q.numLines, 1,  q);
// settings.bindRange("spacing", 0, 100, q.spacing, 0.5,  q);
// settings.bindRange("lineLen", 0, 2000, q.lineLen, 1,  q);
settings.bindRange("ptsPerLine", 0, 100, q.ptsPerLine, 1,  q);
settings.bindRange("disturbance", 0, 300, q.disturbance, 5,  q);
settings.bindRange("zoom", 0, 300, q.zoom, 5,  q);
// settings.bindRange("weight", 0, 10, q.weight, 0.1, q);
// settings.bindRange("theta", 0, 180, q.theta, 1, q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        // settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
        //     setAspectRatioStr(s, aspect);
        // });
        s.frameRate(10);
        s.angleMode(s.DEGREES);
    };

    s.draw = () => {
        // s.translate(s.width/2, s.height/2);
        settings.iterationStep();
        s.background(255);
        s.translate(s.width/2 - q.numLines*q.spacing/2, s.height/2 - q.lineLen/2);
        s.noFill();
        s.stroke(q.color1);
        s.strokeWeight(q.weight);
        for (let i = 0; i < q.numLines; i++) {
            s.beginShape();
            const x = i*q.spacing;
            s.curveVertex(x + q.disturbance*s.noise(x/q.zoom, 0), 0);
            for (let j = 0; j <= q.ptsPerLine; j++) {
                const y = j*q.lineLen/q.ptsPerLine;
                s.curveVertex(x + q.disturbance*s.noise(x/q.zoom, y/q.zoom), y);
            }
            s.curveVertex(x + q.disturbance*s.noise(x/q.zoom, 0), q.lineLen);
            s.endShape();
        }

        s.translate(q.spacing/2,0);
        s.stroke(q.color2);
        for (let i = 0; i < q.numLines; i++) {
            s.beginShape();
            const x = i*q.spacing;
            s.curveVertex(x + q.disturbance*s.noise(x/q.zoom, 0), 0);
            for (let j = 0; j <= q.ptsPerLine; j++) {
                const y = j*q.lineLen/q.ptsPerLine;
                s.curveVertex(x + q.disturbance*s.noise(x/q.zoom, y/q.zoom), y);
            }
            s.curveVertex(x + q.disturbance*s.noise(x/q.zoom, 0), q.lineLen);
            s.endShape();
        }
    };

    s.mouseClicked = () => {

    };

    s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);

        if (s.keyCode === s.ESCAPE || s.key === "q") {
            settings.toggleVisibility();
        }
    };

};
new P5(sketch, document.body);