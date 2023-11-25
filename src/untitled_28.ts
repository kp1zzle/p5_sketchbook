import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import {pointCoords, pointsOnGrid} from "./helpers/grid";
import {convertToIsometric} from "./helpers/isometric";

// Description: Untitled 26 as an isometric plane.
// Date: 11/25/23 16:21:35Z

const q = {
    numPts: 30,
    spacing: 8,
    zoom: 25,
    minCircleD: 1,
    maxCircleDMult: 0.9,
    xOffset: 0,
    yOffset: 0,
    filled: false,
    theta: 30,
    disturbance: 50,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numPts", 0, 1000, q.numPts, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 1,  q);
settings.bindRange("zoom", 1, 100, q.zoom, 1,  q);
settings.bindRange("minCircleD", 0, 10, q.minCircleD, 0.1,  q);
settings.bindRange("maxCircleDMult", 0, 3, q.maxCircleDMult, 0.05,  q);
settings.bindRange("disturbance", 0, 500, q.disturbance, 5,  q);
settings.bindBoolean("filled", q.filled, q);


init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });
        s.angleMode(s.DEGREES);
    };

    s.draw = () => {
        s.background(255);
        if (q.filled) {
            s.fill(0);
        } else {
            s.noFill();
        }
        s.strokeWeight(2);
        s.translate(s.width/2 - (q.numPts * q.spacing / 2) , s.height);

        s.stroke(0);
        pointsOnGrid(q.numPts, q.numPts/4*5.5, (x: number, y: number) => {
            const basePt = pointCoords(q.spacing, x, y);
            const threeDeePt = {
                x: basePt.x,
                y: basePt.y,
                z: s.noise((q.xOffset + basePt.x)/q.zoom, (q.yOffset +  basePt.y)/q.zoom) * q.disturbance,
            };
            const pt = convertToIsometric(s, threeDeePt, q.theta );
            s.square(pt.x, pt.y, q.minCircleD + threeDeePt.z * q.maxCircleDMult*q.spacing/2/q.disturbance);
        });
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