export const validateUsername = (username)=>{
    const regex = /^\S{3,8}$/
    return regex.test(username)
}

export const usernameValidationMessage = 'Nombre de usuario inválido, mínimo 3 máximo 8 caracteres. No se aceptan espacios'