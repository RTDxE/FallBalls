"use strict";/*!
 * @pixi/filter-color-overlay - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-color-overlay is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@pixi/core"),t=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,i=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec3 color;
uniform float alpha;

void main(void) {
    vec4 currentColor = texture2D(uSampler, vTextureCoord);
    gl_FragColor = vec4(mix(currentColor.rgb, color.rgb, currentColor.a * alpha), currentColor.a);
}
`;class n extends e.Filter{constructor(r=0,o=1){super(t,i),this._color=0,this._alpha=1,this.uniforms.color=new Float32Array(3),this.color=r,this.alpha=o}set color(r){const o=this.uniforms.color;typeof r=="number"?(e.utils.hex2rgb(r,o),this._color=r):(o[0]=r[0],o[1]=r[1],o[2]=r[2],this._color=e.utils.rgb2hex(o))}get color(){return this._color}set alpha(r){this.uniforms.alpha=r,this._alpha=r}get alpha(){return this._alpha}}exports.ColorOverlayFilter=n;
//# sourceMappingURL=filter-color-overlay.js.map