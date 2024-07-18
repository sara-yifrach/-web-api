import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { fetchAddGift, fetchDeleteGift, fetchGifts, fetchUpdateGift, fetchsearchByDName } from '../gifts/giftService2';
import { fetchDonators } from '../Donators/DonatorsService';
import { fetchSearchbyNameOfGift } from '../gifts/giftService2';
import { AutoComplete } from 'primereact/autocomplete';
import { fetchCategory } from '../Categories/CategoryService';
import { SplitButton } from 'primereact/splitbutton';
import { Menubar } from 'primereact/menubar';


export default function Searchby() {
    let emptyProduct = {
        donatorId: 0,
        gift: "",
        categoryId: 0,
        numOfPurchases: 0,
        image: null,
        price: 0
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [gifts, setGifts] = useState([]);
    const [donators, setDonators] = useState([]);
    const [value, setValue] = useState('');
    const [totalValue, setTotalValue] = useState('');
    const [idDonatores, setIdDonatores] = useState([]);
    const [namesDonatores, setNamesDonatores] = useState([]);
    const [place, setPlace] = useState();
    const [categories, setCategories] = useState([]);
    const [idCategories, setIdCategories] = useState([]);
    const [namesCategories, setNamesCategories] = useState([]);
    const [Cvalue, setCValue] = useState('');
    const [totalCvalue, setTotalCValue] = useState('');
    const [placeC, setPlaceC] = useState();
    const [file, setFile] = useState();
    const [giftsforStay, setGiftsforStay] = useState([]);


    
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
            url:"/Login",
            icon: 'pi pi-refresh'
        }      
    ];



    const getGifts = async () => {
        await fetchGifts().then((data) => setGifts(data));
    }

    const getDonators = async () => {
        await fetchDonators().then((data) => setDonators(data));
    }
    const getCategories = async () => {
        await fetchCategory().then((data) => setCategories(data));
    }

    useEffect(() => {
        getGifts()
    }, []);

    useEffect(() => {
        getDonators()

    }, []);

    useEffect(() => {
        getCategories()

    }, []);
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const onUpload = (e) => {
        setFile(e.target.files[0])
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = async () => {
        setSubmitted(true);
        console.log(product.gift.trim());
        if (product.gift.trim()) {
            debugger
            if (product.id) {
                debugger
                const c={
                    "categoryId":totalCvalue? totalCvalue : product.categoryId,
               "gift": product.gift,
                "donatorId": totalValue ? totalValue : product.donatorId,
                "ImageFile":product.imageFile,
                "numOfPurchases": product.numOfPurchases,
                "price":product.price,
                "winnerId": product.winnerId
                }
                const formData = new FormData();
                
                console.log(product);
                let p = await fetchUpdateGift(product.id, c)
                var res = await fetchGifts()
                setGifts(res)               
                console.log(p);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                const formData = new FormData();
                formData.append("categoryId", totalCvalue)
                formData.append("gift", product.gift)
                formData.append("donatorId", totalValue)
                formData.append("ImageFile", file)
                formData.append("numOfPurchases", product.numOfPurchases)
                formData.append("price", product.price)
                // formData.append("winnerId", product.winnerId)
                console.log(product);
                let p = await fetchAddGift(formData)
                console.log(p);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Gift Created', life: 3000 });
            }
            setProducts(products);
            var res = await fetchGifts()
            setGifts(res)
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = async (product) => {
        setProduct({ ...product });
        setTotalValue(product.donatorId)
        setValue(donators.find((e) => { return e.id == product.donatorId }).name)
        setCValue(categories.find((e) => { return e.id == product.categoryId }).name)
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = async () => {
        let _products;
        products ?
            _products = products.filter((val) => val.id !== product.id) : <></>
        product.numOfPurchases>0 ?  toast.current.show({ severity: 'error', summary: 'error', detail: 'you cant delete it because there are buyers!!', life: 3000 })
        : await fetchDeleteGift(product.id)
        

        setProducts(_products);
        var res = await fetchGifts()
        setGifts(res)
        setDeleteProductDialog(false);
        product.numOfPurchases==0? toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 }):<></>
        setProduct(emptyProduct);
    };
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = async () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={"https://localhost:7031/Gift/"+rowData.imageFile} alt={rowData.imageFile} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };


    const DonatorBodyTemplate = (rowData) => {
        let d = donators.find((e) => rowData.donatorId == e.id )
       if(d.name)
        return <div className="flex flex-wrap gap-2">{d.name}</div>
    }

    const CategoryBodyTemplate = (rowData) => {
        let c = categories.find((e) => { return rowData.categoryId == e.id })
        return <div className="flex flex-wrap gap-2">{c.name}</div>
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={async () => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Gifts</h4>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={() => saveProduct()} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const searchDonator = () => {

        const idArr = []
        const nameArr = []
        donators.map((item) => {
            idArr.push(item.id)
            nameArr.push(item.name)
        })
        setIdDonatores(idArr);
        setNamesDonatores(nameArr);
    }
    const searchCategory = () => {

        const idArrC = []
        const nameArrC = []
        categories.map((itemC) => {
            idArrC.push(itemC.id)
            nameArrC.push(itemC.name)
        })
        setIdCategories(idArrC);
        setNamesCategories(nameArrC);
    }

    useEffect(() => {
        if (value && place)
            console.log(idDonatores[place]);
        setTotalValue(idDonatores[place])
    }, [value])

    useEffect(() => {
        debugger
        if (Cvalue && placeC != null)
            console.log(idCategories[placeC]);
        setTotalCValue(idCategories[placeC])
    }, [Cvalue])

    const endContent = (
        <React.Fragment>
            <SplitButton label={localStorage.getItem("CostumerName")} model={item} icon="pi pi-check"></SplitButton>
        </React.Fragment>
    );
    const func=(e)=>{
        var res;
        debugger
        if(e.target.value=="")
        {
            if(gifts.length>0)
                if(giftsforStay.length>0)
            setGifts(giftsforStay)
        return
        }
        if(e!=" " && gifts.length>0 && e!="")
        {
           var c = gifts.find((gif) => 
                    gif.gift == e.target.value) 
        }
        console.log(c);
        setGiftsforStay(gifts)
        c !=null ? setGifts([c]) :
         toast.current.show({ severity: 'error', summary: 'failed to find a gift' , detail: '' , life: 3000 });
    }

    const funcFornumOfCostumers=(e)=>{
        var res;
        console.log(e.target.value);
        console.log(giftsforStay);


        debugger
        if(e.target.value=="")
        {
            if(gifts.length>0)
                if(giftsforStay.length>0)
            setGifts(giftsforStay)
        return
        }
        if(e!=" " && gifts.length>0 && e!=""){
        var c = gifts.filter((gif) => 
            gif.numOfPurchases == e.target.value) 
        }
        
        setGiftsforStay(gifts)
        console.log(c);
        c.length>0 ? setGifts(c) :
         toast.current.show({ severity: 'error', summary: 'failed to find a gift', detail: '', life: 3000 });
    }

    const funcForNameOfDonator=async(e)=>{
        console.log(e.target.value);
        debugger
        if(e.target.value=="")
            {
                if(gifts.length>0)
                    if(giftsforStay.length>0)
                setGifts(giftsforStay)
            return
            }
        if(e!=" " && gifts.length>0 && e!=""){ 
            debugger
            var res = await fetchsearchByDName(e.target.value)
            console.log(res);    

        // var c = gifts.find((gif) => 
        //     gif.donatorId == e.target.value) 
        }
        
        setGiftsforStay(gifts)
        console.log(res);
        res.length>0 ? setGifts(res) :
         toast.current.show({ severity: 'error', summary: 'failed to find a gift', detail: '', life: 3000 });
    }


    return (<>
        <div className="card">
        <Menubar model={items} end={endContent} />
        </div>
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-gift"></i>
                    </span>
                    <InputText placeholder="searchByNameOfGift" onBlur={(e) => {
                      func(e)
                    }}
                    />
                </div>
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="searchByNameOfDonator" onBlur={async(e) => {
                     await funcForNameOfDonator(e)}}/>
                </div>
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">$</span>
                    <InputNumber placeholder="searchByNumOfCostumers"onBlur={(e) => {
                      funcFornumOfCostumers(e)
                    }} />
                    <span className="p-inputgroup-addon">
                    </span>
                </div>
                <DataTable ref={dt} value={gifts} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column field="gift" header="gift" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="donator" header="donator" body={DonatorBodyTemplate} sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="category" header="Category" body={CategoryBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="numOfPurchases" header="numOfPurchases" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Gift Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={"https://localhost:7031/Gift/"+product.image} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name of gift
                    </label>
                    <InputText id="name" defaultValue={product.gift} onChange={(e) => onInputChange(e, 'gift')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.gift })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Donators</label>

                    <AutoComplete
                        value={value}
                        suggestions={namesDonatores}
                        completeMethod={searchDonator}
                        onChange={(e) => { console.log(namesDonatores.indexOf(e.value)); setPlace(namesDonatores.indexOf(e.value)); setValue(e.value) }}
                        dropdown
                    />
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">Category</label>

                    <AutoComplete
                        value={Cvalue}
                        suggestions={namesCategories}
                        completeMethod={searchCategory}
                        onChange={(e) => { console.log(namesCategories.indexOf(e.value)); setPlaceC(namesCategories.indexOf(e.value)); setCValue(e.value) }}
                        dropdown
                    />
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                </div>
                <input type='file' accept='image/*' onChange={(e) => onUpload(e)}></input>
            </Dialog>


            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
{/* 
            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog> */}
        </div>
        </>
    );
}
