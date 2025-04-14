import React from "react";
import {useSelector} from "react-redux";
import {Helmet, HelmetProvider} from "react-helmet-async";

const ImageBanner = () => {
  const newsData = useSelector((state) => state.channels).news || [];
  const bannerData = (newsData || [])
    .slice(0, 3)
    .map((item) => ({
      imageUrl: item.images && item.images[0] ? item.images[0].url : "",
      altText: item.headline,
      link: item.links?.web?.href || "#",
    }))
    .filter((item) => item.imageUrl);

  const handleBannerClick = (link) => {
    window.open(link, "_blank");
  };

  if (bannerData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link rel="preload" as="image" href={bannerData[0].imageUrl} />
        </Helmet>
      </HelmetProvider>
      <div className="w-100">
        <h1 className="hot-news-title">USA Sport Live | Watch free streaming</h1>
        <div className="banner-news">
          <img
            src={bannerData[0].imageUrl}
            alt={bannerData[0].altText}
            className="banner-image"
            onClick={() => handleBannerClick(bannerData[0].link)}
          />
          <a className="title-banner" href={bannerData[0].link} target="_blank" rel="noopener noreferrer">
            {bannerData[0].altText}
          </a>
        </div>
      </div>
    </>
  );
};

export default ImageBanner;
