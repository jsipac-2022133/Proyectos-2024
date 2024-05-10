import { loginRequest } from "../../services/api";
import { useState } from "react";

//Hook personalizado que devuelve la funcion para ir al API y muestra si esta cargando
export const useLogin = () =>{
    //Es verdadero cuando esta cargando la informacion
    const [isLoading, setIsLoading] = useState(false)

    //Va a consultar al API enciando los datos
    const login = async(username, password)=>{
        setIsLoading(true)
        const user = {
            username,
            password
        }
        const response = await loginRequest(user)
        setIsLoading(false)

        if(response.error){
            //alert(response.err.response.data.message)
            //alert('Error al logearse', response.err)
            return console.log('Error al logearse', response.err)
        }
        localStorage.setItem('token', response.data.token)
    }

    return {
        login,
        isLoading
    }
}