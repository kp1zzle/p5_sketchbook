import * as p5 from "p5";
import QuickSettings from "quicksettings";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {VideoRecorder} from "./p5.videorecorder";

export function initSketch(quicksettingsEnabled = true, inputCommands: string[] = [], penStartsDown = true, manualModeEnabledAtStart = true, background = [255, 255, 255]) {
    return (s: p5) => {
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
        const kernelModes = ["solid", "dots", "triangle"];
        const q = {
            bufWidth: 500,
            bufHeight: 500,
            kernelSize: 10,
            frameMultiplier: 1,
            invert: false,
            penDown: penStartsDown,
            kernelMode: "solid",
            kernelColor: [40, 3, 252],
            kernelParam: 2,
            manualModeEnabled: manualModeEnabledAtStart,
        };
        let settings: any;

        s.setup = () => {
            s.createCanvas(s.min(s.windowWidth, s.windowHeight), s.min(s.windowWidth, s.windowHeight));
            s.noSmooth();
            buf = s.createGraphics(q.bufWidth, q.bufHeight, s.WEBGL);
            buf.rectMode(s.CENTER);
            buf.noStroke();
            buf.background(background);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            shader = buf.createShader(require("../pixel/shaders/painter.vert"), require("../pixel/shaders/painter.frag"));

            kernel = s.createGraphics(q.kernelSize, q.kernelSize);
            drawKernel();

            videoRecorder = new VideoRecorder(s, undefined, "mp4");
            videoRecorder.onFileReady = () => {
                videoRecorder.save(document.title + "_" + (new Date).toISOString());
            };

            if (quicksettingsEnabled)
                initQuicksettings();

            s.frameRate(60);

            if (inputCommands.length > 0) {
                commands = parseCommandsInner(inputCommands);
            }
        };

        const initQuicksettings = () => {
            settings = QuickSettings.create(10, 10, "settings");
            settings.hide();
            settings.bindRange("bufWidth", 0, 1000, q.bufWidth, 1,  q);
            settings.bindRange("frameMultiplier", 1, 10, q.frameMultiplier, 1,  q);
            settings.addRange("kernelSize", 1, 100, q.kernelSize, 1, (num: number) => {
                q.kernelSize = num;
                drawKernel();
            });

            settings.addDropDown("kernel mode", kernelModes, (selection: any) => {
                q.kernelMode = selection.value;
                drawKernel();
            });
            settings.addButton("invert", () => {
                q.invert = true;
            });
            settings.addButton("toggle pen up/down", () => {
                q.penDown = !q.penDown;
            });
            settings.addRange("kernelParam", 1, 100, q.kernelParam, 1,  (num: number) => {
                q.kernelParam = num;
                drawKernel();
            });
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

            settings.bindBoolean("manual mode", q.manualModeEnabled, q);
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
            case "triangle":
                triangle(q.kernelParam);
                break;
            }
        };

        s.draw = () => {
            s.background(background);
            if (commands.length > 0) {
                applyCurrCommand();
            }
            shader.setUniform("u_resolution", [q.bufWidth, q.bufHeight]);
            shader.setUniform("u_pixelArray", buf);
            shader.setUniform("u_kernel", kernel);
            shader.setUniform("u_kernelResolution", [q.kernelSize, q.kernelSize]);
            shader.setUniform("u_moveUp",  manualModeAndKeyDown(87) || up);
            shader.setUniform("u_moveDown", manualModeAndKeyDown(83) || down);
            shader.setUniform("u_moveLeft", manualModeAndKeyDown(65) || left);
            shader.setUniform("u_moveRight", manualModeAndKeyDown(68) || right);
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
            s.image(buf, 0, 0, s.width, s.height);

            if (!q.penDown) {
                const kernelDrawSize = s.min(s.width, s.height) / q.bufWidth * q.kernelSize;
                s.image(kernel, s.width / 2 - kernelDrawSize / 2, s.height / 2 - kernelDrawSize / 2, kernelDrawSize, kernelDrawSize);
            }
        };

        s.mouseClicked = () => {
        };

        s.mouseDragged = () => {
        };

        s.windowResized = () => {
            s.resizeCanvas(s.min(s.windowWidth, s.windowHeight), s.min(s.windowWidth, s.windowHeight));

        };

        s.keyPressed = () => {
            if (s.keyCode === s.ESCAPE) {
                settings.toggleVisibility();
            }

            if (q.manualModeEnabled) {
                if (s.key == "e") {
                    q.frameMultiplier++;
                }
                if (s.key == "q") {
                    q.frameMultiplier--;
                }
                if (s.key == " ") {
                    q.kernelMode = s.random(kernelModes);
                    drawKernel();
                }
                if (s.key == "r") {
                    q.invert = true;
                }
                if (s.key == "f") {
                    q.penDown = !q.penDown;
                }
                if (s.key == "=") {
                    q.kernelParam--;
                    drawKernel();
                }
                if (s.key == "-") {
                    q.kernelParam++;
                    drawKernel();
                }
                if (s.key == "0") {
                    q.kernelColor = [0, 0, 0];
                    drawKernel();
                }
                if (s.key == "9") {
                    q.kernelColor = [40, 3, 252];
                    drawKernel();
                }
                if (s.key == "8") {
                    q.kernelColor = [224, 6, 245];
                    drawKernel();
                }
                if (s.key == "7") {
                    q.kernelColor = [200, 245, 66];
                    drawKernel();
                }
                if (s.key == "6") {
                    q.kernelColor = [227, 7, 7];
                    drawKernel();
                }
                if (s.key == "5") {
                    q.kernelColor = [79, 196, 100];
                    drawKernel();
                }
            }

        };

        function manualModeAndKeyDown(code: number): boolean {
            return q.manualModeEnabled &&s .keyIsDown(code);
        }

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
                    // Parse block
                    const indexOfClose = lines.lastIndexOf(")");
                    const parsedBlock = parseCommandsInner(lines.slice(i + 1, indexOfClose));

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
        };

        const parseCommands = (input: string) => {
            const lines = input.split(/\r?\n/);
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
                case "frameMultiplier":
                    q.frameMultiplier = parseInt(command[1]);
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
                    const rgb = command[1].split(",");
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

        const triangle = (corner: number) => {
            kernel.noStroke();
            const corners = [[0, 0], [q.kernelSize, 0], [q.kernelSize, q.kernelSize], [0, q.kernelSize]];
            const pt1 = corners[corner % 4];
            const pt2 = corners[(corner + 1) % 4];
            const pt3 = corners[(corner + 2) % 4];
            kernel.triangle(pt1[0], pt1[1], pt2[0], pt2[1], pt3[0], pt3[1]);
        };
    };
}