import {p5SVG} from "p5.js-svg";

export function setAspectRatio(s: p5SVG, w: number, h: number, maxW?: number, maxH?: number) {
    if (maxW === undefined) {
        maxW = s.windowWidth;
    }
    if (maxH === undefined) {
        maxH = s.windowHeight;
    }

    const unit = s.min(maxW / w, maxH / h);
    s.resizeCanvas(unit * w, unit * h);
}

export function setAspectRatioStr(s: p5SVG, aspect: string, maxW?: number, maxH?: number) {
    let dims = aspect.split(":");
    if (dims.length !== 2) {
        dims = aspect.split("x");
    }
    if (dims.length !== 2) {
        return;
    }

    const w = parseFloat(dims[0]);
    if (isNaN(w)) {
        return;
    }
    const h = parseFloat(dims[1]);
    if (isNaN(h)) {
        return;
    }

    setAspectRatio(s, w, h, maxW, maxH);
}

export function maxHeight(min?: number) {
    if (min === undefined) {
        min = 800;
    }

    return Math.max(min, 0.9*window.innerHeight);
}

export function maxWidth(min?: number, uiWidth?: number) {
    if (min === undefined) {
        min = 800;
    }
    if (uiWidth === undefined) {
        uiWidth = 0;
    }

    return Math.max(min, 0.9*(window.innerWidth - (2*uiWidth)));
}