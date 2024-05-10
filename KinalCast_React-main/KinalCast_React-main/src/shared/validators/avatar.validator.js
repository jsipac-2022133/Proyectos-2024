export const validateAvatarUrl = (url)=>{
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url)

}

export const avatarValidationMessage = 'La URL no tiene un formato válido'