export default function Button({
  children,
  active = false,
  onClick,
  type = "button",
  className = "text-white bg-gray-300 rounded-xl p-1"
}) {
  return (
    <button
      className={`mx-0.5 px-4 font-cute
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
