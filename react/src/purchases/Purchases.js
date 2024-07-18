

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { fetchGifts } from "../gifts/giftService2"
import { fetchWinner, getAllCardsTrueForGiftId } from "./purchasesService"
import { SplitButton } from 'primereact/splitbutton';
import { Menubar } from 'primereact/menubar';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { Toolbar } from 'primereact/toolbar';

export default function Purchases() {
    let emptyProduct = {
        donatorId: 0,
        gift: "",
        categoryId: 0,
        winnerId: null,
        numOfPurchases: 0,
        imageFile: null,
        price: 0
    };

    const [gifts, setGifts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const [selectedProduct, setSelectedProduct] = useState(emptyProduct);
    const [rowClick, setRowClick] = useState(true);  
    const dt = useRef(null);
    const [resWinner, setResWinner] = useState([]);
    const [res, setRes] = useState(0);

    



    useEffect(() => {
        const fetchData = async () => {
            const fetchedGifts = await fetchGifts();
            setGifts(fetchedGifts);
        };
        
        fetchData()
    }, []);
    useEffect(() => {
        var ress = 0;
        if(gifts.length>0)
            gifts.forEach(gift => 
                ress+= gift.numOfPurchases * gift.price
            ); 
        setRes(ress)
        console.log(res)
    }, [gifts]);

       
    
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

    const exportCSV = () => {
        dt.current.exportCSV();
    };
    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const onRowExpand = async (event) => {
        try {
            const data = await getAllCardsTrueForGiftId(event.data.id);
            console.log(data);
            event.data.cards = data;
            setGifts([...gifts]); // Update state with modified gift data
        } catch (error) {
            console.error('Error fetching cards: ', error);
        }
    };

    const onRowCollapse = () => {
        // Handle row collapse if needed
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5>Cards for Gift: {data.gift}</h5>
                <DataTable value={data.cards}>
                    <Column field="name" header="NameofCostumer" sortable></Column>
                    <Column field="email" header="Email" sortable></Column>
                    <Column field="paymentMethod" header="PayMentMethod" sortable></Column>
                    {/* Add more columns for other card data if needed */}
                </DataTable>
            </div>
        );
    };

    const endContent = (
        <React.Fragment>
            <SplitButton label={localStorage.getItem("CostumerName")} model={item} icon="pi pi-check"></SplitButton>
        </React.Fragment>
    );

    const imageBodyTemplate = (rowData) => {
        return <img src={"https://localhost:7031/Gift/" + rowData.imageFile} alt={rowData.imageFile} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };
    const numBodyTemplate = (rowData) => {
        return <div className="flex flex-wrap gap-2">{onRowExpand}</div>
    };
    const FuncToWinner=async(id)=>{
     await fetchWinner(id).then((res)=>{setResWinner(res)})
      
    }
    useEffect(() => {
        console.log(selectedProduct);
        if(selectedProduct){
        if(selectedProduct.winnerId){ { toast.current.show({
            severity: 'info',
            sticky: false,
            content: (
                <React.Fragment>
                    <img alt="thanks" src="./223.jpg" width="32" />
                    <div className="ml-2">cant draw!
                        drawed already!
                    </div>
                </React.Fragment>)})}return;}
                else{ 
        selectedProduct.imageFile ?
      FuncToWinner(selectedProduct.id):<></>}}
      else{}
    }, [selectedProduct])


    useEffect(() => {
        console.log(resWinner); 
        if(!selectedProduct.id)
            {
                return toast.current.show({
                    severity: 'info',
                    sticky: false,
                    content: (
                        <React.Fragment>
                            <img alt="thanks" src="./223.jpg" width="32" />
                            <div className="ml-2"></div>
                        </React.Fragment>)});
            }
        if(selectedProduct.numOfPurchases == 0) 
            return toast.current.show({
            severity: 'info',
            sticky: false,
            content: (
                <React.Fragment>
                    <img alt="thanks" src="./223.jpg" width="32" />
                    <div className="ml-2">There Are No Buyers For This Gift!</div>
                </React.Fragment>)});
        
            if(selectedProduct.length==0)
            {
               return toast.current.show({
                    severity: 'info',
                    sticky: false,
                    content: (
                        <React.Fragment>
                            <img alt="thanks" src="./223.jpg" width="32" />
                            <div className="ml-2">kkk</div>
                        </React.Fragment>)});
            }
        if(resWinner.length>0){   
       return toast.current.show({
            severity: 'info',
            sticky: false,
            content: (
                <React.Fragment>
                    <img alt="thanks" src="./223.jpg" width="32" />
                    <div className="ml-2">{resWinner.name} Is The Winner of {selectedProduct.gift}</div>
                </React.Fragment>
            )
        })}
      }, [resWinner])

    return (<>
        <div className="card">
            <Menubar model={items} end={endContent} />
        </div>
       
        <div className="card"> 
            <div className="card">
                <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
                <div className="p-inputgroup flex-1">
                     </div>       
            {/* <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} />
                <label htmlFor="input-rowclick">Row Click</label>
            </div> */}
            <Toast ref={toast} />
            <DataTable  ref={dt}  value={gifts} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                selectionMode={rowClick ? null : 'radiobutton'} selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)}
                tableStyle={{ minWidth: '50rem' }}
                dataKey="id">
                <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                <Column expander style={{ width: '3em' }} />
                <Column field="gift" header="Gift Name" sortable />
                <Column field="price" header="Price" sortable />
                <Column field="numOfPurchases" header="Num of Purchases" sortable />
                <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                <Column field="winnerId" header="the Winner Id" ></Column>


            </DataTable>
             <Button label="InComes" icon="pi pi-upload" className="p-button-help" onClick={()=>{        
         toast.current.show({
            severity: 'info',
            sticky: false,
            content: (
                <React.Fragment>
                    <img alt="thanks" src="./223.jpg" width="32" />
                    <div className="ml-2">The InComes for this Sale Is : {res}!
                    </div>
                </React.Fragment>)})}} />

            </div>
        </div>
    </>);
}
