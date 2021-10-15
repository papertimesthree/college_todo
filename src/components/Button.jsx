export default function Button({
  children,
  active = false,
  onClick,
  type = "button",
  className = ""
}) {
  return (
    <button
      className={`mx-0.5 px-2 border 
      ${
        active ? "bg-blue-500 text-white" : "text-gray-700"
      } duration-500 ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
