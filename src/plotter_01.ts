import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";

// Description: Utility to convert an image to be carved on lino by a pen plotter.
// Date: 11/18/23 23:24:14Z

const q = {
    lines: 100,
    redWeight: 0.2989,
    greenWeight: 0.5870,
    blueWeight: 0.1140,
    inverted: false,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("lines", 0, 1000, q.lines, 1, q);
settings.bindBoolean("inverted", q.inverted, q);
let img: P5.Image = null;

init(P5);
const sketch = (s: p5SVG) => {



    s.setup = () => {
        function receivedFile(file: p5.File) {
            if (file.type === "image") {
                img = s.loadImage(file.data, () => {
                    img.resize((img.width/img.height) * q.lines, q.lines);
                    img.loadPixels();
                });
            } else {
                console.log("Not an image file!");
            }
        }

        const canvas = s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });

        canvas.drop(receivedFile);
    };

    s.draw = () => {
        s.background(255);
        if (img === null) {
            s.fill(0);
            s.noStroke();
            s.textSize(24);
            s.textAlign(s.CENTER);
            s.text("Drag an image file onto the canvas.", s.width / 2, s.height / 2);
        } else {
            s.stroke(0);
            const vertSpacing = s.height / q.lines;
            const horizontalSpacing = s.width / img.width;

            for (let i = 0; i < q.lines; i++) {
                let lineStart: number = null;
                for (let p = 0; p < img.width; p++) {
                    const index = (p + i * img.width) * 4;
                    const v = (img.pixels[index] / 255 * q.redWeight + img.pixels[index + 1] / 255 * q.greenWeight + img.pixels[index + 2] / 255 * q.blueWeight);

                    if ((!q.inverted && v > 0) || (q.inverted && v <= 0)) {
                        if (lineStart === null) {
                            lineStart = p;
                        }

                        if (p === img.width - 1 && lineStart !== null) {
                            const y = i * vertSpacing;
                            s.line(lineStart * horizontalSpacing, y, (p - 1) * horizontalSpacing, y);
                        }
                    } else {
                        if (lineStart !== null) {
                            const y = i * vertSpacing;
                            s.line(lineStart * horizontalSpacing, y, (p - 1) * horizontalSpacing, y);
                            lineStart = null;
                        }
                    }
                }
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