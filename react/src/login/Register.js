import React, { useRef, useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Toast } from 'primereact/toast';
import { useUpdateEffect } from 'primereact/hooks';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Navigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { addNewPurchase, logInByUserNameAndPassword } from "./loginService";
import { classNames } from 'primereact/utils';
import { useNavigate } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { Password } from "primereact/password";
import { fetchId } from "./loginService";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Controller, useForm } from 'react-hook-form';


axios.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if (user) {
            config.headers['Authorization'] = `Bearer ${user.token}`
        }
        return config;
    },
    (error) => { return Promise.reject(error) }
)



export default function Register() {
    const [value, setValue] = useState([]);
    const toast = useRef(null)
    const navigate = useNavigate();
    const url = "/Login"

    let newCostumer = {
        name: '',
        phone: 0,
        address: ' ',
        email: '',
        paymentMethod: '',
        password: 0
    }
    const [CurrentUser, setCorrunetUser] = useState(newCostumer);

    // const {
    //     control,
    //     formState: { errors },
    //     handleSubmit,
    //     getValues,
    //     reset
    // } = useForm({ CurrentUser });
    const funcForAddCostumer = async () => {
        var res = await axios.post('https://localhost:7031/Costumer/Add', CurrentUser);
        console.log(res.data);
        navigate(url, { replace: false })
    }

    const onInputEmailChange = (e, email) => {
        const val = (e.target && e.target.value) || '';
        let _Cuser = { ...CurrentUser };
        _Cuser[`${email}`] = val;
        setCorrunetUser(_Cuser);
    };
    const onInputNameChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _Cuser = { ...CurrentUser };
        _Cuser[`${name}`] = val;
        setCorrunetUser(_Cuser);
    };
    const onInputPaymentMethodChange = (e, paymentMethod) => {
        const val = (e.target && e.target.value) || '';
        let _Cuser = { ...CurrentUser };
        _Cuser[`${paymentMethod}`] = val;
        setCorrunetUser(_Cuser);
    };
    const onInputAddressChange = (e, address) => {
        const val = (e.target && e.target.value) || '';
        let _Cuser = { ...CurrentUser };
        _Cuser[`${address}`] = val;
        setCorrunetUser(_Cuser);
    };
    const onInputNumberChange = (e, phone) => {
        const val = e.value || 0;
        let _Cuser = { ...CurrentUser };
        _Cuser[`${phone}`] = val;
        setCorrunetUser(_Cuser);
    };
    const onInputPasswordChange = (e, password) => {
        const val = e.value || 0;
        let _Cuser = { ...CurrentUser };
        _Cuser[`${password}`] = val;
        setCorrunetUser(_Cuser);
    };
    return (<>
 {/* <form onSubmit={handleSubmit(funcForAddCostumer)} className="flex flex-column gap-2">
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
                </>
            )}
        />
             <Controller
            name="phone"
            control={control}
            rules={{ required: 'Phone is required.' }}
            render={({ field, fieldState }) => (
                <>
                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                    <span className="p-float-label">
                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                        <label htmlFor={field.name}>Phone</label>
                    </span>
                </>
            )}
        />
             <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required.' }}
            render={({ field, fieldState }) => (
                <>
                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                    <span className="p-float-label">
                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                        <label htmlFor={field.name}>Email</label>
                    </span>
                </>
            )}
        />
             <Controller
            name="Address"
            control={control}
            rules={{ required: 'Address is required.' }}
            render={({ field, fieldState }) => (
                <>
                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                    <span className="p-float-label">
                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                        <label htmlFor={field.name}>Address</label>
                    </span>
                </>
            )}
        />
               <Controller
            name="PaymentMethod"
            control={control}
            rules={{ required: 'paymentMethod is required.' }}
            render={({ field, fieldState }) => (
                <>
                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                    <span className="p-float-label">
                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                        <label htmlFor={field.name}>PaymentMethod</label>
                    </span>
                </>
            )}
        />
        </form> */}
        <div className="flex-auto">
            <label htmlFor="email" className="font-bold block mb-2">
                Email
            </label>
            <InputText id="email" keyfilter="email" onChange={(e) => onInputEmailChange(e, 'email')} className="w-full" />
        </div>

        <div className="flex-auto">
            <label htmlFor="number" className="font-bold block mb-2">
                Phone
            </label>
            <InputNumber id="number" onChange={(e) => onInputNumberChange(e, 'phone')} className="w-full" />
        </div>
        <div>
            <label htmlFor="name" className="font-bold block mb-2">
                UserName
            </label>
            <InputText id="name" onChange={(e) => onInputNameChange(e, 'name')} className="w-full" />

        </div>
        <div>
            <label htmlFor="number" className="font-bold block mb-2">
                Password
            </label>
            <InputNumber id="number" keyfilter="num" onValueChange={(e) => { debugger; onInputPasswordChange(e, 'password') }} className="w-full" />

        </div>

        <div>
            <label htmlFor="name" className="font-bold block mb-2">
                PayMentMethod
            </label>
            <InputText id="name" onChange={(e) => onInputPaymentMethodChange(e, 'paymentMethod')} className="w-full" />

        </div>
        <div>
            <label htmlFor="name" className="font-bold block mb-2">
                Address
            </label>
            <InputText id="name" onChange={(e) => onInputAddressChange(e, 'address')} className="w-full" />

        </div>
                {/* <Button label="Submit" type="submit" icon="pi pi-check" /> */}

        <Button label="Confirm and log in" link onClick={async () => { console.log(newCostumer); await funcForAddCostumer() }} />

    </>
    )
}