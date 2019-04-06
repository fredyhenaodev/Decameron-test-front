// validation functions
//validar Campo Vacio
export const required = value => ((value == null || value == '') ? 'Requerido' : undefined);

//validar que el email sea correcto
export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email Invalido'
    : undefined
);

//validar que las contraseñas coincidan 
export const passwordsMatch = (value, allValues) => {
    console.log(value, allValues.get('password'));
    if (value !== allValues.get('password')) {
      return 'Las contraseñas no coinciden';
    }
    return undefined;
  };

//Validar que la contraseña sea segura
export const passwordSecurity = value => (value && !/^(?=.*[\d])(?=.*[a-z])[\w\d!@#$%-_]{8,}$/.test(value)
  ? 'La contraseña, no debe tener espacios, al menos 1 dígito, al menos 1 letra mayúscula y al menos una letra minúscula'
  : undefined);