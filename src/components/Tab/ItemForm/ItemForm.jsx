import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ItemForm.css";

function ItemForm(props) {
  // Declare a new state variable, which we'll call "count"
  const [value, setValue] = useState(props.items);

  function handleChange(e) {
    const newValue = e.target.value.split("\n");
    setValue(newValue);
  }

  // use Fisher–Yates Shuffle algorithm: https://bost.ocks.org/mike/shuffle/
  function Shuffle() {
    var array = JSON.parse(localStorage.getItem("itemsList"));
    let currentIndex = JSON.parse(localStorage.getItem("itemsList")).length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setValue(array);
  }

  function RemoveDuplicate() {
    let uniqueItems = [...new Set(value.map((s) => s.trim()))];
    setValue(Array.from(uniqueItems));
  }

  return (
    <div className="mt-10">
      <div
        className="
      d-flex 
      flex-column 
      flex-sm-column 
      flex-md-column 
      flex-lg-row 
      justify-content-lg-start 
     "
      >
        <button
          id="shuffleButton"
          className="
          btn btn-primary
          flex-lg-grow-1 
          me-lg-2
          mb-md-2 
          mb-sm-2 
          mb-lg-0
          mb-2
          "
          variant="light"
          onClick={Shuffle}
        >
          <i className="bi bi-shuffle me-3"></i>Shuffle
        </button>
        <button
          id="removeButton"
          className="btn btn-primary flex-lg-grow-1"
          variant="light"
          onClick={RemoveDuplicate}
        >
          <i class="bi bi-trash me-3"></i>
          Remove duplicate
        </button>
      </div>
      <SearchBar placeholder="Search..." data={value} />
      <textarea
        id="inputTextArea"
        className="form-control w-100 mt-2 p-10"
        value={value?.join("\n")}
        onChange={handleChange}
        rows={17}
        cols={15}
      ></textarea>
      <button
        id="updateButton"
        className="btn btn-primary disableElement w-100 mt-2"
        onClick={() => {
          props.onClick(value.filter((e) => e));
        }}
      >
        Update
      </button>
    </div>
  );
}

export default ItemForm;
