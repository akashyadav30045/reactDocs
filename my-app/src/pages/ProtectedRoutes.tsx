import { isAuthenticated } from "../utils/auth"
import { Navigate } from "react-router-dom";



interface Props {
    children: React.ReactNode
}

const ProtectedRoutes = ({children}:Props) => {
    if(!isAuthenticated()) {
       return <Navigate to="/login" replace/>
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoutes