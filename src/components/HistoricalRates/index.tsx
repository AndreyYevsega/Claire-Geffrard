import React from "react";
import { DatePicker, Button } from "antd";
import moment from "moment";
import "./style.scss";

const { RangePicker } = DatePicker;

const HistoricalRates = (props: any) => {
  const { history, setDates, loadHistory } = props;

  const disabledDate = (current: any) => {
    return current && current > moment(new Date(), "YYYY-MM-DD");
  };

  return (
    <>
      <div className="wrap-picker">
        <RangePicker
          disabledDate={disabledDate}
          format="YYYY-MM-DD"
          defaultValue={[moment("2020-01-01"), moment(new Date())]}
          onChange={(e, formated) => setDates(formated)}
        />
        <Button onClick={() => loadHistory()} type="primary">
          Load historical rates
        </Button>
      </div>

      <div>
        {history &&
          history.map((el: any) => (
            <div className="wrap-date" key={el.value.toString()}>
              <div>{el.date}</div>
              <div>{el.value}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default HistoricalRates;
