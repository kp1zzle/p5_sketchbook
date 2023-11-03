import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import QuickSettings from "quicksettings-iterator";
import {setAspectRatioStr} from "./helpers/aspect_ratio";
import {IsoLine} from "./helpers/isometric";

// Description: 
// Date: 11/1/23 22:09:35Z

const q = {
    param: 3,
    theta: 50,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.bindRange("param", 0, 50, q.param, 1, q);

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });
        s.frameRate(10);
        s.angleMode(s.DEGREES);
    };

    s.draw = () => {
        s.translate(s.width/2, s.height/2);
        s.background(255);
        settings.iterationStep();
        s.stroke(0);
        s.noFill();
        for (let i = 0; i <= 10; i++) {
            // IsoLine(s, [
            //     {x: -i*10, y: 0, z: -i*10},
            //     {x: -100, y: 0, z: -i*10},
            //     {x: -100, y: -100, z: -i*10},
            // ], q.theta);
            // IsoLine(s, [
            //     {x: -i*10, y: 0, z: -i*10},
            //     {x: -i*10, y: 0, z: -100},
            //     {x: -i*10, y: -100, z: -100},
            // ], q.theta);
            IsoLine(s, [
                {x: -100, y: -100, z: -i*10},
                {x: -100, y: 0, z: -i*10},
                {x: -i*10, y: 0, z: -100},
                {x: -i*10, y: -100, z: -100},
            ], q.theta);
        }


        // IsoLine(s, [
        //     {x: -10, y: 0, z: 10},
        //     {x: -100, y: 0, z: 10},
        //     {x: -100, y: -100, z: 10},
        // ], q.theta);
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