import init, {p5SVG} from "p5.js-svg";
import * as P5 from "p5";
import {defaultKeys} from "./helpers/key_pressed";
import QuickSettings from "quicksettings";
import {setAspectRatioStr} from "./helpers/aspect_ratio";

// Description: Why not build 2D particle system?
// Date: 1/16/24 19:17:51Z

const q = {
    param: 3,
};
const settings = QuickSettings.create(10, 10, "settings");
settings.hide();
settings.bindNumber("param", 0, 1000, q.param, 1, q);

init(P5);
const sketch = (s: p5SVG) => {
    let system: ParticleSystem;
    
    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        settings.addText("Aspect Ratio", "11x14", (aspect: string) => {
            setAspectRatioStr(s, aspect);
        });
        system = new ParticleSystem();
        system.addBody(s.width/4, 400, 30);
        system.addBody(s.width/2, s.height/2, -10);
        system.addBody(s.width*3/4, 500, 30);
        // system.addBody(1200, 600, 15);
    };

    s.draw = () => {
        s.background(0);
        system.update();
        system.draw(s);
        system.addParticle(s.width/2, s.height - 100);
    };

    s.mouseClicked = () => {
        system.addParticle(s.mouseX, s.mouseY);
    };

    s.keyPressed = () => {
        defaultKeys(s, sketch);

        if (s.keyCode === s.ESCAPE || s.key === "q") {
            settings.toggleVisibility();
        }
    };

};

class Particle {
    velocity: P5.Vector;
    pos: P5.Vector;

    constructor(x: number, y: number) {
        this.pos = new P5.Vector(x, y);
        this.velocity = P5.Vector.random2D().normalize();
    }

    run = (bodies: Body[]) => {

        const a = new P5.Vector(0, 0);

        for (const b of bodies) {
            const r = P5.Vector.sub(b.pos, this.pos);
            const r_unit = P5.Vector.normalize(r);
            a.add(r_unit.mult(b.mass/r.mag()));
        }

        this.velocity.add(a);
        this.pos.add(this.velocity);
    };

    draw = (s: p5SVG) => {
        // s.fill(255);
        s.noFill();
        s.stroke(255);
        s.ellipse(this.pos.x, this.pos.y, 6, 6);
    };

}

class Body {
    mass: number;
    pos: P5.Vector;

    constructor(x: number, y: number, mass: number) {
        this.mass = mass;
        this.pos = new P5.Vector(x, y);
    }
}

class ParticleSystem {
    particles: Particle[];
    bodies: Body[];

    constructor() {
        this.particles = [];
        this.bodies = [];
    }

    update = () => {
        for (const p of this.particles) {
            p.run(this.bodies);
        }
    };

    draw = (s: p5SVG) => {
        for (const p of this.particles) {
            p.draw(s);
        }
    };

    addParticle = (x: number, y: number) => {
        this.particles.push(new Particle(x, y));
    };

    addBody = (x: number, y: number, mass: number) => {
        this.bodies.push(new Body(x, y, mass));
    };

}


new P5(sketch, document.body);