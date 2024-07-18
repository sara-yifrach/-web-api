// import React, {  useRef } from 'react';
// import { useMountEffect } from 'primereact/hooks';
// import { Messages } from 'primereact/messages';





import React, { useEffect, useRef } from 'react'; 
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';

export default function BuyAndPay() {
    const msgs = useRef(null);

    useMountEffect(() => {
        if (msgs.current) {
            msgs.current.clear();
            
            msgs.current.show({
                severity: 'info',
                sticky: true,
                content: (
                    <React.Fragment>
                        <img alt="thanks" src="./223.jpg" width="32" />
                        {/* <img src="./1.jpg"/> */}
                        <div className="ml-2">THANK YOU FOR BUYING! HOPING YOU'LL WIN!!!!!!!!!!</div>
                    </React.Fragment>
                )
            });
        }
    }); 

    return (
        <div className="card flex justify-content-center">
            <Messages ref={msgs} />
        </div>
    )
}
        