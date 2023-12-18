import QuickSettings from "quicksettings";
import * as p5 from "p5";
import {initSketch} from "./helpers/pixel_painter_core";

// Description: Another infinite artwork.
// Date: 12/17/23 20:26:22Z

const q = {
    param: 3,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("param", 0, 1000, q.param, 1, q);
const commands = `kernelMode=dots kernelSize=50 kernelColor=255,255,255 frameMultiplier=5
100 down
100 right
penUp
45 right up
kernelMode=solid kernelSize=10 penDown kernelColor=255,255,255
10 right up
5 left down
5 left up
10 right down`;

new p5(initSketch( false, commands, true, false, [0, 0, 0]), document.body);