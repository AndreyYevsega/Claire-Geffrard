import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Converter from "../../components/converter";
import HistoricalRates from "../../components/HistoricalRates";

import "./style.scss";

const Home = () => {
  const [exchange, setExchange] = useState<any>(null);
  const [history, setHistory] = useState<any>(null);
  const [symbol, setSymbol] = useState<string>("USD");
  const [dates, setDates] = useState<[string | null, string | null] | null>([
    "2020-09-01",
    "2020-10-05",
  ]);
  useEffect(() => {
    if (
      !exchange &&
      !history &&
      localStorage.history &&
      localStorage.exchange
    ) {
      setExchange(JSON.parse(localStorage.exchange));
      setHistory(JSON.parse(localStorage.history));
    }
    if (!exchange && !localStorage.history && !localStorage.exchange) {
      loadExchange();
      loadHistory();
    }
    // eslint-disable-next-line
  }, []);

  const loadHistory = useCallback(async () => {
    let formated: any = [];
    let loadData = await axios.get(
      `https://api.exchangeratesapi.io/history?start_at=${
        dates && dates[0]
      }&end_at=${dates && dates[1]}&base=GBP&symbols=${symbol}`
    );
    if (loadData && loadData.data) {
      Object.entries(loadData.data.rates).forEach((s: any) => {
        formated.unshift({ date: s[0], value: s[1]["USD"] });
      });
      let sortDate = formated.sort(
        (a: any, b: any) =>
          (new Date(a.date) as any) - (new Date(b.date) as any)
      );
      setHistory(sortDate);
      localStorage.setItem("history", JSON.stringify(sortDate));
    }
  }, [dates, symbol]);

  const loadExchange = useCallback(async () => {
    let loadData = await axios.get(
      `https://api.exchangeratesapi.io/latest?base=GBP&symbols=USD,EUR,SGD`
    );

    if (loadData && loadData.data) {
      setExchange(loadData.data);
      localStorage.setItem("exchange", JSON.stringify(loadData.data));
    }
  }, []);

  return (
    <div>
      <div className="h1">GBP CONVERTER </div>
      <Converter symbol={symbol} setSymbol={setSymbol} exchange={exchange} />
      <HistoricalRates
        loadHistory={loadHistory}
        setDates={setDates}
        history={history}
      />
    </div>
  );
};

export default Home;
