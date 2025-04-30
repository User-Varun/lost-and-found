function SortButton({ children, currentFilter, setFilter }) {
  const isActive = currentFilter === children;

  return (
    <button
      onClick={() => setFilter(children)}
      style={{
        padding: "8px 12px",
        margin: "5px",
        backgroundColor: isActive ? "purple" : "#ddd",
        color: isActive ? "white" : "black",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export default SortButton;
