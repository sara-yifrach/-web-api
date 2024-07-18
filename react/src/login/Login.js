import "primereact/resources/themes/lara-light-cyan/theme.css";
import React, { useState,useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { addNewPurchase, logInByUserNameAndPassword } from "./loginService";
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { useNavigate } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { useUpdateEffect } from 'primereact/hooks';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from "primereact/password";
import { fetchId } from "./loginService";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
    const {id} = useParams();
    const [value, setValue] = useState([]);
    const navigate=useNavigate();
    const toast = useRef(null);
    const show = () => {
        debugger
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        name:'',
        password:''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = async(d) => {
        let result = await logInByUserNameAndPassword(d.name, d.password);
        if(result)
        {
            const token = result.data;
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const decodedToken = jwtDecode(token);

            if (decodedToken) {
                const user= 
                {
                    "userId" :decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                    "token":result.data
                }
                var id  = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
                console.log(id);
                var role  = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
                console.log(role);
                localStorage.setItem("CostumerId",id)
                localStorage.setItem("role",role)
                // שמירת המשתמש ב-local storage
                localStorage.setItem('user', JSON.stringify(user));
                console.log("user",user)
        navigate("../Home",{replace:false})
        console.log("result: ",result);
        }
        
    }};


    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
       
        <div className="card flex justify-content-center" > 
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Toast ref={toast} />
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Name is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.name })}></label>
                            <span className="p-float-label">
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name}>Name</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                 <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label">
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name}>Password</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Button label="Submit" type="submit" icon="pi pi-check" />
                <Button label="Dont have an Account?" link onClick={() =>  navigate("./Register",{replace:false})}/>
            </form>
        </div>
    )
}

export default Login;
