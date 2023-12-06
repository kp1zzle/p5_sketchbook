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
uniform bool u_invert;
uniform vec2 u_kernelResolution;
uniform sampler2D u_kernel;


varying vec2 vTexCoord;


void main() {
    vec2 singlePixel = 1.0 / u_resolution;
    vec2 coord = vTexCoord;
    if (u_moveUp) {
        coord.y -= singlePixel.y;
    }

    if (u_moveDown) {
        coord.y += singlePixel.y;
    }

    if (u_moveLeft) {
        coord.x -= singlePixel.x;
    }

    if (u_moveRight) {
        coord.x += singlePixel.x;
    }

    coord = mod(coord, vec2(1,1));

    gl_FragColor = texture2D(u_pixelArray, coord);


    vec2 kernelRatio = u_kernelResolution / u_resolution;
    if (vTexCoord.x > (0.5 - kernelRatio.x) && vTexCoord.x < (0.5 + kernelRatio.y)
            && vTexCoord.y > (0.5 - kernelRatio.y) && vTexCoord.y < (0.5 + kernelRatio.y)) {
        gl_FragColor = vec4(0, 0, 0, 1);
    }

    if (u_invert) {
        gl_FragColor = vec4(1.0 - gl_FragColor.r,1.0 -gl_FragColor.g,1.0 -gl_FragColor.b,1);
    }


}

