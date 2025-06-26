import React from 'react';
import './EventPopup.css';

function EventPopup({ event, onAccept, onDecline, onOk, countdown, aiComment, storyInfo }) {
  if (!event) return null;

  const { message = {}, choice, choices = choice, rarity = 'common' } = event;
  const acceptText = typeof choices?.accept === 'string' ? choices.accept : 'Принять';
  const declineText = typeof choices?.decline === 'string' ? choices.decline : 'Отклонить';

  return (
    <div className={`event-popup event-${rarity}`}>
      <p>{message}</p>

      {storyInfo && (
        <div className="story-info">{storyInfo}</div>
      )}

      {countdown !== null && (
        <div className="event-timer">⏳ Осталось: {countdown} сек</div>
      )}

      {aiComment && (
        <div className="ai-comment">{aiComment}</div>
      )}

      {choices && choices.accept && choices.decline ? (
        <div className="event-buttons">
          <button onClick={onAccept}>{acceptText}</button>
          <button onClick={onDecline}>{declineText}</button>
        </div>
      ) : (
        <div className="event-buttons">
          <button onClick={onOk}>OK</button>
        </div>
      )}
    </div>
  );
}

export default EventPopup;
