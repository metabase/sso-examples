import React, { useEffect, useRef } from "react";

import { iframeResizer } from "iframe-resizer";

const MetabaseAppEmbed = ({
  title = "Metabase",
  className,
  style = {},
  base = "",
  path = "/",
  onMessage,
  onLocationChange,
  getAuthUrl,
  navHeight = 0,
}) => {
  // ref for the iframe HTML element
  const iframeEl = useRef(null);
  // ref for the current `src` attribute
  const src = useRef(`${base}${path}`);
  // ref for the current location, as reported via postMessage
  const location = useRef(null);

  // setup iFrameResize
  useEffect(() => {
    const minHeight =
      typeof navHeight === "number"
        ? window.innerHeight - navHeight
        : undefined;
    iframeResizer({ minHeight }, iframeEl.current);
  }, []);

  // setup postMessage listener
  useEffect(() => {
    const handleMessage = e => {
      if (e.source === iframeEl.current.contentWindow && e.data.metabase) {
        // sync the location ref
        if (e.data.metabase.type === "location") {
          const { pathname, search, hash } = e.data.metabase.location;
          location.current = [pathname, search, hash].join("");
        }
        if (onMessage) {
          onMessage(e.data.metabase);
        }
        if (onLocationChange && e.data.metabase.type === "location") {
          onLocationChange(e.data.metabase.location);
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
      "*",
    );
  }

  // on first load replace the src with the auth URL, if any
  if (getAuthUrl && !iframeEl.current) {
    src.current = getAuthUrl(src.current);
  }

  return (
    <iframe
      ref={iframeEl}
      src={src.current}
      title={title}
      className={className}
      style={{ border: "none", width: "100%", ...style }}
    />
  );
};

export default MetabaseAppEmbed;
