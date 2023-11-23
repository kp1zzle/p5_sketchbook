import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import {pointCoords, pointsOnGrid} from "./helpers/grid";

// Description: Circle made out of squares.
// Date: 11/21/23 22:29:32Z

const q = {
    numPts: 75,
    spacing: 8,
    zoom: 25,
    minSquareLen: 1,
    maxSquareLen: 0.9,
    xOffset: 0,
    yOffset: 0,
    filled: false,
    radius: 10
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("numPts", 0, 1000, q.numPts, 1,  q);
settings.bindRange("spacing", 0, 100, q.spacing, 1,  q);
settings.bindRange("zoom", 1, 100, q.zoom, 1,  q);
settings.bindRange("minSquareLen", 0, 10, q.minSquareLen, 0.1,  q);
settings.bindRange("maxSquareLen", 0, 10, q.maxSquareLen, 0.05,  q);
settings.bindBoolean("filled", q.filled, q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });
    };

    s.draw = () => {
        function squareSize(x: number, y: number, distance: number): number {
            // const v = s.noise((q.xOffset + x)/q.zoom, (q.yOffset + y)/q.zoom) - 0.5;
            // const t = 3;
            // return s.max(q.minSquareLen, t*v*q.maxCircleDMult*q.spacing);
            return 1-(distance/(q.numPts/2))*q.maxSquareLen + q.minSquareLen;
        }

        s.background(255);
        if (q.filled) {
            s.fill(0);
        } else {
            s.noFill();
        }
        s.strokeWeight(2);
        s.translate(s.width/2 - (q.numPts * q.spacing / 2) , s.height/2 - (q.numPts/4*5.5 * q.spacing / 2));

        s.stroke(0);
        pointsOnGrid(q.numPts, q.numPts, (x: number, y: number) => {
            const distX = (x - q.numPts/2 + 0.5);
            const distY = (y - q.numPts/2 + 0.5);
            const distance = Math.sqrt(distX*distX + distY*distY);
            if (distance <= q.numPts/2) {
                const pt = pointCoords(q.spacing, x, y);
                s.square(pt.x, pt.y, squareSize(x, y, distance));
            }

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