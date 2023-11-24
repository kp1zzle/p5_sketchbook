precision highp float;
#include "../../helpers/lygia/generative/snoise.glsl"
#include "../../helpers/lygia/generative/worley.glsl"

#define MAX_EFFECTS 10

uniform vec2 u_resolution;
uniform sampler2D u_pixelArray;
uniform float u_time;
uniform bool u_moveUp;
uniform bool u_moveDown;
uniform bool u_moveLeft;
uniform bool u_moveRight;


varying vec2 vTexCoord;


void main() {
    vec2 singlePixel = 1.0 / u_resolution;
    vec2 coord = vTexCoord;
    if (u_moveUp) {
        coord.y += singlePixel.y;
    }

    if (u_moveDown) {
        coord.y -= singlePixel.y;
    }

    if (u_moveLeft) {
        coord.x += singlePixel.x;
    }

    if (u_moveRight) {
        coord.x -= singlePixel.x;
    }

    coord = mod(coord, vec2(1,1));

    gl_FragColor = texture2D(u_pixelArray, coord);

    if (vTexCoord.x > 0.48 && vTexCoord.x < 0.52 && vTexCoord.y > 0.48 && vTexCoord.y < 0.52) {
        gl_FragColor = vec4(0, 0, 0, 1);
    }


}

