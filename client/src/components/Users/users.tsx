import { useRef } from "react";

export interface User {
    name: string;
    email: string;
}
interface UsersListProps {
    users: Array<User>;
    isLoadingData: boolean;
}

const UsersList:React.FC<UsersListProps> = ({users, isLoadingData})=>{
    const userListRef = useRef(null);
    return(
        <div ref={userListRef} onClick={()=>console.log("Users List Ref = ",userListRef)}>
            {
                !isLoadingData ? 
                (users?.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            users?.map(user=>
                                <tr key={user?.email}>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table> : <p>No Users Present!!!</p> ) : 
                <p>Loading Data ....</p>
            }
        </div>
    )
}

export default UsersList;