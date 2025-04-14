import React, {useContext, useEffect} from "react";
import Header from "./components/layout/Header";
import {RouterProvider} from "react-router-dom";
import {router} from "./utils/Constants";
import {ToastContainer} from "react-toastify";
import {fetchChannels} from "./store/actions/channelActions";
import {useDispatch} from "react-redux";
import Footer from "./components/layout/Footer";
import {ThemeContext} from "./components/hooks/ThemeContext"; // Import Context
import ScrollButtons from "./components/ui/ScrollButtons";


function App() {
  const dispatch = useDispatch();
  const {darkMode} = useContext(ThemeContext);
  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  return (
    <>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <Header/>
        <div className="theme-toggle">
        </div>
        <RouterProvider router={router}/>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Footer id="footer"/>
      </div>
      <div>

      </div>
      <div>
        <ScrollButtons/>
      </div>
    </>
  );
}

export default App
