import { useState } from "react"
import { useLogin } from "../shared/hooks/useLogin"
import { ClockLoader } from "react-spinners"

const img = 'https://ps.w.org/login-customizer/assets/icon-256x256.png?rev=2455454'

export const Login = () => {
    const {login, isLoading} = useLogin()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
        console.log(formData)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        //alert('Esta a punto de enviar la info al back')
        login(
            formData.username,
            formData.password
        )
    }

    if(isLoading){
        return(
            <div className="container d-flex align-items-center justify-content-center vh-100">
                <ClockLoader />
            </div>
        )
    }
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <img src={img} style={{ width: '5em', height: 'auto' }} alt="Logo de login" />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input value={formData.username} onChange={handleChange} name='username' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your username with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={formData.password} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}