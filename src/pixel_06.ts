import QuickSettings from "quicksettings";
import {HSLToRGB} from "./helpers/color";
import * as p5 from "p5";
import {initSketch} from "./helpers/pixel_painter_core";

// Description: Rainbow gradients.
// Date: 12/18/23 18:42:02Z

const q = {
    param: 3,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("param", 0, 1000, q.param, 1, q);



function generateCommands(): string[] {
    const commands = [];

    // for (let h = 0; h < 360; h++) {
    //     const color = HSLToRGB(h, 100, 50);
    //     commands.push(`right kernelColor=${color[0]},${color[1]},${color[2]}`);
    // }
    // commands.push("penUp");
    // commands.push("10 up");
    // commands.push("penDown");

    for (let i = 0; i < 3; i++) {
        commands.push("penDown");
        commands.push(...gradientLine(125, [0, 100, 50 - (15*i)], [360, 100, 50 - (15*i)], "right frameMultiplier=4 kernelSize=20"));
        commands.push("20 frameMultiplier=1 up penUp");
    }

    commands.push("50 up left kernelSize=5");




    return commands;

}

function gradientLine(frames: number, startHSL: number[], endHSL: number[], baseCommand: string): string[] {
    const commands = [];
    const deltaH = (endHSL[0] - startHSL[0])/frames;
    const deltaS = (endHSL[1] - startHSL[1])/frames;
    const deltaL = (endHSL[2] - startHSL[2])/frames;

    for (let f = 0; f < frames; f++) {
        const color = HSLToRGB(startHSL[0] + (f*deltaH),startHSL[1] + (f*deltaS), startHSL[2] + (f*deltaL) );
        commands.push(baseCommand+` kernelColor=${color[0]},${color[1]},${color[2]}`);
    }
    return commands;
}

new p5(initSketch( true, generateCommands(), true, false, [0, 0, 0]), document.body);