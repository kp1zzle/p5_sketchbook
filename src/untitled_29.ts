import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";

// Description: Untitled 26 but not an even grid.
// Date: 12/4/23 21:00:48Z

const q = {
    spacing: 8,
    maxSquareWidth: 25,
    maxWidth: 500,
    maxHeight: 500,
    zoom: 25,
    xOffset: 0,
    yOffset: 0,
    filled: false,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("spacing", 0, 100, q.spacing, 1,  q);
settings.bindRange("zoom", 1, 100, q.zoom, 1,  q);
settings.bindRange("maxWidth", 1, 1000, q.maxWidth, 1,  q);
settings.bindRange("maxHeight", 1, 1000, q.maxWidth, 1,  q);
settings.bindRange("maxSquareWidth", 1, 100, q.maxSquareWidth, 1,  q);
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
        s.background(255);
        if (q.filled) {
            s.fill(0);
        } else {
            s.noFill();
        }
        s.strokeWeight(2);
        s.translate(s.width/2 - (q.maxWidth / 2) , s.height/2 - (q.maxHeight / 2));

        s.stroke(0);

        for (let y = 0; y < q.maxHeight; y += q.spacing + q.maxSquareWidth) {
            let x = 0;
            while (x < q.maxWidth) {
                const v = q.maxSquareWidth * s.noise((q.xOffset + x)/q.zoom, (q.yOffset + y)/q.zoom);
                s.square(x, y, v);
                x += v + q.spacing;
            }
        }
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