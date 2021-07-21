import React, { useEffect, useRef, useState } from "react";
import IframeResizer from "iframe-resizer-react";

const MetabaseAppEmbed = ({
  base = "",
  path = "/",
  onMessage,
  onLocationChange,
  onFrameChange,
}) => {
  // ref for the iframe HTML element
  const iframeEl = useRef(null);
  // ref for the current `src` attribute
  const src = useRef(`${base}${path}`);
  // ref for the current location, as reported via postMessage
  const location = useRef(null);
  const [frame, setFrame] = useState();

  // setup postMessage listener
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.source === iframeEl.current.contentWindow && e.data.metabase) {
        // sync the location ref
        if (e.data.metabase.type === "location") {
          const { pathname, search, hash } = e.data.metabase.location;
          location.current = [pathname, search, hash].join("");
          if (onLocationChange) {
            onLocationChange(e.data.metabase.location);
          }
        } else if (e.data.metabase.type === "frame") {
          setFrame(e.data.metabase.frame);
          if (onFrameChange) {
            onFrameChange(e.data.metabase.frame);
          }
        }
        if (onMessage) {
          onMessage(e.data.metabase);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (location.current == null) {
    // location syncing not enabled, update src
    src.current = `${base}${path}`;
  } else if (location.current !== path) {
    // location syncing enabled, use postMessage to update location
    iframeEl.current.contentWindow.postMessage(
      {
        metabase: {
          type: "location",
          location: path,
        },
      },
      // FIXME SECURITY: use whitelisted origin instead of "*"
      "*"
    );
  }

  return (
    <IframeResizer
      log
      forwardRef={iframeEl}
      sizeHeight
      checkOrigin={false}
      bodyBackground="transparent"
      src={src.current}
      title="Metabase"
      frameBorder="0"
      style={{ width: "1px", minWidth: "100%" }}
      allowtransparency
    />
  );
};

export default MetabaseAppEmbed;
