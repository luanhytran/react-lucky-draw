import SearchBar from "./SearchBar/SearchBar";
import { useState } from "react";

function UserList(props) {
  // Declare a new state variable, which we'll call "count"
  const [value, setValue] = useState(props.items);

  function handleChange(e) {
    const newValue = e.target.value.split("\n");
    setValue(newValue);
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <SearchBar placeholder="Search..." data={value} />
      <textarea
        id="inputTextArea"
        style={{
          width: "100%",
          resize: "none",
          row: "10",
          marginTop: "10px",
          padding: "10px",
        }}
        value={value.join("\n")}
        onChange={handleChange}
        rows={15}
        cols={15}
      />
      <button
        id="updateButton"
        style={{ width: "100%", marginTop: "10px" }}
        className="btn btn-outline-secondary disableElement"
        onClick={() => props.onClick(value.filter((e) => e))}
      >
        Update
      </button>
    </div>
  );
}

export default UserList;
