import { useState } from "react";
import { Circles } from "react-loader-spinner";

export default function UseLoading(state) {
  const [loading, setLoading] = useState(state || false);

  const loadingAnimation = loading && (
    <>
      <Circles
        height="80"
        width="80"
        radius="9"
        color="white"
        ariaLabel="loading"
      />
      <p>Generating..</p>
    </>
  );

  return [loadingAnimation, setLoading];
}
