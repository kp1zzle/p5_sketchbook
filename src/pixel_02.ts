import * as p5 from "p5";
import QuickSettings from "quicksettings";
import {initSketch} from "./helpers/pixel_painter_core";

// Description: Simple PPCL demo with a repeating diamond pattern.
// Date: 12/8/23 23:05:00Z

const q = {
    param: 3,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("param", 0, 1000, q.param, 1, q);
const commands = `5 (
frameMultiplier=2
penDown
50 right up
50 left up
50 left down
50 right down
invert penUp
frameMultiplier=5
20 down
)
20 left
`;

new p5(initSketch( false, commands), document.body);