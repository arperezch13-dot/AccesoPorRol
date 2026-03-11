import { useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"


//Paginas de Ejemplo
const Home = () => <h1 className="text-xl">Pagina Publica Home</h1>
const Admin = () => <h1 className="text-xl text-indigo-600 font-bold">Zona VIP: Panel de Administracion</h1>
const Login = () => <h1 className="text-xl text-red-500">Desdes Iniciar Sesion</h1>
const AccesoDenegado = () => <h1 className="text-xl text-red-500">Acceso Denegado: No tienes permisos para ver esta pagina</h1>

//Paginas protegidas
const Perfil = () => <h1 className="text-xl text-green-500">Perfil de Usuario</h1>
const Dashboard = () => <h1 className="text-xl text-green-500">Dashboard de Usuario</h1>

function App() {
  const [user, setUser] = useState<{id: number, name: string, role: "admin" | "user"} | null>(null)

  //Funciones simualdoras de Login y Logout

  const loginAdmin = ()=> setUser({id: 1, name: "Ana", role: "admin"})
  const loginUser = ()=> setUser({id: 2, name: "Juan", role: "user"})
  const logout = () => setUser(null)

  return (
    <BrowserRouter>
    <nav className="p-4 bg-slate-800 text-white flex justify-between">
      
      <div className="flex gap-4">

        <Link to="/">Inicio</Link>
        <Link to="/perfil">Mi Perfil</Link>
        <Link to="/admin">Admin (VIP)</Link>
      </div>
      {/* Panel de control */}
      <div className="flex gap-2 items-center">
        <span className="mr-4 text-sm text-gray-300">
          {user ? `Hola, ${user.name} (${user.role})` : "No estas logueado"}
        </span>
        <button onClick={loginUser}className="px-3 py-1 bg-green-600 rounded text-sm">Entrar como User</button>
        <button onClick={loginAdmin}className="px-3 py-1 bg-blue-600 rounded text-white">Login Admin</button>
        <button onClick={logout}className="px-3 py-1">Salir</button>
        
      </div>
    </nav>
    <div className="p-10">
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/denegado" element={<AccesoDenegado />}/>
      {/* Ruta protegida- Envolvemos el componente admin con nuestro Guardaespalda */}
      <Route path="/perfil" element={<ProtectedRoute user={user}>
        <Perfil></Perfil>
      </ProtectedRoute>}>
      </Route>
      <Route path="/admin" element={<ProtectedRoute user={user} requiredRole="admin">
        <Dashboard></Dashboard>
      </ProtectedRoute>} />
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
