/* EXPERIENCE SCENES — illustrated animated landscapes drawn in SVG/CSS.
   Each fills the card; the existing shade gradient sits on top for text legibility.
   All motion is gentle + decorative; static-but-complete under reduced motion. */

function Scene({ type }) {
  if (type === "desert") return <SceneDesert/>;
  if (type === "mountain") return <SceneMountain/>;
  if (type === "city") return <SceneCity/>;
  if (type === "beach") return <SceneBeach/>;
  if (type === "camp") return <SceneCamp/>;
  return null;
}

/* — Desert: sun, heat haze, parallax dunes, a drifting caravan — */
function SceneDesert() {
  return (
    <div className="scene scene--desert">
      <div className="scene__sky"/>
      <div className="scene__sun"/>
      {[...Array(6)].map((_, i) => <span key={i} className="scene__bird" style={{ ['--i']: i }}/>)}
      <svg className="scene__hills" viewBox="0 0 380 520" preserveAspectRatio="xMidYMax slice">
        <path className="dune dune--3" d="M0 300 C90 250 150 320 230 300 S360 250 380 290 V520 H0 Z"/>
        <path className="dune dune--2" d="M0 360 C100 330 160 400 250 360 S360 330 380 370 V520 H0 Z"/>
        <path className="dune dune--1" d="M0 430 C120 400 180 470 280 430 S360 410 380 440 V520 H0 Z"/>
      </svg>
    </div>
  );
}

/* — Mountain: snow peaks, drifting clouds, falling snow — */
function SceneMountain() {
  return (
    <div className="scene scene--mountain">
      <div className="scene__sky"/>
      <span className="scene__cloud scene__cloud--a"/>
      <span className="scene__cloud scene__cloud--b"/>
      <svg className="scene__hills" viewBox="0 0 380 520" preserveAspectRatio="xMidYMax slice">
        <path className="ridge ridge--far" d="M0 330 L70 250 L130 320 L210 220 L290 310 L350 250 L380 290 V520 H0 Z"/>
        <g className="peakgrp">
          <path className="ridge ridge--mid" d="M0 420 L90 300 L150 380 L230 280 L300 380 L380 320 V520 H0 Z"/>
          <path className="snow" d="M90 300 L70 330 L78 326 L90 340 L104 322 L112 330 Z"/>
          <path className="snow" d="M230 280 L208 318 L218 312 L230 330 L246 308 L256 320 Z"/>
        </g>
        <path className="ridge ridge--near" d="M0 470 L110 390 L200 460 L300 400 L380 450 V520 H0 Z"/>
      </svg>
      {[...Array(14)].map((_, i) => <span key={i} className="scene__snow" style={{ ['--i']: i, left: `${(i*7+5)%100}%` }}/>)}
    </div>
  );
}

/* — City: night sky, moon, parallax skyline, twinkling windows, neon glow — */
function SceneCity() {
  const towers = [
    { x: 12, w: 34, h: 130 }, { x: 50, w: 26, h: 200 }, { x: 82, w: 40, h: 165 },
    { x: 128, w: 30, h: 240 }, { x: 166, w: 44, h: 150 }, { x: 218, w: 28, h: 210 },
    { x: 252, w: 38, h: 185 }, { x: 298, w: 32, h: 255 }, { x: 338, w: 40, h: 175 },
  ];
  return (
    <div className="scene scene--city">
      <div className="scene__sky"/>
      <span className="scene__moon"/>
      {[...Array(16)].map((_, i) => <span key={i} className="scene__star" style={{ left: `${(i*53+11)%96}%`, top: `${(i*29+6)%42}%`, ['--i']: i }}/>)}
      <svg className="scene__hills" viewBox="0 0 380 520" preserveAspectRatio="xMidYMax slice">
        {towers.map((t, i) => (
          <g key={i}>
            <rect className="tower" x={t.x} y={520 - t.h} width={t.w} height={t.h} rx="2"/>
            {[...Array(Math.floor(t.h / 26))].map((_, r) =>
              [...Array(Math.max(1, Math.floor(t.w / 12)))].map((_, c) => (
                <rect key={r + "-" + c} className="win" style={{ ['--i']: (i + r + c) % 7 }}
                  x={t.x + 5 + c * 11} y={520 - t.h + 12 + r * 24} width="5" height="7" rx="1"/>
              ))
            )}
          </g>
        ))}
      </svg>
      <div className="scene__neon"/>
    </div>
  );
}

/* — Beach: sky gradient, sun, shimmering sea, palm fronds — */
function SceneBeach() {
  return (
    <div className="scene scene--beach">
      <div className="scene__sky"/>
      <span className="scene__sun scene__sun--low"/>
      <div className="scene__sea">
        {[...Array(4)].map((_, i) => <span key={i} className="scene__wave" style={{ ['--i']: i, top: `${18 + i*20}%` }}/>)}
      </div>
      <svg className="scene__palm" viewBox="0 0 120 200" preserveAspectRatio="xMinYMax meet">
        <path className="palm-trunk" d="M30 200 C24 150 30 110 40 86" fill="none" stroke="#1a120a" strokeWidth="6" strokeLinecap="round"/>
        <g className="palm-crown">
          <path className="frond" d="M40 86 C70 70 96 66 116 74"/>
          <path className="frond" d="M40 86 C66 60 92 48 110 40"/>
          <path className="frond" d="M40 86 C44 56 50 32 50 12"/>
          <path className="frond" d="M40 86 C18 64 6 46 0 26"/>
          <path className="frond" d="M40 86 C12 78 -2 80 -16 92"/>
        </g>
      </svg>
    </div>
  );
}

/* — Camp: deep night sky, dense stars, shooting star, tent, campfire glow — */
function SceneCamp() {
  return (
    <div className="scene scene--camp">
      <div className="scene__sky"/>
      {[...Array(28)].map((_, i) => <span key={i} className="scene__star scene__star--sm" style={{ left: `${(i*37+7)%97}%`, top: `${(i*23+4)%62}%`, ['--i']: i }}/>)}
      <span className="scene__shoot"/>
      <svg className="scene__hills" viewBox="0 0 380 520" preserveAspectRatio="xMidYMax slice">
        <path className="rock rock--far" d="M0 380 C80 350 150 400 230 370 S360 350 380 380 V520 H0 Z"/>
        <path className="rock rock--near" d="M0 470 C120 440 180 480 280 450 S360 450 380 470 V520 H0 Z"/>
        <g className="tent">
          <path d="M150 470 L196 396 L242 470 Z" className="tent-body"/>
          <path d="M196 396 L196 470" className="tent-seam"/>
          <path d="M188 470 L196 430 L204 470 Z" className="tent-door"/>
        </g>
        <circle className="fire" cx="266" cy="466" r="6"/>
      </svg>
    </div>
  );
}

window.Scene = Scene;
