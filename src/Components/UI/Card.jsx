import { COMPONENT_STYLES } from '../../styles/designSystem';

const Card = ({ 
  children, 
  variant = 'default', 
  className = '', 
  interactive = false,
  ...props 
}) => {
  const getCardStyle = () => {
    if (interactive) return COMPONENT_STYLES.card.interactive;
    return COMPONENT_STYLES.card[variant] || COMPONENT_STYLES.card.default;
  };

  return (
    <div 
      className={`${getCardStyle()} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;