import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { DeleteDonator, fetchDonators, fetchGiftsForDonator, fetchAddDonator, fetchCheckEmail, fetchEditDonator, GetDonatorByGift } from './DonatorsService';
import { SplitButton } from 'primereact/splitbutton';
import { Menubar } from 'primereact/menubar';
import { AutoComplete } from 'primereact/autocomplete';
import { Column } from 'primereact/column';
import { fetchGifts } from '../gifts/giftService2';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';


const Donators = () => {
    const [Donators, setDonators] = useState([])
    const [DonatorsForStay, setDonatorsForStay] = useState([])
    const [visible, setVisible] = useState(false);
    const [visibl, setVisibl] = useState(false);
    const [Donator, setDonator] = useState([]);
    const [value, setValue] = useState(" ");
    const [Gifts, setGifts] = useState([]);
    const [listForDonator, setListForDonator] = useState([])
    const [visibleforAdd, setVisibleForAdd] = useState(false)
    const toast = useRef(null);
    const [n, setN] = useState('');
    const [p, setP] = useState(0);
    const [e, setE] = useState('');
    const [a, setA] = useState('');
    const [ne, setNE] = useState('');
    const [pe, setPE] = useState(0);
    const [ee, setEE] = useState('');
    const [ae, setAE] = useState('');
    const [don, setDon] = useState([]);

    const items = [
        {
            label: 'Home',
            url: "/Home",
            icon: 'pi pi-home'
        },
        {
            label: 'About Us',
            url: "/AboutUs",
            icon: 'pi pi-star'
        },
        {
            label: 'Gifts-->',
            url: "/gifts/GiftList",
            icon: 'pi pi-search',
        },
        {
            label: 'Donators',
            url: "/Donators",
            icon: 'pi pi-user',
        },
        {
            label: 'Manage Gifts',
            url: "/searchGifts",
            icon: 'pi pi-search',
        },
        {
            label: 'My cart',
            url: "/Cart",
            icon: 'pi pi-shopping-cart'
        },
        {
            label: 'Purchase manage',
            url: "/purchases",
            icon: 'pi pi-shop'
        }
    ];

    const item = [
        {
            label: 'Log out ',
            url: "/Login",
            icon: 'pi pi-refresh'
        }
    ];
    var goodonator;

    const editProduct = async (donator) => {

        setDon({ ...donator })
        goodonator = Donators.find(e => e.id == donator.id)
        // setNE(donator.name)
        // setPE(donator.phone)
        // setEE(donator.email)
        // setAE(donator.address)
        // setValue(donator.name)
        return goodonator



    };

    const endContent = (
        <React.Fragment>
            <SplitButton label={localStorage.getItem("CostumerName")} model={item} icon="pi pi-check"></SplitButton>
        </React.Fragment>
    );

    const getAll = async () => {
        var donators = await fetchDonators()
        setDonators(donators)
    }

    useEffect(() => {
        getAll()
    }, [])

    useEffect(() => {
        if (!Donators.length > 0)
            getDonatorsSmall().then((data) => setDonators(data.slice(0, 5)));
    }, [Donators]);

    useEffect(() => {
        if (!Gifts.length > 0)
            getGift();
    }, [Gifts])
    const fetchGiftsForDonator = async (Did) => {
        try {
            var gif = Gifts
            var list = gif.filter(g =>
                g.donatorId == Did,
            )
            setListForDonator(list)
            return list
        }
        catch (err) {
            throw new Error("status Code is:" + err);
        }
    }

    const getGift = async () => {
        var res = await fetchGifts();
        setGifts(res)
        return res;
    }

    const getDonatorsSmall = () => {
        return Promise.resolve(Donators.slice(0, 10));
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={async () => editProduct(rowData)} />
            </React.Fragment>
        );
    };

    const deleteDonator = async (id) => {
        var g = await fetchGifts()
        const found = g.find(element => element.donatorId === id);
        found ? toast.current.show({ severity: 'error', summary: 'Error', detail: 'There are gifts of this Donator!', life: 3000 })
            : await DeleteDonator(id)
        getAll()
    }

    // const [don,setDon]=useState([Donators]);

    const funcThatWorks = async (d) => {
        setDon(d)

    }


    const itemTemplate = (Donator, index) => {
        var d = Donator
        return (
            <>
                <div className="col-12" key={Donator.id}>
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{Donator.name}</div>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-at"></i>
                                        <span className="font-semibold">{Donator.email}</span>
                                    </span>
                                </div>
                                <div className="flex align-items-center gap-3">
                                    <i className="pi pi-phone"></i>
                                    <span className="font-semibold">{Donator.phone}</span>
                                </div>
                            </div>
                            <Button icon="pi pi-trash" onClick={() => { deleteDonator(Donator.id) }} />
                            {/* <Dialog visible={deleteDonatorDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                                <div className="confirmation-content">
                                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                    {product && (
                                        <span>
                                            Are you sure you want to delete <b>{product.name}</b>?
                                        </span>
                                    )}
                                </div>
                            </Dialog> */}
                            <div>
                                <div>
                                    <Button label="Show" icon="pi pi-external-link" onClick={() => { console.log("aaaaaaaaaaaa"); setVisibl(true); { fetchGiftsForDonator(Donator.id) } console.log(listForDonator); }} />
                                    <Dialog header="Donates" visible={visibl} maximizable style={{ width: '50vw' }} onHide={() => { if (!visibl) return; setVisibl(false); }}>
                                        <p>
                                            {listForDonator.map(item => <p>{item.gift}</p>)}
                                        </p>
                                    </Dialog>
                                </div>
                                <br></br>
                                <div>
                                    <Button label="Edit Details" icon="pi pi-external-link" onClick={() => { console.log("aaaaaaaaaaaa"); setVisible(true); funcThatWorks(Donator) }} />
                                    <Dialog header="Donator Details" visible={visible} modal={false} style={{ width: '20vw' }} footer={productDialogFooterForEdit} onHide={() => setVisible(false)}>

                                        <div className="field">
                                            <label className="mb-3 font-bold">name</label>

                                            <InputText
                                                defaultValue={don.name}
                                                dropdown
                                                onChange={(e) => setNE(e.target.value)}
                                            />
                                        </div>
                                        <div className="field">
                                            <label className="mb-3 font-bold">phone</label>

                                            <InputText
                                                defaultValue={don.phone}
                                                dropdown
                                                onChange={(e) => setPE(e.target.value)}
                                            /></div>
                                        <div className="field">
                                            <label className="mb-3 font-bold">address</label>

                                            <InputText
                                                defaultValue={don.address}
                                                dropdown
                                                onChange={(e) => setAE(e.target.value)}
                                            /></div>
                                        <div className="field">
                                            <label className="mb-3 font-bold">email</label>

                                            <InputText
                                                defaultValue={don.email}
                                                dropdown
                                                onChange={(e) => setEE(e.target.value)}
                                            /></div>
                                    </Dialog>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </>)
    };

    const funcForAdd = async () => {
        // {visibleforAdd && !n && <small className="p-error">Name is required.</small>}
        // {visibleforAdd && p. && <small className="p-error">phone is required.</small>}
        // {visibleforAdd && !e && <small  className="p-error">email is required.</small>}
        // {visibleforAdd && !a && <small className="p-error">address is required.</small>}
        // {visibleforAdd && await fetchCheckEmail(e)==false && <small className="p-error">email is not valid</small>}

        // setDon({name:n,phone:p,email:e,address:a})
        const formData = new FormData();
        formData.append("name", n)
        formData.append("phone", p)
        formData.append("email", e)
        formData.append("address", a)
        console.log(formData);
        let r = await fetchAddDonator(formData)
        var res = await fetchDonators()
        setDonators(res)
        setVisibleForAdd(false)

    }
    const fetchEdit = async () => {
        ///// editProduct(don)
        const formData = new FormData();
        formData.append("name", ne?ne:don.name)
        formData.append("phone", pe?pe:don.phone)
        formData.append("email", ee?ee:don.email)
        formData.append("address", ae?ae:don.address)
        console.log(formData);
        await fetchEditDonator(don.id,formData)
        var res = await fetchDonators()
        setDonators(res)
        setVisible(false)

    }
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={() => setVisibleForAdd(false)} />
            <Button label="Save" icon="pi pi-check" onClick={() => funcForAdd()} />
        </React.Fragment>
    )
    const productDialogFooterForEdit = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={() => setVisible(false)} />
            <Button label="Save" icon="pi pi-check" onClick={() => fetchEdit()} />
        </React.Fragment>
    )

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;
        let list = items.map((Donator, index) => {
            return itemTemplate(Donator, index);
        });
        return <div className="grid grid-nogutter">{list}</div>;
    }

    const func=(e)=>{
        var res;
        debugger
        if(e.target.value=="")
        {
            if(Donators.length>0)
                if(DonatorsForStay.length>0)
            setDonators(DonatorsForStay)
        return
        }
        if(e!=" " && Donators.length>0 && e!="")
        {
           var c = Donators.find((d) => 
                    d.name == e.target.value) 
        }
        console.log(c);
        setDonatorsForStay(Donators)
        c !=null ? setDonators([c]) :
         toast.current.show({ severity: 'error', summary: 'failed to find a Donator' , detail: '' , life: 3000 });
    }

    const funcForEmail=(e)=>{
        var res;
        console.log(e.target.value);
        console.log(DonatorsForStay);
        if(e.target.value=="")
        {
            if(Donators.length>0)
                if(DonatorsForStay.length>0)
                    setDonators(DonatorsForStay)
        return
        }
        if(e!=" " && Donators.length>0 && e!=""){
        var c = Donators.find((d) => 
            d.email == e.target.value) 
        }
        
        setDonatorsForStay(Donators)
        console.log(c);
        c!=null? setDonators([c]) :
         toast.current.show({ severity: 'error', summary: 'failed to find a Donator', detail: '', life: 3000 });
    }

    const funcForGift=async(e)=>{
        console.log(e.target.value);
        debugger
        if(e.target.value=="")
            {
                if(Donators.length>0)
                    if(DonatorsForStay.length>0)
               setDonators(DonatorsForStay)            
                return
            }
        if(e!=" " && Donators.length>0 && e!=""){ 
            debugger
            var res = await GetDonatorByGift(e.target.value)
            console.log(res);    
        }
        
        setDonatorsForStay(Donators)
        console.log(res);
        res!=null ? setDonators([res]) :
         toast.current.show({ severity: 'error', summary: 'failed to find a Donator', detail: '', life: 3000 });
    }


    return (
        <>
            <Toast ref={toast} />
            <div className="card">
                <Menubar model={items} end={endContent} />
            </div>

             <div className="card">
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="searchByName" onBlur={(e) => {
                      func(e)
                    }}
                />
            </div>
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">@
                </span>
                <InputText placeholder="searchByEmail" onBlur={(e) => {
                      funcForEmail(e)
                    }}/>
            </div>
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                <i className="pi pi-gift"></i>
                </span>
                <InputText placeholder="searchByGift" onBlur={(e) => {
                      funcForGift(e)}}/>
                <span className="p-inputgroup-addon">
                </span>
            </div> </div>
            <div className="card">
                <DataView value={Donators} listTemplate={listTemplate} >
                </DataView>
            </div>

            <Button label="Add" icon="pi-delete-left" onClick={() => { setVisibleForAdd(true) }} />
            {visibleforAdd && <Dialog header="Donator Details For Add" visible={visibleforAdd} modal={false} style={{ width: '20vw' }} footer={productDialogFooter} onHide={() => setVisibleForAdd(false)}>

                <div className="field">
                    <label className="mb-3 font-bold">name</label>

                    <InputText
                        defaultValue="  "
                        dropdown
                        onChange={(e) => { setN(e.target.value) }}
                    />
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">phone</label>

                    <InputText
                        defaultValue="  "
                        dropdown
                        onBlur={(e) => { setP(e.target.value) }}
                    /></div>
                <div className="field">
                    <label className="mb-3 font-bold">address</label>

                    <InputText
                        defaultValue="  "
                        dropdown
                        onBlur={(e) => { setA(e.target.value) }}

                    /></div>
                <div className="field">
                    <label className="mb-3 font-bold">email</label>

                    <InputText
                        defaultValue="  "
                        dropdown
                        onBlur={(e) => { setE(e.target.value) }}
                    /></div>

            </Dialog>

            }

        </>
    );
}
export default Donators;


