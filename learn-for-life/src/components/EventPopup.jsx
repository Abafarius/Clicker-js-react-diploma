import './EventPopup.css';

function EventPopup({ event, onAccept, onDecline, onOk }) {
  const rarityClass = `event-popup event-${event.rarity || 'common'}`;

  return (
    <div className={rarityClass}>
      <p>{event.message}</p>

      {event.type === 'choice' ? (
        <div className="event-buttons">
          <button onClick={onAccept}>Принять ✅</button>
          <button onClick={onDecline}>Отказаться ❌</button>
        </div>
      ) : (
        <div className="event-buttons">
          <button onClick={onOk}>Ок ✨</button>
        </div>
      )}
    </div>
  );
}

export default EventPopup;
