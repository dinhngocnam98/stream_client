import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const ScrollToTop = () => {
  const {pathname} = useLocation();
  console.log(pathname)
  useEffect(() => {
    console.log(pathname)
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, [pathname]); // Chỉ chạy khi `pathname` thay đổi

  return null;
};

export default ScrollToTop;
