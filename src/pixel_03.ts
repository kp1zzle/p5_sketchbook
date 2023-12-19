import QuickSettings from "quicksettings";
import * as p5 from "p5";
import {initSketch} from "./helpers/pixel_painter_core";

// Description: Demo of an infinite artwork.
// Date: 12/17/23 19:34:22Z

const q = {
    param: 3,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("param", 0, 1000, q.param, 1, q);
const commands = [
    "kernelMode=dots kernelSize=50",
    "frameMultiplier=5",
    "penDown",
    "50 right up",
    "50 left up",
    "50 left down",
    "50 right down",
    "invert penUp",
    "frameMultiplier=5",
    "20 down",
    ")",
    "20 left",
];

new p5(initSketch( false, commands, true, false, [0, 0, 0]), document.body);