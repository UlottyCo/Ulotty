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
    if (!value) return null;
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

  phone: (phone: string): ValidationError | null => {
    const regex = /^[\d\s\-\+\(\)]+$/;
    if (!phone) return null;
    if (!regex.test(phone) || phone.replace(/\D/g, "").length < 10) {
      return { field: "phone", message: "Teléfono inválido" };
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
};

export function validateProperty(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  const titleError = validators.required(data.title, "Título");
  if (titleError) errors.push(titleError);

  const addressError = validators.required(data.address, "Dirección");
  if (addressError) errors.push(addressError);

  const priceError = validators.number(data.price, "Precio");
  if (priceError) errors.push(priceError);
  else if (data.price && validators.minValue(parseFloat(data.price), 0, "Precio")) {
    errors.push(validators.minValue(parseFloat(data.price), 0, "Precio")!);
  }

  const areaError = validators.number(data.area, "Área");
  if (areaError) errors.push(areaError);

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateUser(data: any): ValidationResult {
  const errors: ValidationError[] = [];

  const nameError = validators.required(data.full_name, "Nombre");
  if (nameError) errors.push(nameError);

  const emailError = validators.email(data.email);
  if (emailError) errors.push(emailError);

  const phoneError = validators.phone(data.phone);
  if (phoneError) errors.push(phoneError);

  return {
    valid: errors.length === 0,
    errors,
  };
}
