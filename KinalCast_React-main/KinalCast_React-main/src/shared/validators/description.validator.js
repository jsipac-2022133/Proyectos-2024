export const validateDescription = (title)=>{
    return title.length >= 10 && title.length <= 200
}

export const descriptionValidationMessage = 'La descripción debe tener entre 10 y 200 caracteres.'