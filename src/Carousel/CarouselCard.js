import React, { useEffect, useState } from "react";
import shops from "./data.json";
import "./Card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CarouselCard() {
  const [current, setCurrent] = useState(0);
  const [startPoint, setStartPoint] = useState(0);
  const [endpoint, setEndpoint] = useState(0);
  const [startY, setStartY] = useState(0);
  const [EndY, setEndY] = useState(0);
  const [show, setShow] = useState(false);

  const handleLeft = () => {
    setCurrent(current - 1);
  };

  const handleRight = () => {
    setCurrent(current + 1);
  };

  const result = startPoint - endpoint;
  const resultY = EndY - startY;

  const handleMouseDown = (e) => {
    console.log("시작 x,y : ", e.clientX, e.pageY);
    setStartPoint(e.clientX);
    setStartY(e.pageY);
  };
  const handleMouseUp = (e) => {
    console.log("도착 x,y : ", e.clientX, e.pageY);
    setEndpoint(e.clientX);
    setEndY(e.pageY);
  };
  console.log("resultY : ", resultY);
  useEffect(() => {
    if (resultY > 30) {
      setShow(true);
    } else {
      if (result > 0) {
        if (current < 9) {
          handleRight();
        }
      } else if (result < 0) {
        if (current > 0) {
          handleLeft();
        }
      } else {
        if (startPoint !== endpoint) {
          setCurrent(0);
        }
      }
    }
  }, [endpoint]); // 유레카

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

      <div
        className="carousel_card_wrapper"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          opacity: show ? 0 : 1,
          transform: `translateY(${show ? 50 : 0}px)`,
          transition: "0.5s",
        }}
      >
        {shops.map((shop, idx) => {
          return (
            <div
              className="carousel_card"
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
