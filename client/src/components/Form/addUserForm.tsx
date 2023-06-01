import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { User } from '../Users/users';
import { createUsers } from '../../service/getUsers/users';

interface AddUserFormProps {
    refetch: (options?: (RefetchOptions & RefetchQueryFilters) | undefined) => Promise<QueryObserverResult<User[], unknown>>
}

const FormInitialValues = {
    name: '',
    email: '',
    password: ''
}

type Fields = "name" | "email" | "password";

const AddUserForm:React.FC<AddUserFormProps> = ({refetch}) => {
    const [formFields, setFormFields] = useState(FormInitialValues)
    const [formStage, setFormStage] = useState(0);

    const mutation = useMutation({
        mutationFn: createUsers,
        onError: (error:any) => {
            alert(error?.response?.data?.message);
        },
        onSuccess: () => {
            refetch();
            setFormFields(FormInitialValues);
            alert("Successfully Added User :)");
        }
    })

    const setFieldValues = (field:Fields,value:string)=>{
        setFormFields((prev)=>{
            const tempFields = {...prev};
            tempFields[field] = value;
            return tempFields;
        })
    }

    const handleSubmit = async()=>{
        if(formFields?.email && formFields?.name && formFields?.password){
            mutation.mutate(formFields);
        }
    }
    return (
        <>
            {
                formStage === 0 ?
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        id="fname" 
                        name="fname" 
                        value={formFields?.name}
                        onChange={(e)=>setFieldValues("name",e?.target?.value)}
                        placeholder="Name"
                        required
                    /><br></br>
                    <button
                        onClick={()=>setFormStage(1)}
                    >Next</button>
                </div> : 
                formStage === 1 ?
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        id="femail" 
                        name="femail" 
                        value={formFields?.email}
                        onChange={(e)=>setFieldValues("email",e?.target?.value)}
                        required
                        placeholder="Email"
                    /><br></br>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        id="fpassword" 
                        name="fpassword" 
                        value={formFields?.password}
                        placeholder="Password"
                        onChange={(e)=>setFieldValues("password",e?.target?.value)}
                        required
                    /><br></br>
                    <button
                        onClick={()=>setFormStage(0)}
                    >Previous</button>
                    <button
                        type='submit'
                        onClick={()=>handleSubmit()}
                    >Submit</button>
                </div> :
                null
            }
        </>
    );
}

export default AddUserForm;