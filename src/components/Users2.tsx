import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { IUser, UserContext } from "../breadcrumbs/userContext";
import { useRerenderCounter } from "../diagnostics/useRerenderCounter";
import { useComplexState } from "../hooks/useComplexState";
import { withDiagnostics } from "../diagnostics/withDiagnostics";
import { useBreadcrumbs } from "../breadcrumbs/useBreadcrumbs";
import { LoadingAnimationWithLabel } from "./spinners/LoadingAnimation";

const usersPath = '/users2';

export const Users2: React.FC<any> = () => {
    const { callCounter, renderCounter } = useRerenderCounter('Users');
    const { setUser } = useContext(UserContext);
    const { update } = useBreadcrumbs([
        <Link to="/">home</Link>,
        <Link to={usersPath}>users</Link>,
        ""
    ]);
    const { id: userId } = useParams();
    const [{ loading, users, selectedUser }, updateState] = useComplexState(
        { loading: false, users: [] as IUser[], selectedUser: undefined as IUser | undefined }
    );

    const showUserProfile = userId !== undefined && selectedUser !== undefined;

    useEffect(() => {
        (async () => {
            update(<LoadingAnimationWithLabel label={`loading user lists`} />);
            updateState({ users: [], loading: true });

            await new Promise(resolve => setTimeout(resolve, 876));
            const usersData = await fetch("https://jsonplaceholder.typicode.com/users");
            const users = await usersData.json() as IUser[];

            updateState({ users: users, loading: false });
            update();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (userId !== undefined) {
                updateState({ selectedUser: undefined, loading: true });
                update(<LoadingAnimationWithLabel label={`loading user ${userId}`} />);

                await new Promise(resolve => setTimeout(resolve, 876));
                const userData = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                const user = await userData.json() as IUser;

                update(user.email);
                setUser(user);
                updateState({ selectedUser: user, loading: false });
            }
        })();
    }, [userId]);

    if (loading) {
        return <LoadingAnimationWithLabel
            label={userId === undefined ? "Loading user list" : 'loading user detail'} />;
    }

    return (
        <div>
            <h1 className="text-3xl font-light">Users</h1>
            <p>This is the Users page, called <strong>{callCounter}×</strong>, rendered <strong>{renderCounter}×</strong></p>
            <button onClick={() => update(Math.random().toPrecision(4))} className="bg-teal-300 py-1 px-2 rounded-md">Update route</button>
            <hr className="my-3 border-teal-200" />


            {showUserProfile
                ? <UserProfileMemo user={selectedUser} />
                : <UserListMemo users={users} />
            }
        </div>
    );
}

const UserProfile: React.FC<{ user: IUser }> = ({ user }) => {
    return (<div>
        <h3 className="text-xl font-light">User {user.name}</h3>
        <p>
            This is the User {user.name} page, with email <strong>{user.email}</strong>
        </p>
        <pre className="text-xs mt-4 text-pink-800">
            <code>
                {JSON.stringify(user, null, 2)}
            </code>
        </pre>

        <pre className="text-xs mt-4 text-pink-800">
            <code>
                random number of the <span className="line-through">day</span> render: 
                {Math.random().toPrecision(8)}
            </code>
        </pre>
    </div>)
}

const UserList: React.FC<{ users: IUser[] }> = ({ users }) => {
    return (<div>
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
    </div>)
}

const UserProfileMemo = React.memo(withDiagnostics(UserProfile, 'UserProfile', { fruit: ' - 🍑' }));
const UserListMemo = React.memo(withDiagnostics(UserList, 'UserList', {fruit: ' - 🍑'}));