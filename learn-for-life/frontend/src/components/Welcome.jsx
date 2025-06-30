import React from 'react';
import { useWipe } from './WipeContext';

function Welcome() {
  const { wipeNavigate } = useWipe();

  const handleEnterClick = () => {
    const audio = new Audio('/the-force.mp3');
    audio.volume = 1.0;
    audio.play();

    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    wipeNavigate('/login');
  };

  return (
    <div className="star-wars-welcome">
      <div className="welcome-hyperspace" />
      <div className="star-wars-background"></div>
      <div className="star-wars-intro">
        <p className="intro-text">A long time ago in a galaxy far, far away...</p>
      </div>
      <div className="star-wars-crawl">
        <div className="crawl-content">
          <h1>Век живи — век учись</h1>
          <p>
            В далёкой галактике, охваченной информационным штормом, молодой ученик отправляется в путь познания.
            <br /><br />
            На каждом уровне его ждут великие испытания: экзамены, дедлайны, проекты... и неизбежный кофеин.
            <br /><br />
            Только преодолев все эпохи, он сможет достичь титула Великого Учёного, способного пробудить знания в других.
            <br /><br />
            Республика науки ждёт нового героя. Его зовут...
          </p>
        </div>
      </div>
      <button
        className="enter-button"
        onClick={handleEnterClick}
        onMouseEnter={() => {
          const audio = new Audio('/saber-hover.mp3');
          audio.volume = 0.5;
          audio.play();
        }}
      >
        Войти в галактику знаний
      </button>
    </div>
  );
}

export default Welcome;



