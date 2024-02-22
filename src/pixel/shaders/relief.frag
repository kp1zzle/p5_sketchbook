precision highp float;
#include "../../helpers/lygia/generative/fbm.glsl"

uniform float u_zoom;
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;

varying vec2 vTexCoord;

vec4 lerpBlend(vec3 top, vec3 back, float a) {
    return vec4((top.rgb * a + back.rgb * (1. - a)), 1);
}

void main() {
    vec2 coord = vTexCoord * u_zoom;
    float x = coord.x;
    float y = coord.y;
    float t = u_time;
    // copy pasta from https://piterpasma.nl/articles/wobbly#:~:text=What%20is%20a%20wobbly%20function,Whatever%20you%20can%20dream%20up.
    float v = sin(2.31*x+0.11*t+5.95+2.57*sin(1.73*y-0.65*t+1.87)) + sin(3.09*y-0.28*t+4.15+2.31*sin(2.53*x+0.66*t+4.45))+sin(3.06*x-0.18*t+5.16+2.28*sin(2.27*y+0.71*t+3.97))+sin(5.40*y-0.13*t+4.74+2.83*sin(3.71*x+0.96*t+4.42))/2.;



    gl_FragColor = lerpBlend(u_color1/255., u_color2/255., v);

}

