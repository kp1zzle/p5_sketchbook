import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";

// Description: Using triangles to create rythm.
// Date: 31/1/24 5:33EST

const q = {
    baseWidth: 10,
    dropOff: 0.1,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("baseWidth", 0, 100, q.baseWidth, 1,  q);
settings.bindRange("dropOff", 0, 0.99, q.baseWidth, 0.01,  q);




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

            s.triangle(pt1[0], pt1[1], pt2[0], pt2[1], pt3[0], pt3[1]);
        }


        s.background(255);
        s.fill(0)
        s.noStroke();

        
        let width = q.baseWidth;
        for (let i = 0; i < 500; i++) {
            triangleElement(50 + i, 50, width, 50)
            width *= (1-q.dropOff)
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