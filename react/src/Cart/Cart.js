import React, { useEffect, useState, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { Navigate, useNavigate } from 'react-router-dom';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { fetchCardsForCurrentPurchase, fetchPurchases, fetchDeleteCard } from './CartService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { GetExistPurchase, changeStatusById, fetchGifts } from '../gifts/giftService2';
import { Dialog } from 'primereact/dialog';


export default function Cart() {
    const navigate = useNavigate();
    const [Purchases, setPurchases] = useState([])
    const [Gifts, setGifts] = useState([])
    const [Gift, setGift] = useState([])
    const toast = useRef(null);
    const [p, setP] = useState(null)
    const [deleteGiftDialog, setDeleteGiftDialog] = useState(false);

    let emptyCard = {
        giftId: 0,
        purchaseId: 0
    };
    const getExistPurchases = async () => {
        await GetExistPurchase()
        var p = localStorage.getItem("purchaseId")
        await fetchCardsForCurrentPurchase(p).then((data) => setPurchases(data));
    }
    const getGifts = async () => {
        setGifts(await fetchGifts())
    }
    useEffect(() => {
        getGifts()
    }, []);

    useEffect(() => {
        getExistPurchases()

    }, [])
    const hideDeleteGiftDialog = () => {
        setDeleteGiftDialog(false);
    };

    const confirmDeleteGift = (g) => {
        setGift(g);
        setDeleteGiftDialog(true);
    };

    const deleteGiftDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteGiftDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => { deleteGift() }} />
        </React.Fragment>
    );
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
            icon: 'pi pi-refresh',
            url: "/login"
        }
    ];


    var deleteGift = async () => {
        let _purchses;
        Purchases ?
            _purchses = Purchases.filter((val) => val.id !== Gift.id) : <></>
        await fetchDeleteCard(Gift.id)
        setPurchases(_purchses);
        setDeleteGiftDialog(false);
        setGift(emptyCard);
    };

    const endContent = (
        <React.Fragment>
            <SplitButton label={localStorage.getItem("CostumerName")} model={item} icon="pi pi-check"></SplitButton>
        </React.Fragment>
    );

    const PurchaseIdBodyTemplate = (rowData) => {
        return <div className="flex flex-wrap gap-2">{rowData.purchaseId}</div>
    }
    const GiftIdBodyTemplate = (rowData) => {
        const found = Gifts.find((e) =>
            e.id == rowData.giftId
        )

        return found ? <div className="flex flex-wrap gap-2">{found.gift}</div> : <></>
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteGift(rowData)} />
            </React.Fragment>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={"https://localhost:7031/Gift/"+rowData.imageFile} alt={rowData.imageFile} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const changePurchaseStatus=async()=>{
       await changeStatusById()
       navigate("../buy&pay",{replace:false})       
    }
    return (
        <>
            <div className="card">
                <Menubar model={items} end={endContent} />
                <DataTable value={Purchases}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"  >
                    <Column field="Gift" header="Gift" body={GiftIdBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    {/* <Column field="imageFile" header="Image" body={imageBodyTemplate}></Column> */}

                    <Column field="                           " header="                   " ></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
               
                </DataTable>

                <Dialog visible={deleteGiftDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteGiftDialogFooter} onHide={hideDeleteGiftDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {Gift && (
                            <span>
                                Are you sure you want to delete <b>{Gift.gift}</b>
                            </span>
                        )}
                    </div>
                </Dialog>
                <div className="card flex flex-wrap align-items-center justify-content-center gap-3">                   
                    <Button label="Save And Pay" icon="pi pi-check" size="large" onClick={()=>{changePurchaseStatus()}} />
                </div>                
            </div>
        </>)
}
