import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../breadcrumbs/userContext";

export const UserMenu: React.FC<{}> = () => {
    const { user } = useContext(UserContext);
    
    return <div className="ml-auto bg bg-teal-200/70 p-1 px-2">
        {user === undefined
            ? <span> no user selected </span>
            : <Link to={`users/${user.id}`} className="group flex items-center hover:gap-2 gap-0 duration-300 transition-all">
                {user.name}
                <span className="text-xs transition-all duration-300 inline-block overflow-hidden max-w-0
                     group-hover:max-w-sm">
                         ({user.email})
            </span></Link>}
    </div>
}