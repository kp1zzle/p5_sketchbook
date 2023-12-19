import QuickSettings from "quicksettings";
import * as p5 from "p5";
import {initSketch} from "./helpers/pixel_painter_core";
import {HSLToRGB} from "./helpers/color";

// Description: Demo using JS to generate PPCL.
// Date: 12/18/23 16:18:03Z
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
    commands.push(...gradientLine(125, [222, 100, 51], [222, 100, 90], "right frameMultiplier=2"));
    commands.push(...gradientLine(125, [222, 100, 90], [222, 100, 51], "right"));
    commands.push("100 penUp up");
    commands.push("kernelMode=dots kernelSize=50");
    commands.push(...gradientLine(125, [222, 100, 90], [222, 100, 51], "penDown right"));
    commands.push("down");
    commands.push(...gradientLine(125, [222, 100, 90], [222, 100, 51], "left"));
    commands.push("penUp kernelMode=solid kernelSize=10");
    commands.push("100  up right");
    commands.push("penDown");

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