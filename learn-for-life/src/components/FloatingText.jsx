function FloatingText({ text, x, y }) {
  return (
    <span
      className="floating-text"
      style={{
        left: x,
        top: y
      }}
    >
      {text}
    </span>
  );
}

export default FloatingText;
