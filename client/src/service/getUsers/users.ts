import { User } from "../../components/Users/users";
import axios from 'axios';

export const getUsers = async(): Promise<User[]> =>
  await axios.get('/user').then((response) => response.data.data);

export const createUsers = async(user:User): Promise<string> =>
  await axios.post('/user/registration',user).then((response) => response.data.message)
