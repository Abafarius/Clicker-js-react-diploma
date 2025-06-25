import React from 'react';
import './EventPopup.css';

function EventPopup({ event, onAccept, onDecline, onOk, storyInfo }) {
  if (!event) return null;

  const { message, effect = {}, choice, choices = choice, rarity = 'common' } = event;
  const acceptText =
    typeof choices?.accept === 'string' ? choices.accept : 'Принять';
  const declineText =
    typeof choices?.decline === 'string' ? choices.decline : 'Отклонить';

  return (
    <div className={`event-popup event-${rarity}`}>
      {storyInfo && <div className="story-indicator-popup">{storyInfo}</div>}
      <p>{message}</p>

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
