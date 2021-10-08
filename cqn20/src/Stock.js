import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function SearchBar(props) {
  return (
    <form>
      <label>
        <span>Search a Stock </span>
      </label>
      <input
        type="text"
        id="header-search"
        onKeyDown={(e) => {
          // key 13 is the enter button.
          // === is strictly equal, it checks the value and type
          if (e.keyCode === 13) {
            props.searchStock(e.target.value);
          }
        }}
        placeholder="TSLA"
      />
      <button type="button" onClick={props.handlingSubmit}>
        Search
      </button>
    </form>
  );
}

function Stock() {
  // keep track of the json data of the stock we are using
  const [jsonData, setData] = useState([]);
  // keep track of the stock that was searched
  const [search, setSearch] = useState("");
  let x = [];
  let close = [];
  let high = [];
  let low = [];
  let open = [];

  const handleSubmit = () => {
    setSearch(document.getElementById("header-search").value);
  };

  useEffect(() => {
    const API_KEY = "HGJWFG4N8AQ66ICD";
    let StockSymbol = search;
    // console.log(StockSymbol);
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    fetch(API_Call)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setData(data["Time Series (Daily)"]);
      });
    // [] if removed useEffect() will only run once
    // if no [] it will run every second
    // if [search] then it will run use Effect every time
    // there's a change in search state
  }, [search]);

  for (var date in jsonData) {
    x.push(date);
    open.push(jsonData[date]["1. open"]);
    high.push(jsonData[date]["2. high"]);
    low.push(jsonData[date]["3. low"]);
    close.push(jsonData[date]["4. close"]);
  }
  // console.log(jsonData);

  return (
    <div>
      <h1>Stock Market</h1>
      <SearchBar handlingSubmit={handleSubmit} />
      <Plot
        data={[
          {
            type: "candlestick",
            x: x,
            open: open,
            high: high,
            low: low,
            close: close
          }
        ]}
        layout={{ width: 1500, height: 1000, title: search }}
      />
    </div>
  );
}

export default Stock;
