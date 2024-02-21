import {p5SVG} from "p5.js-svg";
import {Pane} from "tweakpane";
import {point} from "./point";

interface path {
    strokeWeight: number
    color: string
    points: point[]
}

let currPath: number | null = null;
const paths: path[] = [];
const q = {
    strokeWeight: 1,
    color: "#000000ff",
};



export const initDrawingSystem = (s: p5SVG, pane: Pane,  w: number, h: number) => {
    const img = s.createGraphics(w, h);
    const f = pane.addFolder({title: "Drawing System Controls"});
    f.addBinding(q, "strokeWeight", {min: 0, max: 100, step: 1, label: "brush size"});
    f.addBinding(q, "color", {
        label: "brush color",
        picker: "inline",
        expanded: true,
        color: {alpha: true}
    });

    const drawFunc = () => {
        img.background(255);
        img.noFill();
        img.strokeCap(s.PROJECT);
        console.log(paths.length);

        for (const p of paths) {
            img.beginShape();
            img.strokeWeight(p.strokeWeight);
            img.stroke(p.color);
            for (const pt of p.points) {
                img.vertex(pt.x, pt.y);
            }
            img.endShape();
        }
        
    };

    const updateFunc = () => {
        if (s.mouseIsPressed) {
            if (currPath === null) {
                currPath = paths.length;
                paths[currPath] = {
                    points: [],
                    color: q.color,
                    strokeWeight: q.strokeWeight,
                };
            }
            paths[currPath].points.push({x: s.mouseX, y: s.mouseY});
            drawFunc();
        } else {
            currPath = null;
        }
        
    };

    return {img, updateFunc, drawFunc};
};