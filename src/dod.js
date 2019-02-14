import {Entity} from 'aframe-react';
import React from 'react';

// http://dmccooey.com/polyhedra/PentakisDodecahedron.txt
const c1 = 1.33058699733550141141687582919;
const c2 = 2.15293498667750705708437914596;

// in ordered, opposite pairs
const verts = [
  [0.0,  -c2,   c1],
  [0.0,   c2,  -c1],
  [ c2,  -c1,  0.0],
  [-c2,   c1,  0.0],
  [0.0,  -c2,  -c1],
  [0.0,   c2,   c1],
  [-c2,  -c1,  0.0],
  [ c2,   c1,  0.0],
  [-c1,  0.0,   c2],
  [ c1,  0.0,  -c2],
  [ c1,  0.0,   c2],
  [-c1,  0.0,  -c2],
];

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return rgbToHex({
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  });
}

function rgbToHex({r, g, b}) {
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const Dod = ({ rep = 1, sat, stack = [] }) =>
  <Entity position="0 0 0">
    {verts.map((v, i) =>
      <Entity
        key={i}
        color={HSVtoRGB(i * (1 / 12), sat || 1, 1)}
        events={{ click: () => console.log(i) }}
        primitive="a-sphere"
        position={v.join(' ')}
        scale={[1, 1, 1].map(n => 0.3 * n/rep).join(' ')}
      />)}

    {rep < 3 && verts.map((v, i) =>
      <Entity
        key={i}
        position={v.map(n => n * 2).join(' ')}
        text={`color: ${HSVtoRGB((stack.length ? stack[stack.length - 1] : i) * (1 / 12), 1, 1)}; align: center; value: ${[...stack, i].join(',')}; width: 5; zOffset: ${1/stack[stack.length-1]}`}
      >
        <Dod rep={rep+1} sat={0.3} stack={[...stack, i]} />
      </Entity>)
      // .filter((n, i) => i % 2)
    }
  </Entity>;

export default Dod;