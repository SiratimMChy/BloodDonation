
export const COLORS = {
  primary: {
    50: 'bg-red-50 dark:bg-red-950/20',
    100: 'bg-red-100 dark:bg-red-900/30',
    500: 'bg-red-500',
    600: 'bg-red-600',
    700: 'bg-red-700',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-900/50',
    hover: 'hover:bg-red-50 dark:hover:bg-red-900/20'
  },
  
  secondary: {
    50: 'bg-green-50 dark:bg-green-950/20',
    100: 'bg-green-100 dark:bg-green-900/30',
    500: 'bg-green-500',
    600: 'bg-green-600',
    700: 'bg-green-700',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-900/50'
  },

  accent: {
    50: 'bg-blue-50 dark:bg-blue-950/20',
    100: 'bg-blue-100 dark:bg-blue-900/30',
    500: 'bg-blue-500',
    600: 'bg-blue-600',
    700: 'bg-blue-700',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-900/50'
  },

  neutral: {
    base: 'bg-base-100',
    surface: 'bg-base-200',
    elevated: 'bg-base-300',
    text: 'text-base-content',
    textMuted: 'text-base-content/60',
    textLight: 'text-base-content/40',
    border: 'border-base-300'
  }
};

export const SPACING = {
  // Consistent spacing system
  xs: 'p-3',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
  
  // Gaps
  gapXs: 'gap-2',
  gapSm: 'gap-4',
  gapMd: 'gap-6',
  gapLg: 'gap-8',
  
  // Margins
  marginSm: 'mb-4',
  marginMd: 'mb-6',
  marginLg: 'mb-8',
  marginXl: 'mb-12'
};

export const BORDER_RADIUS = {
  default: 'rounded-xl',
  small: 'rounded-lg',
  large: 'rounded-2xl',
  full: 'rounded-full'
};

export const SHADOWS = {
  default: 'shadow-lg',
  small: 'shadow-md',
  large: 'shadow-xl',
  hover: 'hover:shadow-xl'
};

export const TRANSITIONS = {
  default: 'transition-all duration-300',
  fast: 'transition-all duration-200',
  slow: 'transition-all duration-500'
};

// Component Style Presets
export const COMPONENT_STYLES = {
  // Card styles
  card: {
    default: `${COLORS.neutral.surface} border border-base-300/50 ${BORDER_RADIUS.default} p-4 sm:p-5 md:p-6 lg:p-8 ${SHADOWS.default} w-full max-w-full min-h-[200px] sm:min-h-[220px]`,
    elevated: `${COLORS.neutral.base} border border-base-300/30 ${BORDER_RADIUS.default} p-4 sm:p-5 md:p-6 lg:p-8 ${SHADOWS.large} w-full max-w-full min-h-[200px] sm:min-h-[220px]`,
    interactive: `${COLORS.neutral.surface} border border-base-300/50 ${BORDER_RADIUS.default} p-4 sm:p-5 md:p-6 lg:p-8 ${SHADOWS.default} ${SHADOWS.hover} ${TRANSITIONS.default} w-full max-w-full min-h-[200px] sm:min-h-[220px]`
  },

  // Button styles
  button: {
    primary: `bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 ${BORDER_RADIUS.default} font-semibold ${SHADOWS.default} ${SHADOWS.hover} ${TRANSITIONS.default} min-h-[3rem]`,
    secondary: `${COLORS.neutral.surface} border border-base-300/50 ${COLORS.neutral.text} px-6 py-4 ${BORDER_RADIUS.default} font-semibold ${SHADOWS.small} hover:${COLORS.neutral.elevated} ${TRANSITIONS.default} min-h-[3rem]`,
    success: `${COLORS.secondary[600]} hover:${COLORS.secondary[700]} text-white px-6 py-4 ${BORDER_RADIUS.default} font-semibold ${SHADOWS.default} ${TRANSITIONS.default} min-h-[3rem]`,
    accent: `${COLORS.accent[600]} hover:${COLORS.accent[700]} text-white px-6 py-4 ${BORDER_RADIUS.default} font-semibold ${SHADOWS.default} ${TRANSITIONS.default} min-h-[3rem]`,
    large: `bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-5 ${BORDER_RADIUS.default} font-semibold ${SHADOWS.default} ${SHADOWS.hover} ${TRANSITIONS.default} min-h-[4rem] text-lg`,
    cancel: `bg-base-300 hover:bg-base-400 text-base-content px-6 py-4 ${BORDER_RADIUS.default} font-semibold ${SHADOWS.small} hover:shadow-xl ${TRANSITIONS.default} min-h-[3rem]`
  },

  // Input styles
  input: {
    default: `w-full px-2 sm:px-3 md:px-4 py-3 border border-base-300/50 ${BORDER_RADIUS.default} ${COLORS.neutral.base} ${COLORS.neutral.text} focus:border-red-500 focus:outline-none ${TRANSITIONS.default}`,
    error: `w-full px-2 sm:px-3 md:px-4 py-3 border border-red-300 ${BORDER_RADIUS.default} ${COLORS.neutral.base} ${COLORS.neutral.text} focus:border-red-500 focus:outline-none ${TRANSITIONS.default}`
  },

  // Badge styles
  badge: {
    primary: `${COLORS.primary[100]} ${COLORS.primary.text} px-3 py-1 ${BORDER_RADIUS.full} text-sm font-semibold`,
    secondary: `${COLORS.secondary[100]} ${COLORS.secondary.text} px-3 py-1 ${BORDER_RADIUS.full} text-sm font-semibold`,
    accent: `${COLORS.accent[100]} ${COLORS.accent.text} px-3 py-1 ${BORDER_RADIUS.full} text-sm font-semibold`,
    neutral: `${COLORS.neutral.surface} ${COLORS.neutral.text} px-3 py-1 ${BORDER_RADIUS.full} text-sm font-semibold border border-base-300/50`
  }
};

// Typography System
export const TYPOGRAPHY = {
  heading: {
    h1: 'text-3xl sm:text-4xl lg:text-5xl font-black text-base-content tracking-tight',
    h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content',
    h3: 'text-xl sm:text-2xl font-bold text-base-content',
    h4: 'text-lg sm:text-xl font-semibold text-base-content'
  },
  body: {
    large: 'text-base sm:text-lg text-base-content/70 leading-relaxed',
    default: 'text-sm sm:text-base text-base-content/70',
    small: 'text-xs sm:text-sm text-base-content/60'
  }
};

// Button Height Utilities
export const BUTTON_HEIGHTS = {
  small: 'min-h-[2.5rem] py-2',
  default: 'min-h-[3rem] py-3',
  large: 'min-h-[4rem] py-4',
  xlarge: 'min-h-[5rem] py-5'
};

// Layout System
export const LAYOUT = {
  container: 'container mx-auto px-1 sm:px-3 md:px-4 max-w-7xl',
  section: 'py-6 sm:py-8 md:py-12 lg:py-16',
  grid: {
    responsive: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4',
    cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8',
    stats: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8'
  }
};