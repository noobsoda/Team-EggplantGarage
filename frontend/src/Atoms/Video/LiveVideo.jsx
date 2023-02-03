import React from "react";
import OpenViduVideoComponent from "./OvVideo";

export default function LiveVideo({ streamManager }) {
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <h1>hi</h1>
          <OpenViduVideoComponent streamManager={streamManager} />
        </div>
      ) : null}
    </div>
  );
}
