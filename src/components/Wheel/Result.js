import React from "react";

export default class Result extends React.Component {
  clearList = () => {
    this.props.onChange();
  };

  render() {
    return (
      <div>
        <button
          id="clearListButton"
          style={{ marginTop: "10px" }}
          className="btn btn-outline-secondary disableElement"
          onClick={this.clearList}
        >
          Clear the list
        </button>
        <ul>
          {this.props.winners.map((winner, index) => (
            <li key={index} style={{ marginTop: "10px" }}>
              {winner}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
