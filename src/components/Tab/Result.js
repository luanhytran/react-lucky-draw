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
          className="btn btn-primary disableElement"
          onClick={this.clearList}
        >
          Clear the list
        </button>
        <ul>
          {this.props.winners.map((winner, index) => (
            <li key={index} className="mt-1">
              {winner}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
