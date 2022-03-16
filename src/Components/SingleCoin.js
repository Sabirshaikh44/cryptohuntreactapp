import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import Navbar from "./Navbar";
import "./SingleCoin.css";
import SingleCoinchart from "./SingleCoinchart";

export default function SingleCoin() {
  let { id } = useParams();
  // console.log(id);
  const [singleCoinData, setsingleCoinData] = useState([]);
  // console.log(singleCoinData);
  function getSingleCoinData() {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((singlecoinData) => setsingleCoinData(singlecoinData));
  }
  useEffect(() => {
    getSingleCoinData();
  },[]);
  return (
    <div>
      <Navbar />
      <div className="singlecoin--container">
        <div className="singlecoin--data singlecoin--split">
          <div className="singlecoin--info">
            {singleCoinData.name ? (
              <div>
                <img src={singleCoinData.image.large} />
                <h1 className="coin--name">{singleCoinData.name}</h1>
                <p className="singlecoin--desc">
                  {HTMLReactParser(
                    singleCoinData.description.en.split(". ")[0]
                  )}
                </p>
                <p>
                  Rank :
                  <span className="singlecoin--rank">
                    {" "}
                    #{singleCoinData.market_cap_rank}
                  </span>
                </p>
                <p>
                  Price :{" "}
                  <span className="singlecoin--price">
                    ₹
                    {singleCoinData.market_data.current_price.inr.toLocaleString()}
                  </span>
                </p>
                <p>
                  Market Cap :{" "}
                  <span className="singlecoin--marketcap">
                    ₹
                    {singleCoinData.market_data.market_cap.inr.toLocaleString()}
                  </span>
                </p>
              </div>
            ) : (
              <h1 className="coin--name">Loading data...</h1>
            )}
          </div>
          <div className="singlecoin--graph">
            <SingleCoinchart currency="INR" />
          </div>
        </div>
      </div>
    </div>
  );
}
