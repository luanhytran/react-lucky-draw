import React from "react";
import styled from "styled-components";

// styled-components
const Container = styled.span`
  display: inline-flex;
  align-items: center;
  width: 150px;
  max-width: 150px;
  padding: 4px 12px;
  border: 1px solid #bfc9d9;
  border-radius: 4px;

  input[type="color"] {
    margin-right: 8px;
    -webkit-appearance: none;
    border: none;
    width: auto;
    height: auto;
    cursor: pointer;
    background: none;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
      width: 14px;
      height: 14px;
    }
    &::-webkit-color-swatch {
      border: 1px solid #bfc9d9;
      border-radius: 4px;
      padding: 0;
    }
  }

  input[type="text"] {
    border: none;
    width: 100%;
    font-size: 14px;
  }
`;

const ColorPicker = ({ value, value2, onChange, onChange2, ...rest }) => {
  return (
    <div>
      <div className="mt-3">
        <p>Choose wheel color:</p>
        <Container>
          <input type="color" value={value} onChange={onChange} {...rest} />
          <input type="text" value={value} onChange={onChange} {...rest} />
        </Container>
      </div>
      <div className="mt-3">
        <p>Choose font color:</p>
        <Container>
          <input type="color" value={value2} onChange={onChange2} {...rest} />
          <input type="text" value={value2} onChange={onChange2} {...rest} />
        </Container>
      </div>
    </div>
  );
};

ColorPicker.propTypes = {};

export default ColorPicker;
