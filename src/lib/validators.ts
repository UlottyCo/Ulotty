export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export const validators = {
  email: (email: string): ValidationError | null => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { field: "email", message: "Email es requerido" };
    if (!regex.test(email)) return { field: "email", message: "Email inválido" };
    if (email.length > 254) return { field: "email", message: "Email muy largo" };
    return null;
  },

  required: (value: string, fieldName: string): ValidationError | null => {
    if (!value || value.trim() === "") {
      return { field: fieldName, message: `${fieldName} es requerido` };
    }
    return null;
  },

  minLength: (value: string, min: number, fieldName: string): ValidationError | null => {
    if (value && value.length < min) {
      return { field: fieldName, message: `${fieldName} debe tener al menos ${min} caracteres` };
    }
    return null;
  },

  maxLength: (value: string, max: number, fieldName: string): ValidationError | null => {
    if (value && value.length > max) {
      return { field: fieldName, message: `${fieldName} no puede exceder ${max} caracteres` };
    }
    return null;
  },

  number: (value: string, fieldName: string): ValidationError | null => {
    if (!value && value !== "0") return null;
    if (isNaN(parseFloat(value))) {
      return { field: fieldName, message: `${fieldName} debe ser un número` };
    }
    return null;
  },

  minValue: (value: number, min: number, fieldName: string): ValidationError | null => {
    if (value < min) {
      return { field: fieldName, message: `${fieldName} debe ser mayor a ${min}` };
    }
    return null;
  },

  maxValue: (value: number, max: number, fieldName: string): ValidationError | null => {
    if (value > max) {
      return { field: fieldName, message: `${fieldName} no puede ser mayor a ${max}` };
    }
    return null;
  },

  phone: (phone: string): ValidationError | null => {
    const regex = /^[\d\s\-\+\(\)]+$/;
    if (!phone) return null;
    const digitsOnly = phone.replace(/\D/g, "");
    if (!regex.test(phone) || digitsOnly.length < 10) {
      return { field: "phone", message: "Teléfono inválido (mínimo 10 dígitos)" };
    }
    if (digitsOnly.length > 15) {
      return { field: "phone", message: "Teléfono muy largo" };
    }
    return null;
  },

  url: (url: string): ValidationError | null => {
    if (!url) return null;
    try {
      new URL(url);
      return null;
    } catch {
      return { field: "url", message: "URL inválida" };
    }
  },

  strongPassword: (password: string): ValidationError | null => {
    if (!password) return { field: "password", message: "Contraseña es requerida" };
    if (password.length < 8) {
      return { field: "password", message: "La contraseña debe tener al menos 8 caracteres" };
    }
    if (!/[A-Z]/.test(password)) {
      return { field: "password", message: "La contraseña debe contener una mayúscula" };
    }
    if (!/[a-z]/.test(password)) {
      return { field: "password", message: "La contraseña debe contener una minúscula" };
    }
    if (!/[0-9]/.test(password)) {
      return { field: "password", message: "La contraseña debe contener un número" };
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return { field: "password", message: "La contraseña debe contener un carácter especial" };
    }
    return null;
  },

  noXSS: (value: string, fieldName: string): ValidationError | null => {
    const xssPatterns = /<|>|&|script|javascript:/i;
    if (value && xssPatterns.test(value)) {
      return { field: fieldName, message: "Contiene caracteres no permitidos" };
    }
    return null;
  },
};

export function validateProperty(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  const titleError = validators.required(data.title, "Título");
  if (titleError) errors.push(titleError);
  else {
    const titleXSSError = validators.noXSS(data.title, "Título");
    if (titleXSSError) errors.push(titleXSSError);
  }

  const addressError = validators.required(data.address, "Dirección");
  if (addressError) errors.push(addressError);

  if (data.price) {
    const priceError = validators.number(data.price.toString(), "Precio");
    if (priceError) errors.push(priceError);
    else {
      const priceMinError = validators.minValue(parseFloat(data.price), 0, "Precio");
      if (priceMinError) errors.push(priceMinError);
    }
  }

  if (data.area) {
    const areaError = validators.number(data.area.toString(), "Área");
    if (areaError) errors.push(areaError);
    else {
      const areaMinError = validators.minValue(parseFloat(data.area), 0, "Área");
      if (areaMinError) errors.push(areaMinError);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateUser(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  const nameError = validators.required(data.full_name, "Nombre");
  if (nameError) errors.push(nameError);
  else {
    const nameXSSError = validators.noXSS(data.full_name, "Nombre");
    if (nameXSSError) errors.push(nameXSSError);
  }

  const emailError = validators.email(data.email);
  if (emailError) errors.push(emailError);

  const phoneError = validators.phone(data.phone);
  if (phoneError) errors.push(phoneError);

  return {
    valid: errors.length === 0,
    errors,
  };
}
