export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "rounded-xl font-medium transition-all duration-200 focus:outline-none";

  const variants = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg",
    secondary:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-purple-600 hover:bg-purple-50",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}