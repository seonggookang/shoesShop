import React, { useEffect, useState } from "react";
import shops from "./data.json";
import "./Card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CarouselCard() {
  const [current, setCurrent] = useState(0);
  const [x, setX] = useState(0);
  const handleLeft = () => {
    setCurrent(current - 1);
  };

  const handleRight = () => {
    setCurrent(current + 1);
  };

  const handleMouseDown = (e) => {
    console.log(e.clientX);
  };
  document.addEventListener("mousedown", handleMouseDown);

  const handleMouseMove = (e) => {
    console.log(e.clientX);
    // e.client == undefined ? 0 : setX(e.clientX);

    console.log(e.clientX);
    return x;
  };
  document.addEventListener("mousemove ", handleMouseMove);

  // useEffect(() => {
  //   handleMouseMove();
  // }, [x]);
  return (
    <div className="carousel_container">
      {current !== 0 ? (
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="left-arrow"
          onClick={() => handleLeft()}
        />
      ) : (
        <FontAwesomeIcon icon={faArrowLeft} className="left-arrow-disabled" />
      )}

      <div className="carousel_card_wrapper">
        {shops.map((shop, idx) => {
          return (
            <div
              className="carousel_card"
              // 여기 안에서 clientX,clientY
              onChange={handleMouseDown}
              key={shop.nm}
              style={{
                transform: `translateX(-${
                  current * 10 * (100 / shops.length)
                }%)`,
                transition: "0.3s",
              }}
            >
              <img src={shop.image} alt="pic" />
              <div className="carousel_info">
                <div className="carousel_location">
                  <div className="carousel_title">
                    {idx + 1}.&nbsp;{shop.nm}
                  </div>

                  <div className="carousel_title_detail">
                    {shop.area} | {shop.distance}
                  </div>
                </div>
                <div className="carousel_category">{shop.category}</div>
                <div className="carousel_hashtag">
                  {shop.keyword.map((hashtag, i) => {
                    return <span key={i}>#{hashtag},</span>;
                  })}
                </div>
                <div className="carousel_score">
                  <div className="carousel_score1">{shop.score}</div>점 &nbsp;
                  <div className="carousel_score2">
                    🌕{shop.user_score}({shop.review_cnt}명)
                  </div>
                  &nbsp;&nbsp;
                  <div className="carousel_score3">
                    <span className="carousel_score33">❤</span>
                    <span>{shop.favorites_cnt}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {current !== 9 ? (
        <FontAwesomeIcon
          icon={faArrowRight}
          className="right-arrow"
          onClick={() => handleRight()}
        />
      ) : (
        <FontAwesomeIcon icon={faArrowRight} className="right-arrow-disabled" />
      )}
    </div>
  );
}

export default CarouselCard;
