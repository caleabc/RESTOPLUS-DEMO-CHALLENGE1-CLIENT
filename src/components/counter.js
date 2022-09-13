// libraries
import { useState, useEffect } from "react";
import { Button, SIZE } from "baseui/button";
import axios from "axios";

// components
import Spacer from "./spacer";

// css
import "./counter.css";

function Counter() {
  // we need to create a local database in order for us to keep track the
  // current state of value, also it execute faster when storing and retrieving data
  let [value, setValue] = useState(0);

  function handleClickDecrement() {
    let valueCopy = value - 1;
    setValue(valueCopy);

    saveToDatabase(valueCopy);
  }

  function handleClickIncrement() {
    let valueCopy = value + 1;
    setValue(valueCopy);

    saveToDatabase(valueCopy);
  }

  function handleClickReset() {
    setValue(0);
    saveToDatabase(0);
  }

  async function saveToDatabase(val) {
    // localStorage
    localStorage.setItem("val", JSON.stringify(val));

    // communicate to restoplus-challenge1-server
    let url = "http://localhost:5000/";
    let load = { value: val };
    let response = await axios.post(url, load);

    if (response["data"]["message"] == "ERROR") {
      console.log("Something went wrong");
    }
  }

  useEffect(function () {
    function getCurrentValue() {
      let val = JSON.parse(localStorage.getItem("val"));

      if (val != null) setValue(val);
      else val = 0;

      saveToDatabase(val);
    }
    // call
    getCurrentValue();
  }, []);

  return (
    <div className="main-div">
      <h2 className="application-name">Counter</h2>
      <div>
        <span className="icon" onClick={handleClickDecrement}>
          <i className="bi bi-dash-circle m-0 fs-2"></i>
        </span>
        <span className="value">{value}</span>
        <span className="icon" onClick={handleClickIncrement}>
          <i className="bi bi-plus-circle m-0 fs-2"></i>
        </span>
      </div>
      <Spacer height="1rem" />
      <Button size={SIZE.mini} onClick={handleClickReset}>
        reset
      </Button>
    </div>
  );
}

export default Counter;
