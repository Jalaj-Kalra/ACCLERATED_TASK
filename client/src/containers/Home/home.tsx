import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import AddUserForm from '../../components/Form/addUserForm';
import UsersList from '../../components/Users/users';
import { getUsers } from '../../service/getUsers/users';



const Home:React.FC = () => {
  const homeRef = useRef(null);
  const {data:users, isLoading, refetch} = useQuery({ queryKey: ['todos'], queryFn: getUsers })
  return (
    <div ref={homeRef} onClick={()=>console.log("Home Ref = ",homeRef)}>
      <UsersList users={users || []} isLoadingData={isLoading}/>
      <hr/>
      <h1>Save User ( After Save It will Automatically Refetch Or Will Show error )</h1>
      <AddUserForm refetch={refetch}/>
    </div>
  );
}

export default Home;