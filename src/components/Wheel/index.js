import React from "react";
import "./index.css";
import PropTypes from "prop-types";

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    if (this.props.items.length === 0 || this.props.spinning === true) {
      console.log("Can't spin a empty wheel or spinning wheel");
      return;
    }
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      this.props.onChange(selectedItem);
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };
    const spinning = selectedItem !== null ? "spinning" : "";
    let spinDuration = localStorage.getItem("duration");

    let cssProperties = {};

    cssProperties["--spinning-duration"] = `${spinDuration}s`;
    cssProperties["--wheel-color"] = `${this.props.wheelColor}`;
    cssProperties["--neutral-color"] = `${this.props.fontColor}`;

    if (cssProperties["--wheel-color"] === "null")
      cssProperties["--wheel-color"] = "#d38c12";

    if (cssProperties["--neutral-color"] === "null")
      cssProperties["--neutral-color"] = "#FFFFFF";

    return (
      <div style={cssProperties}>
        <h1 className="text-center">Click to spin</h1>
        <div className="wheel-container">
          <div
            lg={true}
            className={`wheel ${spinning}`}
            style={wheelVars}
            onClick={this.selectItem}
          >
            {items.map((item, index) => (
              <div
                className="wheel-item"
                key={index}
                style={{ "--item-nb": index }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// Define prop types
Wheel.propTypes = { items: PropTypes.array.isRequired };

// Define default prop values
Wheel.defaultProps = {
  items: [
    "Ali",
    "Beatriz",
    "Charles",
    "Diya",
    "Eric",
    "Fatima",
    "Gabriel",
    "Hanna",
  ],
};
