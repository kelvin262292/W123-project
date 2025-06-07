import { useState, useEffect } from "react";

// Validation rules
export const validationRules = {
  required: (value: any) => {
    if (value === null || value === undefined || value === '') {
      return 'Trường này là bắt buộc';
    }
    return null;
  },

  email: (value: string) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Email không hợp lệ';
    }
    return null;
  },

  phone: (value: string) => {
    if (!value) return null;
    const phoneRegex = /^(0|\+84)[3-9]\d{8}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Số điện thoại không hợp lệ';
    }
    return null;
  },

  minLength: (min: number) => (value: string) => {
    if (!value) return null;
    if (value.length < min) {
      return `Tối thiểu ${min} ký tự`;
    }
    return null;
  },

  maxLength: (max: number) => (value: string) => {
    if (!value) return null;
    if (value.length > max) {
      return `Tối đa ${max} ký tự`;
    }
    return null;
  },

  min: (min: number) => (value: number) => {
    if (value === null || value === undefined) return null;
    if (value < min) {
      return `Giá trị tối thiểu là ${min}`;
    }
    return null;
  },

  max: (max: number) => (value: number) => {
    if (value === null || value === undefined) return null;
    if (value > max) {
      return `Giá trị tối đa là ${max}`;
    }
    return null;
  },

  pattern: (pattern: RegExp, message: string) => (value: string) => {
    if (!value) return null;
    if (!pattern.test(value)) {
      return message;
    }
    return null;
  },

  custom: (validator: (value: any) => string | null) => validator,
};

// Form validation hook
export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema: Record<keyof T, Array<(value: any) => string | null>>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof T, value: any): string | null => {
    const fieldValidators = validationSchema[name] || [];
    
    for (const validator of fieldValidators) {
      const error = validator(value);
      if (error) {
        return error;
      }
    }
    
    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationSchema).forEach((key) => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error || undefined }));
  };

  const handleSubmit = async (onSubmit: (values: T) => Promise<void> | void) => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationSchema).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Record<keyof T, boolean>);
    setTouched(allTouched);

    const isValid = validateForm();
    
    if (isValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  const setFieldValue = (name: keyof T, value: any) => {
    handleChange(name, value);
  };

  const setFieldError = (name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isValid = Object.keys(errors).length === 0;
  const hasErrors = Object.values(errors).some(error => error);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    hasErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    validateForm,
    reset,
    setFieldValue,
    setFieldError,
  };
};

// Input component with validation
interface ValidatedInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: any;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: any) => void;
  onBlur: () => void;
  className?: string;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  error,
  touched,
  required,
  disabled,
  onChange,
  onBlur,
  className = "",
}) => {
  const hasError = touched && error;

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        id={name}
        name={name}
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
          ${hasError 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
      />
      
      {hasError && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

// Textarea component with validation
interface ValidatedTextareaProps extends Omit<ValidatedInputProps, 'type'> {
  rows?: number;
}

export const ValidatedTextarea: React.FC<ValidatedTextareaProps> = ({
  name,
  label,
  placeholder,
  value,
  error,
  touched,
  required,
  disabled,
  onChange,
  onBlur,
  rows = 3,
  className = "",
}) => {
  const hasError = touched && error;

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <textarea
        id={name}
        name={name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`
          w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical
          ${hasError 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
      />
      
      {hasError && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

// Select component with validation
interface ValidatedSelectProps extends Omit<ValidatedInputProps, 'type'> {
  options: Array<{ value: string; label: string }>;
}

export const ValidatedSelect: React.FC<ValidatedSelectProps> = ({
  name,
  label,
  placeholder,
  value,
  error,
  touched,
  required,
  disabled,
  onChange,
  onBlur,
  options,
  className = "",
}) => {
  const hasError = touched && error;

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
          ${hasError 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {hasError && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
