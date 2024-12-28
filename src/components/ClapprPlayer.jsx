import React, {useEffect, useRef, useState} from 'react';
import Clappr from 'clappr';
import '../App.css';
import './ClapprPlayer.css';
import GetTokenAPI from "../api/GetToken";

const ClapprPlayer = ({source, img = '', width = '100%', height = '70vh'}) => {
    const playerRef = useRef(null);
    const [hlsUrl, setHlsUrl] = useState("");
    useEffect(() => {
        const fetchHlsUrl = async () => {
            try {
                const uri = {
                    uri: source,
                }
                const response = await GetTokenAPI.getToken(uri)
                const jwt = response.data;
                const hls_url = "https://usasport.live" + source + "?token=" + jwt
                setHlsUrl(hls_url);
            } catch (error) {
                console.error("Error fetching HLS URL:", error);
            }
        };
        fetchHlsUrl();
    }, [source]);

    useEffect(() => {
        // Kiểm tra xem playerRef đã tồn tại chưa
        if (!playerRef.current) return;

        // Khởi tạo player Clappr
        const player = new Clappr.Player({
            source: "https://stream-fastly.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8",
            parent: playerRef.current,
            parentId: '#player',
            autoPlay: true,
            mute: false,
            width: width,
            height: height,
            disableErrorScreen: true,
            poster: `${img}`,
            watermark: "https://usasport.live/stream_client/usa_sport.png",
            position: "top-left",
            xhr: {
                headers: {
                    'Referer': 'https://usasport.live',
                }
            }
        });

        player.on(Clappr.Events.PLAYER_READY, () => {
            player.play();
        });

        player.on(Clappr.Events.PLAYER_ERROR, async (error) => {
            console.error("Player error:", error);
            // Kiểm tra nếu lỗi là do token hết hạn (403)
            if (error && error.message && error.message.includes("403")) {
                try {
                    console.log("Refreshing token...");
                    const uri = {uri: source};
                    const response = await GetTokenAPI.getToken(uri);
                    const newJwt = response.data;
                    const newHlsUrl = "https://usasport.live" + source + "?token=" + newJwt;

                    // Cập nhật URL mới và phát lại video
                    setHlsUrl(newHlsUrl);
                } catch (refreshError) {
                    console.error("Error refreshing token:", refreshError);
                }
            }
        })

        // player.on(Clappr.Events.PLAYER_PLAY, () => {
        //     setIsplay(true);
        // });
        // player.on(Clappr.Events.PLAYER_PAUSE, () => {
        //     setIsplay(false);
        // });
        // player.on(Clappr.Events.PLAYER_STOP, () => {
        //     console.log('stop');

        //     setIsplay(false);
        // });
        // player.on(Clappr.Events.PLAYER_ERROR , () => {
        //     setIsplay(false);
        // });
        // Cleanup: hủy player khi component unmount
        return () => {
            player.destroy();
        };
    }, [hlsUrl, width, height, img]); // Gọi lại khi source, width hoặc height thay đổi

    return (
        <div>
            {img !== '' ? <div id='player' ref={playerRef}/> : ''}
        </div>
    )
};

export default ClapprPlayer;
