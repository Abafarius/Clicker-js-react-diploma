function EventPopup({ event, onAccept, onDecline, onOk }) {
  return (
    <div className="event-popup">
      <p>{event.message}</p>

      {event.type === 'choice' ? (
        <div className="event-buttons">
          <button onClick={onAccept}>Принять</button>
          <button onClick={onDecline}>Отказаться</button>
        </div>
      ) : (
        <button onClick={onOk}>OK</button>
      )}
    </div>
  );
}

export default EventPopup;
