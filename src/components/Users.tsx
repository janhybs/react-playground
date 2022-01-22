import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { IUser, UserContext } from "../breadcrumbs/userContext";
import { useRerenderCounter } from "../diagnostics/useRerenderCounter";
import { useBreadcrumbs } from "../breadcrumbs/useBreadcrumbs";
import { LoadingAnimationWithLabel } from "./spinners/LoadingAnimation";

const usersPath = '/users';

export const Users: React.FC<any> = () => {
    const { callCounter, renderCounter } = useRerenderCounter('Users');

    const { setUser } = useContext(UserContext);
    const { update } = useBreadcrumbs([
        <Link to="/">home</Link>,
        <Link to={usersPath}>users</Link>,
        "", // placeholder like
    ]);
    const { id: userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<IUser>();


    useEffect(() => {
        (async () => {
            update(<LoadingAnimationWithLabel label={`loading user lists`} />);
            setUsers([]);
            setLoading(true);
            
            await new Promise(resolve => setTimeout(resolve, 876));
            const usersData = await fetch("https://jsonplaceholder.typicode.com/users");
            const users = await usersData.json() as IUser[];

            setLoading(false);
            setUsers(users);
            update();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (userId !== undefined) {
                setSelectedUser(undefined);
                update(<LoadingAnimationWithLabel label={`loading user ${userId}`} />);
                setLoading(true);

                await new Promise(resolve => setTimeout(resolve, 876));
                const userData = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                const user = await userData.json() as IUser;
                
                setLoading(false);
                update(user.email);
                setSelectedUser(user);
                setUser(user);
            } 
        })();
    }, [userId]);

    if (users.length === 0) {
        return <LoadingAnimationWithLabel label="Loading list of users" />;
    }

    return (
        <div>
            <h1 className="text-3xl font-light">Users</h1>
            <p>This is the Users page, called <strong>{callCounter}×</strong>, rendered <strong>{renderCounter}×</strong></p>
            <button onClick={() => update(Math.random().toPrecision(4))} className="bg-teal-300 py-1 px-2 rounded-md">Update route</button>
            <hr className="my-3 border-teal-200" />

            {userId === undefined && <div>
                <h3 className="text-xl font-light">Choose an user:</h3>
                <div className="flex flex-col ml-8">
                    {users.map(user =>
                        <Link key={user.id} to={`${usersPath}/${user.id}`} className="flex items-center transition-all gap-1 p-1 px-4 rounded
                            from-transparent bg-gradient-to-r
                            hover:from-teal-200">
                            <span className="text-xl font-extrabold">🥸</span>
                            {user.name}
                        </Link>
                    )}
                </div>
            </div>}

            {userId !== undefined && loading && <LoadingAnimationWithLabel label={`loading user ${userId}`} />}

            {userId !== undefined && selectedUser !== undefined && <div>
                <h3 className="text-xl font-light">User {selectedUser.name}</h3>
                <p>
                    This is the User {selectedUser.name} page, with email <strong>{selectedUser.email}</strong>
                </p>
                <pre className="text-xs mt-4 text-pink-800">
                    <code>
                        {JSON.stringify(selectedUser, null, 2)}
                    </code>
                </pre>

                <pre className="text-xs mt-4 text-pink-800">
                    <code>
                        random number of the <span className="line-through">day</span> render:
                        {Math.random().toPrecision(8)}
                    </code>
                </pre>
            </div>}
        </div>
    );
}