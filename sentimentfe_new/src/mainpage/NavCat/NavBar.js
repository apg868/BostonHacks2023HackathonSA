import React from 'react';

function NavBar() {
  // Inline styles
  const navbarStyle = {
    width: '100%',
    backgroundColor: '#333',
    overflow: 'hidden',
    height: '50px',
  };

  const tickerWrapStyle = {
    width: '100%',
    overflow: 'hidden',
  };

  const tickerStyle = {
    display: 'flex',
    whiteSpace: 'nowrap',
    animation: 'ticker 50s linear infinite',
  };

  const tickerItemStyle = {
    padding: '0 2rem',
    color: 'white',
    lineHeight: '50px',
  };

  // Create an array of ticker items
  const tickerItems = ["AAPL", "AMD", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "V", "JPM", "MSFT", "FB", "INTC", "CSCO", "CMCSA", "PEP", "ADBE", "NFLX", "PYPL", "COST", "AVGO", "TXN", "CHTR", "QCOM", "SBUX", "INTU", "MDLZ", "ISRG", "FISV", "GILD", "JD"];

  return (
    <>
      <style>
        {`
          @keyframes ticker {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
        `}
      </style>
      <div style={navbarStyle}>
        <div style={tickerWrapStyle}>
          <div style={tickerStyle}>
            {tickerItems.map((item, index) => (
              <div key={index} style={tickerItemStyle}>{item}</div>
            ))}
            {/* Duplicate items for seamless looping */}
            {tickerItems.map((item, index) => (
              <div key={index + tickerItems.length} style={tickerItemStyle}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
