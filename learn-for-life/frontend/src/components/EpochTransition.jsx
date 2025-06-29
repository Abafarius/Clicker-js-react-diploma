import React, { useEffect, useState } from 'react';


function EpochTransition({ currentEpoch, visible, onComplete }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 4000); // длительность анимации
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    show && (
      <div className={`epoch-transition epoch-${currentEpoch}`}>
        <div className="epoch-title">📚 Новая эпоха: {currentEpoch}</div>
      </div>
    )
  );
}

export default EpochTransition;
