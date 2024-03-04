import React from "react";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import Loading from "./Loading";
import { FaDownload, FaShare } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

let Photos = ({ userquery }) => {
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState([]);  
  const [page, setpage] = useState(1);

  useEffect(() => {
    const getImages = async () => {
      try {
        const clientID= process.env.REACT_APP_CLIENT_URL;
        const mainUrl= process.env.REACT_APP_MAIN_URL;
        const searchUrl = process.env.REACT_APP_SEARCH_URL;
        let url;

        if (userquery) {
          url = `${searchUrl}${clientID}&query=${userquery}`;
        } else {
          url = mainUrl + clientID;
        }
        url += `&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();

        const transformedData = userquery
          ? data.results.map((photo, index) => {
              return {
                ...photo,
                id: index,
              };
            })
          : data.map((photo, index) => {
              return {
                ...photo,
                id: index,
              };
            });
        setPhoto(transformedData);
      } catch (error) {
        console.log("Error Occured", error);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [userquery, page]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if(!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
        setpage((prevPage) => prevPage +1)
      }
    }, 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const handleShare = (photoUrl) => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Take a look on this photo: ${photoUrl}`)}`;
    window.open(shareUrl, "_blank");
  }

  const handleDownload = (photoUrl, photoID) => {
    const link = document.createElement("a");
    link.href = photoUrl;
    link.target = "_blank";
    link.download = `photo_${photoID}.jpg`;
    link.click();
  }

  return (
    <div>
      <div className="photosContainer">
        {photo.map((photo) => {
          return (
            <div key={photo.id} className="photoCard">
              <div className="cardImgContainer">
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  className="cardImg"
                />
                <div className="aboutImg">
                  <div className="likeDiv">
                    <button>
                      <AiFillLike />
                      <span>{ photo.likes }</span>
                    </button>
                  </div>
                  <div className="shareDownDiv">
                    <button onClick={() => handleShare(photo.urls.regular)}>
                      <FaShare />
                    </button>
                    <button onClick={() => handleDownload(photo.urls.full, photo.id)}>
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </div>
              <div className="aboutPhotographer">
                <p>Photographer : {photo.user.name}</p>
                <p>
                  Portfolio :
                  {photo.user.portfolio_url ? (
                    <a href={photo.user.portfolio_url}>
                      Link
                    </a>
                  ) : (
                    " Not Available"
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
};

export default Photos;