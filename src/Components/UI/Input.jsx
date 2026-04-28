import { COMPONENT_STYLES } from '../../styles/designSystem';
const Input = ({ 
  label,
  error,
  className = '', 
  icon: Icon,
  ...props 
}) => {
  const getInputStyle = () => {
    return error ? COMPONENT_STYLES.input.error : COMPONENT_STYLES.input.default;
  };
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-base-content mb-2">
          {Icon && (
            <Icon className="inline mr-2 text-base-content/60" size={16} />
          )}
          {label}
        </label>
      )}
      <div className="relative">
        <input 
          className={`${getInputStyle()} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
export default Input;