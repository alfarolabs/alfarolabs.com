export function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-art" />
      <div className="scene-pixels" />
      <div className="scene-stars" />
      <div className="scene-motes" />
      <div className="scene-shade" />
      <svg width="0" height="0">
        <filter id="deckle" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );
}
