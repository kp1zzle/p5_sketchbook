import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import {pointCoords, pointsOnGrid} from "./helpers/grid";

// Description: Monochrome untitled 17 with squares.
// Date: 11/19/23 18:04:43Z

const q = {
    numPts: 75,
    spacing: 8,
    zoom: 25,
    minCircleD: 1,
    maxCircleDMult: 0.9,
    xOffset: 0,
    yOffset: 0,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numPts", 0, 1000, q.numPts, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 1,  q);
settings.bindRange("zoom", 1, 100, q.zoom, 1,  q);
settings.bindRange("minCircleD", 0, 10, q.minCircleD, 0.1,  q);
settings.bindRange("maxCircleDMult", 0, 1, q.maxCircleDMult, 0.05,  q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });
    };

    s.draw = () => {
        function determineCircleD(x: number, y: number, second: boolean): number {
            const v = s.noise((q.xOffset + x)/q.zoom, (q.yOffset + y)/q.zoom) - 0.5;
            let t = 3;
            if (second) {
                t *= -1;
            }
            return s.max(q.minCircleD, t*v*q.maxCircleDMult*q.spacing);
        }

        s.background(255);
        s.noFill();
        s.strokeWeight(2);
        s.translate(s.width/2 - (q.numPts * q.spacing / 2) , s.height/2 - (q.numPts/4*5.5 * q.spacing / 2));

        s.stroke(0);
        pointsOnGrid(q.numPts, q.numPts/4*5.5, (x: number, y: number) => {
            const pt = pointCoords(q.spacing, x, y);
            s.square(pt.x, pt.y, determineCircleD(x, y, false));
        });
    };

    s.mouseClicked = () => {
    };

    s.mouseDragged = () => {
        q.xOffset += (s.pmouseX - s.mouseX)/3;
        q.yOffset += (s.pmouseY - s.mouseY)/3;
    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);

        if (s.keyCode === s.ESCAPE || s.key === "q") {
            settings.toggleVisibility();
        }
    };

};
new P5(sketch, document.body);