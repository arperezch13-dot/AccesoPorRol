//Modifica el estado del usuario para que incluya un rol: role: 'admin' o 'role': 'user'.
//Modifica el ProtectedRoute para que reciba una prop extra: requiredRole.
//El Reto: Si un usuario esta logueado pero su rol no coincide con el requerido (ej: un 'user' intentando entrar a ina ruta de 'admin'), redifirigelo a una pagina que diga "Acceso denegado".

import { Navigate } from "react-router-dom"

interface User {
    id: number;
    name: string;
    role: "admin" | "user";
}

interface Props {
    user: User | null;
    requiredRole?: "admin" | "user";
    children: React.ReactNode; // los componenteshijos que se renderizaran si el usuario esta autorizado
  
}

const ProtectedRoute = ({user, requiredRole, children}:Props) => {
    //Si no esta permitido, lo enviamos al Login inmediatamente
    if(!user){

        return <Navigate to="/login" replace/>
    }
    if(requiredRole && user.role !== requiredRole){
        return <Navigate to="/denegado" replace/>
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute