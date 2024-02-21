precision highp float;
#include "../../helpers/lygia/generative/fbm.glsl"

uniform float u_zoom;

varying vec2 vTexCoord;

vec4 lerpBlend(vec3 top, vec3 back, float a) {
    return vec4((top.rgb * a + back.rgb * (1. - a)), 1);
}

void main() {
    vec2 coord = vTexCoord * u_zoom;
    float v = (fbm(coord) + 1.)*2.;
    vec3 color1 = vec3(79.0/255., 130.0/255., 29.0/255.);
    vec3 color2 = vec3(0,0,0);


    gl_FragColor = lerpBlend(color1, color2, v);

}

