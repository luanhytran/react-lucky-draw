import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ColorPicker from "./ColorPicker";
import { Tabs, Tab } from "react-bootstrap";

export default function Customize() {
  // wheel color
  const [state, updateState] = useState(localStorage.getItem("wheelColor"));

  // font color
  const [state2, updateState2] = useState(localStorage.getItem("fontColor"));

  const marks = [
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 40,
      label: "40",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 60,
      label: "60",
    },
  ];

  function valuetext(value) {
    localStorage.setItem("duration", value);
    return `${value}`;
  }

  // handle wheel color input
  const handleInput = (e) => {
    updateState(e.target.value);
    localStorage.setItem("wheelColor", state);
  };

  // handle font color input
  const handleInput2 = (e) => {
    updateState2(e.target.value);
    localStorage.setItem("fontColor", state2);
  };

  return (
    <Tabs
      defaultActiveKey="during-spin"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="during-spin" title="During spin">
        <div className="mt-3">
          <p>Spin time (seconds) </p>
          <Box sx={{ width: "100%" }}>
            <Slider
              aria-label="Custom marks"
              defaultValue={localStorage.getItem("duration")}
              getAriaValueText={valuetext}
              min={1}
              step={1}
              max={60}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Box>
        </div>
      </Tab>
      <Tab eventKey="appearance" title="Appearance">
        <ColorPicker
          value={state}
          onChange={handleInput}
          value2={state2}
          onChange2={handleInput2}
        />
      </Tab>
    </Tabs>
  );
}
