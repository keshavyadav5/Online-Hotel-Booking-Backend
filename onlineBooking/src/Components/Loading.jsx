import React, { useState } from 'react';
import HashLoader from "react-spinners/HashLoader";

function Loading() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div >
      <div className="sweet-loading text-center">
        <HashLoader
          color={'#0000000'} 
          loading={loading}
          css={override} 
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loading;
