import React, { useEffect, useState } from "react";

const SceneWipeTransition = ({ trigger }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setActive(true);
      // The timer here ensures the wipe stays active long enough for the navigation to complete
      const timer = setTimeout(() => setActive(false), 1300); // Match WipeContext's total duration
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className={`scene-wipe-container ${active ? "active" : ""}`}>
      <div className="scene-wipe left" />
      <div className="scene-wipe right" />
    </div>
  );
};

export default SceneWipeTransition;