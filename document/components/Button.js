const Button = ({ children, ...props }) => {
    return (
      <button
        className="bg-primary hover:bg-secondary text-text font-bold py-2 px-4 rounded transition duration-300"
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;