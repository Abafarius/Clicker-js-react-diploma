import React from 'react';

function EventPopup({ event, onAccept, onDecline, onOk, countdown, aiComment, storyInfo }) {
  if (!event) return null;

  const { message = {}, choice, choices = choice, rarity = 'common' } = event;
  const acceptText = typeof choices?.accept === 'string' ? choices.accept : 'Принять';
  const declineText = typeof choices?.decline === 'string' ? choices.decline : 'Отклонить';

  // Определяем CSS-класс кнопки в зависимости от rarity
  const rarityClass = {
    common: 'btn btn-common',
    rare: 'btn btn-rare',
    epic: 'btn btn-epic'
  }[rarity] || 'btn';

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
          <button className={rarityClass} onClick={onAccept}>{acceptText}</button>
          <button className={rarityClass} onClick={onDecline}>{declineText}</button>
        </div>
      ) : (
        <div className="event-buttons">
          <button className={rarityClass} onClick={onOk}>OK</button>
        </div>
      )}
    </div>
  );
}

export default EventPopup;