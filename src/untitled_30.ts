import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import {mul} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

// Description: Using triangles to create rhythm.
// Date: 1/31/24 18:32:35Z

const q = {
    baseWidth: 60,
    dropOff: 0.1,
    spacing: 5,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("baseWidth", 0, 100, q.baseWidth, 1,  q);
settings.bindRange("dropOff", 0, 0.15, q.dropOff, 0.001,  q);
settings.bindRange("spacing", 0, 50, q.spacing, 1,  q);




init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });
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
        function repeatedEl (x: number, y: number, width: number, height: number, spacing: number, corner?: number) {
            let elementHeight = q.baseWidth;
            const yMult = height > 0 ? 1 : -1;
            for (let j = 0; s.abs(j) < s.abs(height);) {
                let elementWidth = q.baseWidth;
                const xMult = width > 0 ? 1 : -1;
                for (let i = 0; s.abs(i) < s.abs(width);) {
                    triangleElement(x + i, y + j, elementWidth, elementHeight, corner);
                    i += (elementWidth + q.spacing) * xMult;
                    elementWidth = s.max(s.abs(elementWidth * (1-q.dropOff)), 1);
                }
                j += (elementHeight + q.spacing) * yMult;
                elementHeight = s.max(s.abs(elementHeight * (1-q.dropOff)), 1);
            }
        }


        s.background(255);
        s.fill(0);
        s.strokeWeight(0);
        // triangleElement(50 , 50, 50, 50);

        repeatedEl(50, 50, 500, 500,  5, 1);
        repeatedEl(1050, 50, -500, 500,  5, 2);
        repeatedEl(50, 1050, 500, -500,  0, 0);
        repeatedEl(1050, 1050, -500, -500,  0, 3);

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