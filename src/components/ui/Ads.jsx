import {useEffect, useRef} from 'react';

const Ads = ({src, keyId, width, height, delay}) => {
  const adContainerRef = useRef(null);

  useEffect(() => {

    const timer = setTimeout(() => {
      if (adContainerRef.current) {
        window.atOptions = {
          key: keyId, format: 'iframe', height: height, width: width, params: {},
        };

        const script = document.createElement("script");
        script.id = adContainerRef.current.id;
        script.type = "text/javascript";
        script.async = true;
        script.src = src;
        adContainerRef.current.appendChild(script);
      }
    }, delay)

    return () => {
      clearTimeout(timer);
      // Dọn tài nguyên khi component bị hủy
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = '';
      }
    };
  }, [src, delay]);

  return <div ref={adContainerRef} id={`ad-container-${keyId}`}/>;
};

export default Ads;
