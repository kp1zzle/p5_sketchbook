import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";

// Description: Trying to generalize untitled_30.
// Date: 1/31/24 21:31:35Z

const q = {
    baseWidth: 10,
    dropOff: 0.1,
    spacing: 5,
    sinMult:20,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("baseWidth", 0, 100, q.baseWidth, 1,  q);
settings.bindRange("dropOff", 0, 0.15, q.dropOff, 0.001,  q);
settings.bindRange("spacing", 0, 50, q.spacing, 1,  q);
settings.bindRange("sinMult", 0, 100, q.sinMult, 1,  q);

init(P5);
const sketch = (s: p5SVG) => {
    let pg: P5.Graphics;
    let img: P5.Image = null;

    s.setup = () => {
        function receivedFile(file: p5.File) {
            if (file.type === "image") {
                img = s.loadImage(file.data, () => {
                    img.resize(100, 100);
                    img.loadPixels();
                });
            } else {
                console.log("Not an image file!");
            }
        }
        const c = s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });
        s.angleMode(s.DEGREES);
        pg = s.createGraphics(100, 100);
        c.drop(receivedFile);
    };

    s.draw = () => {
        function triangleElement (x: number, y: number, width: number, height: number, corner?: number) {
            if (corner === undefined) {
                corner = 0;
            }

            const corners = [[0, 0], [width, 0], [width, height], [0, height]];
            const pt1 = corners[corner % 4];
            const pt2 = corners[(corner + 1) % 4];
            const pt3 = corners[(corner + 2) % 4];

            s.triangle(x + pt1[0],y + pt1[1], x +pt2[0],y +  pt2[1],x + pt3[0], y + pt3[1]);
        }
        function defaultSizeFn (x: number, width: number): number {
            return s.max(s.abs(width * (1-q.dropOff)), 1);
        }
        function sineSizeFn (x: number, width: number): number {
            return q.baseWidth + ((q.baseWidth/2)*s.sin(x*q.sinMult));
        }
        function repeatedEl (x: number, y: number, width: number, height: number, spacing: number, graphic: P5.Graphics, sizeFn: (x: number, width: number) => number, corner?: number) {
            let elementHeight = q.baseWidth;
            const yMult = height > 0 ? 1 : -1;
            let vCount = 0;
            for (let j = 0; s.abs(j) < s.abs(height);) {
                let elementWidth = q.baseWidth;
                const xMult = width > 0 ? 1 : -1;
                let hCount = 0;
                for (let i = 0; s.abs(i) < s.abs(width);) {
                    s.image(graphic, x + i, y + j, elementWidth, elementHeight);
                    i += (elementWidth + q.spacing) * xMult;
                    elementWidth = sizeFn(hCount, elementWidth);
                    hCount++;
                }
                j += (elementHeight + q.spacing) * yMult;
                elementHeight =  sizeFn(vCount, elementHeight);
                vCount++;
            }
        }

        s.background(255);
        pg.fill(0);
        pg.strokeWeight(0);
        if (img === null) {
            pg.square(0, 0, 100);
        } else {
            pg.image(img, 0, 0, 100, 100);
        }

        repeatedEl(50, 50, 800, 1000,  5, pg,sineSizeFn, 3);
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