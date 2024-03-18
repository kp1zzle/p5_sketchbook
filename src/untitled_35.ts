import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import {maxHeight, maxWidth, setAspectRatioStr} from "./helpers/aspect_ratio";
import {defaultPaneHelpers, initPaneAtLeft} from "./helpers/tweakpane";
import {setBackground} from "./helpers/color";
import {initDrawingSystem} from "./helpers/drawing";
import {pointCoords, pointsOnGrid} from "./helpers/grid";
import {point} from "./helpers/point";
import {FolderApi} from "@tweakpane/core";

// Description: Untitled_17 (circles) revisited.
// Date: 2/25/24 02:31:14Z

const noiseFuncs = {
    "wobbly 1": (s: p5SVG, x: number, y: number) => {
        const t = 1;
        return s.sin(2.31*x+0.11*t+5.95+2.57*s.sin(1.73*y-0.65*t+1.87)) + s.sin(3.09*y-0.28*t+4.15+2.31*s.sin(2.53*x+0.66*t+4.45))+s.sin(3.06*x-0.18*t+5.16+2.28*s.sin(2.27*y+0.71*t+3.97))+s.sin(5.40*y-0.13*t+4.74+2.83*s.sin(3.71*x+0.96*t+4.42))/2.;
    },
    "perlin": (s: p5SVG, x: number, y: number) => {
        return 2 * (s.noise(x, y) - 0.5);
    },
    "linear x": (s: p5SVG, x: number, y: number) => {
        return x;
    },
    "linear y": (s: p5SVG, x: number, y: number) => {
        return y;
    },
    "linear xy": (s: p5SVG, x: number, y: number) => {
        return x+y;
    },
    "quadratic x": (s: p5SVG, x: number, y: number) => {
        return x*x;
    },
    "quadratic y": (s: p5SVG, x: number, y: number) => {
        return y*y;
    },
    "exponential x": (s: p5SVG, x: number, y: number) => {
        return Math.pow(2, x);
    }
};
const noiseFuncOptions = {};
for (const key in noiseFuncs) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    noiseFuncOptions[key] = key;
}

interface layer {
    color: string,
    offset: point,
    noiseOffset: point,
    folder: FolderApi | null,
    noiseFunc: keyof typeof noiseFuncs,
    zoom: number
}

const layers: layer[] = [];
// eslint-disable-next-line prefer-const
let layersFolder: FolderApi;


const q = {
    numPts: 75,
    spacing: 8,
    zoom: 25,
    minCircleDMult: 0.1,
    maxCircleDMult: 0.95,
    offset: {x: 0, y: 0},
    numLayers: 0,
};
const {pane, uiWidth} = initPaneAtLeft(1.1, {title: "Circles"});
pane.addBinding(q, "numLayers", {step: 1, min: 1, max: 3}).on("change", () => {
    const add = q.numLayers > layers.length;
    for (let i = 0; i < Math.abs(q.numLayers - layers.length); i++) {
        if (add) {
            const f = layersFolder.addFolder({title: "layer " + (layers.length + 1).toString()});
            layers.push({
                color: "#0773ff",
                offset: {x: 0, y: 0},
                noiseOffset: {x: 0, y: 0},
                folder: f,
                noiseFunc: "wobbly 1",
                zoom: 1,
            });
            f.addBinding(layers[layers.length - 1], "color");
            f.addBinding(layers[layers.length - 1], "offset");
            f.addBinding(layers[layers.length - 1], "noiseOffset");
            f.addBinding(layers[layers.length - 1], "zoom");
            f.addBinding(layers[layers.length - 1], "noiseFunc", {
                options: noiseFuncOptions,
            });
        } else {
            const l = layers.pop();
            l.folder.dispose();
        }
    }

});
pane.addBinding(q, "zoom");
pane.addBinding(q, "numPts");
pane.addBinding(q, "minCircleDMult");
pane.addBinding(q, "maxCircleDMult", {step: 0.05});
pane.addBinding(q, "offset");
layersFolder = pane.addFolder({title: "layers"});

let img: P5.Graphics = null;
let updateFunc: () => void;
let drawFunc: () => void;

init(P5);
const sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        setBackground(s.color("#999999"));
        setAspectRatioStr(s, "1x1", maxWidth(800, uiWidth), maxHeight());
        if (img === null) {
            const o = initDrawingSystem(s, pane, s.width, s.height);
            img = o.img;
            updateFunc = o.updateFunc;
            drawFunc = o.drawFunc;
        }
        defaultPaneHelpers(pane, s, sketch, maxWidth(800, uiWidth));
        s.frameRate(1);
    };

    s.draw = () => {
        s.background(255);
        if (img.width !== s.width || img.height !== s.height) {
            img.resizeCanvas(s.width, s.height, true);
            drawFunc();
        }
        q.spacing = s.width/(q.numPts + 1);
        s.noFill();
        s.translate(s.width/2 - (q.numPts * q.spacing / 2) , s.height/2 - (q.numPts/s.width*s.height * q.spacing / 2));

        for (const layer of layers) {
            s.stroke(layer.color);
            pointsOnGrid(q.numPts, q.numPts/s.width*s.height, (x: number, y: number) => {
                const pt = pointCoords(q.spacing, x, y);
                const xComputed = ((q.offset.x + layer.noiseOffset.x + x)/layer.zoom)/q.zoom;
                const yComputed = ((q.offset.y + layer.noiseOffset.y + y)/layer.zoom)/q.zoom;
                const size = s.max(q.minCircleDMult*q.spacing, noiseFuncs[layer.noiseFunc](s, xComputed, yComputed)*q.maxCircleDMult*q.spacing);
                s.circle(layer.offset.x + pt.x, layer.offset.y + pt.y, size);
            });

        }

        // s.translate(q.spacing/2, q.spacing/2);
        // s.stroke(q.color2);
        // pointsOnGrid(q.numPts, q.numPts/s.width*s.height,(x: number, y: number) => {
        //     const pt = pointCoords(q.spacing, x, y);
        //     s.circle(pt.x, pt.y,  determineCircleD(x, y, true));
        // });

        updateFunc();
    };

    s.mousePressed = () => {
    };

    s.mouseReleased = () => {
    };

    s.mouseDragged = () => {

    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);
    };

};
new P5(sketch, document.body);