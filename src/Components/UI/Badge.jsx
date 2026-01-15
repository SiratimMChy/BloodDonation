import { COMPONENT_STYLES } from '../../styles/designSystem';

const Badge = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon: Icon,
  ...props 
}) => {
  const getBadgeStyle = () => {
    return COMPONENT_STYLES.badge[variant] || COMPONENT_STYLES.badge.primary;
  };

  return (
    <span 
      className={`${getBadgeStyle()} ${className} inline-flex items-center gap-1`}
      {...props}
    >
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
};

export default Badge;