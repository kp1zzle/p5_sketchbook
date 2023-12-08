import * as p5 from "p5";
import QuickSettings from "quicksettings";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {VideoRecorder} from "./helpers/p5.videorecorder";

// Description: Platform to make pixel art sketches.
// Date: 11/23/23 22:29:32Z

const q = {
    bufWidth: 500,
    bufHeight: 500,
    kernelSize: 10,
    frameMultiplier: 1,
    invert: false,
    penDown: false,
    kernelMode: "solid",
    kernelColor: [40, 3, 252],
    kernelParam: 2,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindRange("bufWidth", 0, 100, q.bufWidth, 1,  q);
settings.bindRange("frameMultiplier", 1, 10, q.frameMultiplier, 1,  q);
settings.addButton("invert", () => {
    q.invert = true;
});
settings.addButton("toggle pen up/down", () => {
    q.penDown = !q.penDown;
});
settings.bindRange("kernelParam", 1, 100, q.kernelParam, 1,  q);



const sketch = (s: p5) => {
    let shader: p5.Shader = null;
    let buf: p5.Graphics = null;
    let kernel: p5.Graphics = null;
    let videoRecorder: any = null;
    let commandIdx = 0;
    let commands: string[][][] = [];
    let up = false;
    let down = false;
    let left = false;
    let right = false;
    const kernelModes = ["solid", "dots"];

    s.setup = () => {

        settings.addRange("kernelSize", 1, 100, q.kernelSize, 1,  (num) => {
            q.kernelSize = num;
            drawKernel();
        });

        settings.addDropDown("kernel mode", kernelModes, (selection) => {
            q.kernelMode = selection.value;
            drawKernel();
        });

        s.createCanvas(s.windowWidth, s.windowHeight);
        s.noSmooth();
        buf = s.createGraphics(q.bufWidth, q.bufHeight, s.WEBGL);
        buf.rectMode(s.CENTER);
        buf.noStroke();
        buf.background(255);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        shader = buf.createShader(require("./pixel/shaders/painter.vert"), require("./pixel/shaders/painter.frag"));

        kernel = s.createGraphics(q.kernelSize, q.kernelSize);
        drawKernel();

        videoRecorder = new VideoRecorder(s, undefined, "mp4");
        videoRecorder.onFileReady = () => {
            videoRecorder.save(document.title + "_" + (new Date).toISOString());
        };

        settings.addButton("start recording", () => {
            videoRecorder.start();
            settings.hideControl("start recording");
            settings.showControl("stop recording");
        });

        settings.addButton("stop recording", () => {
            videoRecorder.stop();
            settings.hideControl("stop recording");
            settings.showControl("start recording");
        });
        settings.hideControl("stop recording");
        s.frameRate(60);

        settings.addTextArea("commands", "");

        settings.addButton("execute commands", () => {
            commands = parseCommands(settings.getValue("commands"));
            settings.disableControl("commands");
            settings.hideControl("execute commands");
            settings.showControl("stop command execution");
        });

        settings.addButton("stop command execution", () => {
            commands = [];
            settings.enableControl("commands");
            settings.hideControl("stop command execution");
            settings.showControl("execute commands");
        });
        settings.hideControl("stop command execution");
    };

    const drawKernel = () => {
        kernel = s.createGraphics(q.kernelSize, q.kernelSize);
        const color = s.color(q.kernelColor);
        kernel.fill(color);
        kernel.stroke(color);
        switch (q.kernelMode) {
        case "solid":
            solid();
            break;
        case "dots":
            dots(q.kernelParam);
            break;
        case "grid":

        }
    };

    s.draw = () => {
        s.background(0);
        if (commands.length > 0) {
            applyCurrCommand();
        }

        shader.setUniform("u_resolution", [q.bufWidth, q.bufHeight]);
        shader.setUniform("u_pixelArray", buf);
        shader.setUniform("u_kernel", kernel);
        shader.setUniform("u_kernelResolution", [q.kernelSize, q.kernelSize]);
        shader.setUniform("u_moveUp", s.keyIsDown(87) || up);
        shader.setUniform("u_moveDown", s.keyIsDown(83) || down);
        shader.setUniform("u_moveLeft", s.keyIsDown(65) || left);
        shader.setUniform("u_moveRight", s.keyIsDown(68) || right);
        shader.setUniform("u_invert", q.invert);
        shader.setUniform("u_penDown", q.penDown);
        shader.setUniform("u_frameMultiplier", q.frameMultiplier);
        q.invert = false;
        up = false;
        down = false;
        left = false;
        right = false;
        // buf.clear(0,0,0,0);
        buf.shader(shader);
        buf.rect(0, 0, q.bufWidth, q.bufHeight);


        // Draw in a lower resolution buffer
        s.image(buf, s.width/2 - s.min(s.width, s.height)/2, s.height/2 - s.min(s.width, s.height)/2, s.min(s.width, s.height), s.min(s.width, s.height));

        if (!q.penDown) {
            const kernelDrawSize = s.min(s.width, s.height)/q.bufWidth * q.kernelSize;
            s.image(kernel, s.width/2 - kernelDrawSize/2, s.height/2 - kernelDrawSize/2, kernelDrawSize, kernelDrawSize);
        }
    };

    s.mouseClicked = () => {
    };

    s.mouseDragged = () => {
    };

    s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
    };

    s.keyPressed = () => {
        if (s.keyCode === s.ESCAPE) {
            settings.toggleVisibility();
        }

        if (s.key == "e") {
            q.frameMultiplier++;
        }
        if (s.key == "q") {
            q.frameMultiplier--;
        }
    };

    // MARK -- Text command parsing

    const parseCommandsInner = (lines: string[]) => {
        const out: string[][][] = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const commands = line.split(" ");
            let mult = parseInt(commands[0]);
            if (isNaN(mult)) {
                mult = 1;
            }

            if (!isNaN(mult) && commands.length === 2 && commands[1] === "(") {
                console.log("here")
                // Parse block
                const indexOfClose = lines.lastIndexOf(")");
                console.log(lines.slice(i+1, indexOfClose))
                const parsedBlock = parseCommandsInner(lines.slice(i+1, indexOfClose));

                for (let z = 0; z < mult; z++) {
                    out.push(...parsedBlock);
                }
                i = indexOfClose;
                continue;
            }

            const parsedCommands: string[][] = [];
            for (const command of commands) {
                parsedCommands.push(command.split("="));
            }

            for (let z = 0; z < mult; z++) {
                out.push(parsedCommands);
            }
        }
        return out;
    }

    const parseCommands = (input: string) => {
        const lines = input.split(/\r?\n/);
        console.log(lines)
        return parseCommandsInner(lines);
    };

    const applyCurrCommand = () => {
        let kernelDidChange = false;
        for (const command of commands[commandIdx]) {
            switch (command[0]) {
            case "up":
                up = true;
                break;
            case "down":
                down = true;
                break;
            case "left":
                left = true;
                break;
            case "right":
                right = true;
                break;
            case "invert":
                q.invert = true;
                break;
            case "togglePen":
                q.penDown = !q.penDown;
                break;
            case "penUp":
                q.penDown = false;
                break;
            case "penDown":
                q.penDown = true;
                break;
            case "kernelSize":
                q.kernelSize = parseInt(command[1]);
                kernelDidChange = true;
                break;
            case "kernelParam":
                q.kernelSize = parseInt(command[1]);
                kernelDidChange = true;
                break;
            case "kernelMode":
                q.kernelMode = command[1];
                kernelDidChange = true;
                break;
            case "kernelColor":
                const rgb = command[1].split(',')
                q.kernelColor = [parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])];
                kernelDidChange = true;
                break;
            }
        }
        if (kernelDidChange)
            drawKernel();
        commandIdx = (commandIdx + 1) % commands.length;
    };

    // MARK -- Kernels
    const solid = () => {
        kernel.noStroke();
        kernel.rect(0, 0, q.kernelSize, q.kernelSize);
    };

    const dots = (size: number) => {
        kernel.noStroke();
        for (let x = 0; x < q.kernelSize; x += 2 * size) {
            for (let y = 0; y < q.kernelSize; y += 2 * size) {
                kernel.rect(x, y, size);
            }
        }

    };

};
new p5(sketch, document.body);