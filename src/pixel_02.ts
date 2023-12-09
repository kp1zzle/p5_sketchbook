import * as p5 from "p5";
import QuickSettings from "quicksettings";
import {initSketch} from "./helpers/pixel_painter_core";

// Description: 
// Date: 12/8/23 23:05:00Z

const q = {
    param: 3,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("param", 0, 1000, q.param, 1, q);


new p5(initSketch( false,
    `
    penDown
    50 up
   `

), document.body);