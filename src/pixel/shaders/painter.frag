precision highp float;

#define MAX_EFFECTS 10

uniform vec2 u_resolution;
uniform sampler2D u_pixelArray;
uniform bool u_moveUp;
uniform bool u_moveDown;
uniform bool u_moveLeft;
uniform bool u_moveRight;
uniform bool u_invert;
uniform vec2 u_kernelResolution;
uniform sampler2D u_kernel;
uniform bool u_penDown;
uniform float u_frameMultiplier;

varying vec2 vTexCoord;

vec4 lerpBlend(vec4 top, vec4 back) {
    return vec4((top.rgb * top.a + back.rgb * (1. - top.a)), 1);
}

void main() {
    vec2 singlePixel = u_frameMultiplier / u_resolution;
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

    if (u_penDown) {
        vec2 kernelRatio = u_kernelResolution / u_resolution;
        vec2 kernelEdges = vec2(0.5 - kernelRatio.x/2., 0.5 - kernelRatio.y/2.);
        vec2 kernelTexCoord = (coord - kernelEdges) / kernelRatio;
        if (vTexCoord.x >= kernelEdges.x && vTexCoord.x < kernelEdges.x + kernelRatio.x
        && vTexCoord.y >= kernelEdges.y && vTexCoord.y < kernelEdges.y + kernelRatio.y) {
            gl_FragColor = lerpBlend(texture2D(u_kernel, kernelTexCoord), gl_FragColor);
        }
    }


    if (u_invert) {
        gl_FragColor = vec4(1.0 - gl_FragColor.r,1.0 -gl_FragColor.g,1.0 -gl_FragColor.b,1);
    }


}

