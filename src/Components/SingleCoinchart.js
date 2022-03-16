import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function SingleCoinchart({ currency }) {
  let { id } = useParams();
  // console.log(id, currency);
  const [coinHistoricData, setcoinHistoricData] = useState([]);
  // console.log("his data", coinHistoricData);
  const [Days, setDays] = useState(1);
 
  useEffect(() => {
    function getHistoricData() {
      fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${Days}
      `)
        .then((response) => response.json())
        .then((coinData) => setcoinHistoricData(coinData.prices),setDays(1));
    }
    getHistoricData()
  },[Days,currency,id]);

  // console.log(coinHistoricData);
  return (
    <div className="coin-graph">
      <h1>
        Graphical Data of
        <span className="highlighter"> {id.toUpperCase()}</span>
      </h1>
      {!coinHistoricData ? (
        <h3>Loading graphical data... of {id}</h3>
      ) : (
        <>
          <Line
            data={{
              labels: coinHistoricData.map((coindata) => {
                const date = new Date(coindata[0]);
                const time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                    : `${date.getHours()} : ${date.getMinutes()} AM`;
                return Days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: coinHistoricData.map((coin) => coin[1]),
                  label: `Price (Past ${Days} Days)in ${currency} `,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 0,
                  backgroundColor: "#EEBC1D",
                },
              },
              plugins: {
                tooltip: {
                  bodyColor: "#ecf0f1",
                },
              },
              maintainAspectRatio: true,
              responsive: true,
            }}
          />
        </>
      )}
      {/* <Line
      
      /> */}
    </div>
  );
}
