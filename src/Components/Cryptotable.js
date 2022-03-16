import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Cryptotable.css";

export default function Cryptotable() {
  const history = useHistory();
  const [coinData, setcoinData] = useState([]);
 console.log(coinData)
  function getCoinData() {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=30&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => setcoinData(data));
     
  }
  
  
  

  useEffect(() => { 
    getCoinData();
  }, []);

  return (
    <div>
      {" "}
      <div className="crypto--table--container">
      <h1>Track Your Crypto</h1>

        <table className="crypto--table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>24h change</th>
              <th>MKt Cap</th>
            </tr>
          </thead>
          <tbody>
            {coinData ? coinData.map((coinsdata, index) => {
              const profit = coinsdata.price_change_percentage_24h > 0
              return (
                // location(`/Pages/SingleCoin/${coinsdata.id}`)
                <tr key={index}>
                  <td
                    onClick={() => {
                      history.push(`/SingleCoin/${coinsdata.id}`);
                    }}
                  >
                    <div className="coin--desc" style={{ cursor: "pointer" }}>
                      <img src={coinsdata.image} alt={coinsdata.name} />
                      <p className="coin--name">{coinsdata.name}</p>
                    </div>
                  </td>
                  <td>₹{coinsdata.current_price.toLocaleString()}</td>
                  <td style={{
                    color: profit > 0 ? "green" : "red",fontWeight: 500,
                  }}>
                    {profit && "+"}{coinsdata.price_change_percentage_24h.toFixed(2)}%</td>
                  <td>₹{coinsdata.market_cap.toLocaleString()}</td>
                </tr>
              );
            }) : <h1>Loading Cryptotable with Data...</h1>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
