import { forwardRef, type HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline';
}

const getVariantClasses = (variant: string = 'default') => {
  const variants = {
    default: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50',
  };
  return variants[variant as keyof typeof variants] || variants.default;
};

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all ${getVariantClasses(variant)} ${className || ''}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
