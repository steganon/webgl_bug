console.log(tokenData.hash)

let fs = `
precision highp float;
uniform vec2 iRes;
uniform sampler2D iChannel1;

void main()
{
  vec2 uv = gl_FragCoord.xy / iRes.xy;
  uv.y = 1.-uv.y;
  gl_FragColor = vec4(uv,0.,1.);
  gl_FragColor = texture2D(iChannel1, uv);
}
`
let vs = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}
`

let DIM=[800,450];//640,360];
let sh;
let img;
let pg;
let c;

function preload(){
  img = loadImage('tsccWr.jpg')
}
function setup() {
  c = createCanvas(DIM[0],DIM[1],WEBGL);
  pg = createGraphics(DIM[0],DIM[1]);
  sh = createShader(vs,fs);
  noStroke();
  pg.noStroke();
  //pg.image(img,-DIM[0]/2,-DIM[1]/2,width,height)
  pg.image(img,0,0,width,height)

//	noLoop()
}

function draw() {
    shader(sh)
    sh.setUniform('iRes', DIM);
    sh.setUniform('iChannel1', pg);
    sh.setUniform('iFrame', frameCount);
    //rect(-DIM[0]/2,-DIM[1]/2,width,height)
    rect(0,0,width,height)
    pg.image(c.get(),0,0,width,height)
}
