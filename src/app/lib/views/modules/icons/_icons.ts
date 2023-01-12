export const _avatar = (
  color: string,
  width: string | number,
  height: string | number,
  stroke = "none",
  backgroundColor?: string
) => `
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="${width}" height="${height}" viewBox="0 0 530.000000 530.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,530.000000) scale(0.100000,-0.100000)"
fill="${color}" stroke="${stroke}">
<path d="M2541 4669 c-206 -24 -372 -101 -515 -238 -240 -231 -350 -587 -333
-1076 13 -355 57 -533 215 -860 l97 -199 0 -265 0 -265 -595 -248 c-327 -136
-638 -268 -690 -294 -75 -36 -196 -102 -219 -120 -11 -9 153 -199 283 -329
355 -354 755 -580 1238 -699 227 -56 321 -66 628 -66 370 0 528 24 840 126
383 126 745 349 1035 639 100 99 275 306 275 324 0 10 -124 80 -240 136 -52
25 -358 155 -680 289 l-585 243 0 260 0 259 97 199 c180 372 226 590 215 1018
-7 300 -42 470 -137 662 -145 293 -387 464 -715 504 -100 12 -108 12 -214 0z"/>
</g>
</svg>
`;
