import ChannelList from "./ChannelList";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {fetchChannels} from "../store/actions/channelActions";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {Col} from "react-bootstrap";
import Ads from "./Ads";

function Home() {
    const dispatch = useDispatch();
    const [isScrollable, setIsScrollable] = useState(true);
    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setIsScrollable(false);
            } else {
                setIsScrollable(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Home Page</title>
                </Helmet>
            </HelmetProvider>
            <Col xs={12} sm={12} md={12} lg={12}>
                <div className="m-lg-5">
                    <div className="m-lg-4 w-100 d-flex justify-content-center align-items-center">
                        <Ads
                            src="\/\/forsakenburn.com\/b\/XqV.s\/dmGulA0\/YsWkcf\/seVmN9\/u\/Z\/UulekUPlT\/YKw\/M\/zfEU1_MLjLMItZNWjOALzXM\/T\/U\/yvNqAr"
                            zoneId='nkn6q3njsq'
                            delay={0}
                        />
                    </div>
                    <ChannelList scroll={isScrollable}/>
                </div>
            </Col>

        </>
    )
}

export default Home;