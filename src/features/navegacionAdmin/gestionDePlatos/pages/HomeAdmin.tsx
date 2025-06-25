import { useUser } from "../../../user/context/UserContext";

function HomeAdmin(){
    const { user } = useUser()
    return (
        <>
        <span>
              {user?.DataUsuario?.Nombres ? `BIENVENIDO ${user.DataUsuario.Nombres.toUpperCase()}` : 'BIENVENIDO USUARIO'}
        </span>
        </>
    )
}

export default HomeAdmin;