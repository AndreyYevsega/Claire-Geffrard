import React, { useState, useCallback, useMemo } from "react";
import { Input, Select } from "antd";
import "./style.scss";

const { Option } = Select;

const Converter = (props: any) => {
  const { exchange, setSymbol, symbol } = props;

  const [inputValue, setInputValue] = useState<number>(1);

  const handleSelect = useCallback(
    (e) => {
      setSymbol(e);
    },
    [setSymbol]
  );

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const convertValue = useMemo(
    () =>
      exchange &&
      exchange.rates &&
      (inputValue * exchange.rates[symbol]).toFixed(6),
    [inputValue, symbol, exchange]
  );

  return (
    <div className="wrap-converter">
      <div className="wrap-input">
        <Input
          value={inputValue}
          className="input"
          placeholder="Input value"
          type="number"
          onChange={handleInputChange}
        />
        <div>GBP</div>
      </div>
      <div>to</div>
      <Select defaultValue="USD" style={{ width: 120 }} onChange={handleSelect}>
        {exchange &&
          exchange.rates &&
          Object.keys(exchange.rates).map((key) => (
            <Option key={key} value={key}>
              {key}
            </Option>
          ))}
      </Select>

      <div className="exchange-value">{`GBP ${inputValue} = ${symbol} ${convertValue}`}</div>
    </div>
  );
};

export default Converter;
