import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

PlayerFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};

PlayerFiltersForm.defaultProps = {
  onSubmit: null,
};

function PlayerFiltersForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");

  // kĩ thuật debounce:
  // useRef là hook giúp mình tạo ra một object và object này sẽ không thay đổi giữa những lần render
  const typingTimeOutRef = useRef(null);

  function handleSearchTermChange(e) {
    // Bởi vì e sẽ bị release nên phải lưu giá trị của e vào biến value để dùng lại
    const value = e.target.value;
    setSearchTerm(e.target.value);

    // nếu onSubmit không có giá trị thì return
    if (!onSubmit) return;

    // Nếu vẫn còn type thì sẽ clear time out và chờ tiếp 300 milliseconds
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }

    // chờ 300 milliseconds nếu người dùng không gõ gì tiếp rồi mới submit tìm từ khóa
    typingTimeOutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };

      onSubmit(formValues);
    }, 300);
  }

  return (
    <form>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        style={{ width: "300px" }}
        placeholder="Search for..."
      ></input>
    </form>
  );
}

export default PlayerFiltersForm;
