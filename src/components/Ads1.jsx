import React, { useEffect } from 'react';

const Ads1 = ({src, zoneId, delay}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            // Chèn script đầu tiên
            const script1 = document.createElement('script');
            script1.id = zoneId;
            script1.type = 'text/javascript';
            script1.innerHTML = `
            aclib.runBanner({
                zoneId: '${zoneId}',
            });
        `;
            document.getElementById(zoneId).appendChild(script1);
            // Chèn script thứ hai
            const script2 = document.createElement('script');
            script2.type = 'text/javascript';
            script2.async = true;
            script2.referrerPolicy = 'no-referrer-when-downgrade';
            document.getElementById(zoneId).appendChild(script2);
        }, delay)



        // Dọn dẹp khi component bị unmount
        return () => {
            clearTimeout(timer);
            document.getElementById(zoneId).innerHTML = '';
        };
    }, [delay, src, zoneId]);

    return <div id={zoneId}></div>;
};

export default Ads1;
