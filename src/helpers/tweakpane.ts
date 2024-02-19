// A collection of helpers for tweakpane

import {PaneConfig} from "tweakpane/dist/types/pane/pane-config";
import {Pane} from "tweakpane";
import {P5} from "p5.js-svg/dist/types";
import {exportPNG, exportSVG} from "./export";
import {p5SVG} from "p5.js-svg";
import {maxHeight, maxWidth, setAspectRatioStr} from "./aspect_ratio";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";
import {RadioGridApi} from "@tweakpane/plugin-essentials";
import {setBackground} from "./color";

export function initPaneAtLeft(scale?: number, config?: PaneConfig) {
    if (scale === undefined) {
        scale = 1;
    }
    const uiWidth = scale * 248;
    const scaleCss = document.createElement("style");
    scaleCss.innerHTML = ".tp-dfwv {\n" +
        "  transform: scale(" + scale.toString() + ");\n" +
        "  transform-origin: top right;\n" +
        "}\n";
    document.body.appendChild(scaleCss);
    setJetBlackTheme();

    // Unused code for putting the pane inside a container...
    // const paneContainer = document.createElement("div");
    // paneContainer.style.height = "100%";
    // paneContainer.style.width = "248px";
    // paneContainer.style.transformOrigin = "top center";
    // paneContainer.style.transform = "scale(" + scale.toString() + ")";
    // document.body.appendChild(paneContainer);

    const pane = new Pane(config);
    pane.registerPlugin(EssentialsPlugin);


    return {pane, uiWidth};
}

function setJetBlackTheme() {
    const theme = document.createElement("style");
    theme.innerHTML = ":root {\n" +
        "  --tp-base-background-color: hsla(0, 0%, 0%, 1.00);\n" +
        "  --tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);\n" +
        "  --tp-button-background-color: hsla(0, 0%, 70%, 1.00);\n" +
        "  --tp-button-background-color-active: hsla(0, 0%, 85%, 1.00);\n" +
        "  --tp-button-background-color-focus: hsla(0, 0%, 80%, 1.00);\n" +
        "  --tp-button-background-color-hover: hsla(0, 0%, 75%, 1.00);\n" +
        "  --tp-button-foreground-color: hsla(0, 0%, 0%, 1.00);\n" +
        "  --tp-container-background-color: hsla(0, 0%, 10%, 1.00);\n" +
        "  --tp-container-background-color-active: hsla(0, 0%, 25%, 1.00);\n" +
        "  --tp-container-background-color-focus: hsla(0, 0%, 20%, 1.00);\n" +
        "  --tp-container-background-color-hover: hsla(0, 0%, 15%, 1.00);\n" +
        "  --tp-container-foreground-color: hsla(0, 0%, 50%, 1.00);\n" +
        "  --tp-groove-foreground-color: hsla(0, 0%, 10%, 1.00);\n" +
        "  --tp-input-background-color: hsla(0, 0%, 10%, 1.00);\n" +
        "  --tp-input-background-color-active: hsla(0, 0%, 25%, 1.00);\n" +
        "  --tp-input-background-color-focus: hsla(0, 0%, 20%, 1.00);\n" +
        "  --tp-input-background-color-hover: hsla(0, 0%, 15%, 1.00);\n" +
        "  --tp-input-foreground-color: hsla(0, 0%, 70%, 1.00);\n" +
        "  --tp-label-foreground-color: hsla(0, 0%, 50%, 1.00);\n" +
        "  --tp-monitor-background-color: hsla(0, 0%, 8%, 1.00);\n" +
        "  --tp-monitor-foreground-color: hsla(0, 0%, 48%, 1.00);\n" +
        "}\n";
    document.body.appendChild(theme);
}

export function defaultPaneHelpers(pane: Pane, s: P5, sketch: (s: p5SVG) => void, maxW?: number, maxH?: number) {
    // Hacky way to determine if we've already run this function
    for (const f of pane.controller.rackController.rack.children) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if ("props" in f  && f.props.get("title") === "Misc") {
            return;
        }
    }

    if (maxW === undefined) {
        maxW = maxWidth();
    }
    if (maxH === undefined) {
        maxH = maxHeight();
    }

    const f = pane.addFolder({title: "Misc"});

    const PARAMS = {
        background: "#999999",
        direction: "vertical",
        aspect: "1x1",
    };

    f.addBinding(PARAMS, "background", {
        view: "color",
        color: {},
    }).on("change", () => {
        setBackground(s.color(PARAMS.background));
    });

    const updateAspect = () => {
        let aspect = PARAMS.aspect;
        if (PARAMS.direction === "horizontal") {
            const dims = aspect.split("x");
            aspect = dims[1] + "x" + dims[0];
        }
        setAspectRatioStr(s, aspect, maxW, maxH);
    };

    const directionOpts = ["vertical", "horizontal"];
    f.addBinding(PARAMS, "direction", {
        view: "radiogrid",
        groupName: "pageDirection",
        label: "",
        size: [2, 1],
        cells: (x: number, y: number) => ({
            title: directionOpts[y + x],
            value: directionOpts[y + x],
        }),
    }).on("change", updateAspect);

    const aspectRatios = ["1x1", "11x14", "2x3", "9x16"];
    f.addBinding(PARAMS, "aspect",{
        view: "radiogrid",
        groupName: "aspect ratio",
        label: "aspect ratio",
        size: [2, 2],
        cells: (x: number, y: number) => ({
            title: aspectRatios[y * 2 + x],
            value: aspectRatios[y * 2 + x],
        }),
    }).on("change", updateAspect);

    // Export
    f.addButton({title: "Export PNG"}).on("click", () => {exportPNG(s);});
    f.addButton({title: "Export SVG"}).on("click", () => {exportSVG(s, sketch);});
}