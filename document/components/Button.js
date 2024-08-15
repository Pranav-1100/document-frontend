export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`bg-secondary hover:bg-accent text-text font-bold py-2 px-4 rounded transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}