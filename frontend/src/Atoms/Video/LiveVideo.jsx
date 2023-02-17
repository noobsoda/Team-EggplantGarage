import React from "react";
import OpenViduVideoComponent from "./OvVideo";

export default function LiveVideo({ streamManager }) {
  return (
    <>
      {streamManager !== undefined ? (
        <OpenViduVideoComponent streamManager={streamManager} />
      ) : null}
    </>
  );
}
