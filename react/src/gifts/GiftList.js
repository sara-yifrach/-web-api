import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import { Menubar } from 'primereact/menubar';
import { GetExistPurchase, addNewPurchase, fetchGifts } from './giftService2';
import { SplitButton } from 'primereact/splitbutton';
import { Avatar } from 'primereact/avatar';
import { Navigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchCategory } from '../Categories/CategoryService';
import { fetchDonators } from '../Donators/DonatorsService';
import { Dialog } from 'primereact/dialog';
import { AddCardToCart } from '../Cart/CartService';


export default function GiftList() {

    const [gifts, setGifts] = useState([])
    const [donators, setDonators] = useState([])
    const [categories, setCategories] = useState([])
    const [globalFilter, setGlobalFilter] = useState(null);
    const [addToCart,setAddToCart] = useState(false)

    var cRole = localStorage.getItem("role")
    let items = []
     cRole == "Admin"?
      items = [
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
    ]:
    items = [
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
            label: 'My cart',
            url: "/Cart",
            icon: 'pi pi-shopping-cart'
        }
    ]
   
    const item = [
        {
            label: 'Log out ',
            url:"/Login",
            icon: 'pi pi-refresh'
        }
    ];

    const getDonators = async () => {
        await fetchDonators().then((data) => setDonators(data));
    }
    const getCategories = async () => {
        await fetchCategory().then((data) => setCategories(data));
    }

    useEffect(() => {
        getDonators()
    }, []);

    useEffect(() => {
        getCategories()
    }, []);

    useEffect(() => {
        getGifts()
    }, []);

    const endContent = (
        <React.Fragment>
            <SplitButton label={localStorage.getItem("CostumerName")} model={item} icon="pi pi-check"></SplitButton>
        </React.Fragment>
    );

    const [gift, setGift] = useState([]);

    const getGifts = async () => {
        await fetchGifts().then((data) => {
            setGifts(data);
            console.log("  kkk    ",data);
        });
    }

   const addCardToCart = (giftId)=>{
    GetExistPurchase()
    AddCardToCart(giftId)    
   }
 

    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <Avatar image={"https://localhost:7031/Gift/"+product.imageFile} className="mr-2" size="xlarge" shape="circle" />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">

                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.gift}</div>
                            {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        {product.winnerId ? <>
                            <div className="text-2xl font-bold text-900">Cant Buy! there is a Winner!{product.winnerId}</div>
                           </> :<>
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button onClick={() => {{setAddToCart(true)}{addCardToCart(product.id)}}} icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>
                            <Dialog header="Added Sucssefully To Your Cart" visible={addToCart} modal={false} style={{ width: '20vw' }} onHide={() => setAddToCart(false)}></Dialog></>}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };
    const imageBodyTemplate = (rowData) => {
        return <img src={"https://localhost:7031/Gift/"+rowData.imageFile} alt={rowData.imageFile} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const DonatorBodyTemplate = (rowData) => {
        let d = donators.find((e) => { return rowData.donatorId == e.id })
        return <div className="flex flex-wrap gap-2">{d.name}</div>
    }

    const CategoryBodyTemplate = (rowData) => {
        let c = categories.find((e) => { return rowData.categoryId == e.id })
        return <div className="flex flex-wrap gap-2">{c.name}</div>
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Gifts</h4>
        </div>
    );

    return (
        <>
            <div className="card">
                <Menubar model={items} end={endContent} />
            </div>
            <DataView value={gifts} listTemplate={listTemplate} paginator rows={5} />
            </>
    )
}
