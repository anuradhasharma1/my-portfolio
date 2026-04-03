'use client'

export default function Footer() {
  return (
    <footer className="footer-wrap">

      <div className="footer-inner">

        {/* left text */}
        <div className="footer-copy">
          <p>© 2026 Anuradha Sharma ~ made with 💕</p>
        </div>

        {/* cat */}
        <div className="cat-area">

          <div className="cat-bubble">
            meow~
          </div>

          <svg
          
            width="58"
            height="58"
            viewBox="0 0 160 160"
            shapeRendering="crispEdges"
          >
           
            <g id="cat-tail">
              <rect x="110" y="90" width="8" height="8" fill="#fff" />
              <rect x="118" y="82" width="8" height="8" fill="#fff" />
              <rect x="126" y="74" width="8" height="8" fill="#fff" />
            </g>

            
            <rect x="50" y="80" width="60" height="40" fill="#fff" />
            <rect x="55" y="40" width="50" height="40" fill="#fff" />

           
            <rect x="55" y="25" width="12" height="12" fill="#fff" />
            <rect x="93" y="25" width="12" height="12" fill="#fff" />

            
            <g id="eye-sleep">
              <rect x="68" y="58" width="6" height="2" fill="#000" />
              <rect x="86" y="58" width="6" height="2" fill="#000" />
            </g>
            <g id="eye-awake">
              <rect x="68" y="55" width="6" height="6" fill="#000" />
              <rect x="86" y="55" width="6" height="6" fill="#000" />
            </g>
            <rect x="77" y="68" width="6" height="4" fill="#ff8fab" />

            <rect x="65" y="120" width="10" height="6" fill="#fff" />
            <rect x="85" y="120" width="10" height="6" fill="#fff" />
          </svg>

        </div>

      </div>

    </footer>
  )
}