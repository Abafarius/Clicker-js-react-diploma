import React from 'react';


function EventLogModal({ onClose, eventLog = [] }) {
  return (
    <div className="event-log-modal">
      <div className="modal-content">
        <h2>📜 История событий</h2>
        <button className="close-log-button" onClick={onClose}>Закрыть</button>
        
        <div className="event-log-list">
          {eventLog.length === 0 ? (
            <p>Пока нет записей</p>
          ) : (
            eventLog.map((log, index) => (
              <div key={index} className="event-log-entry">
                <p><strong>{new Date(log.timestamp).toLocaleTimeString()}</strong></p>
                <p>{log.type === 'choice'
                  ? `Вы выбрали: ${log.outcome}`
                  : 'Событие завершено'}
                </p>
                <p>{log.message}</p>
                {log.reward && (
                  <p>
                    🎁 Награды:
                    {log.reward.xp ? ` XP: ${log.reward.xp}` : ''}
                    {log.reward.knowledge ? ` | Знания: ${log.reward.knowledge}` : ''}
                    {log.reward.reputation ? ` | Репутация: ${log.reward.reputation}` : ''}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default EventLogModal;
