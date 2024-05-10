export const logout = ()=>{
    localStorage.removeItem('user') //Eliminar solo un campo
    //localStorage.clear() //Elimina todos los campos del localstorage
    window.location.href = '/channels'
}