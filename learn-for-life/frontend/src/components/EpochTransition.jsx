import React, { useEffect, useState } from 'react';

function EpochTransition({ currentEpoch, visible, onComplete }) {
  const [show, setShow] = useState(false);
  const totalDelay = `Новая эпоха: ${currentEpoch}`.length * 100 + 50;
  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
  setShow(false);
  onComplete?.();
}, totalDelay); // длительность анимации
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const renderAnimatedText = (text) => {
    return text.split('').map((char, i) => (
      <span
  key={i}
  className="epoch-letter"
  style={{ '--i': i }}
>
  {char === ' ' ? '\u00A0' : char}
</span>
    ));
  };

  return (
    show && (
      <div className={`epoch-transition epoch-${currentEpoch}`}>
        <h1 className="epoch-title no-border">
          {renderAnimatedText(`Новая эпоха: ${currentEpoch}`)}
        </h1>
      </div>
    )
  );
}

export default EpochTransition;
