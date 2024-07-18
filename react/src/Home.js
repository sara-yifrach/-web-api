import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { Galleria } from 'primereact/galleria';

export default function Home(props) {
    const navigate = useNavigate();
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
            url: "/Login",
            icon: 'pi pi-refresh'
        } 

    ];

    const endContent = (
        <React.Fragment>
            <SplitButton label={localStorage.getItem("CostumerName")} model={item} icon="pi pi-check"></SplitButton>
        </React.Fragment>
    );

    return (
        <>
            <div className="card">
                <Menubar model={items} end={endContent} />
            </div>
            <img src="./1.jpg"/>
        </>
    )
}
