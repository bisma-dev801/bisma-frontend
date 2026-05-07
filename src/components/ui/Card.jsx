export default function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <div
      className={`
        bg-white rounded-2xl p-6 shadow-sm border border-gray-100
        ${hover ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}