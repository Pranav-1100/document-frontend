const Input = ({ ...props }) => {
    return (
      <input
        className="w-full p-2 mb-4 bg-background border border-secondary rounded text-text focus:outline-none focus:border-accent"
        {...props}
      />
    );
  };
  
  export default Input;