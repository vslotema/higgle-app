import { AiFillCloseCircle } from "react-icons/ai";
import { FaApper, FaTumblr, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons";

const icons = [<FaTumblr />, <FaTwitter />, <FaApper />];

const handleCloseIcons = () => {
  document.getElementById("icons").style.display = "none";
};

const showIcons = (props) => {
  return (
    <div className="icons-container">
      {icons.map((i) => {
        return (
          <div
            key={Math.floor(Math.random() * 100000)}
            className="icon-item"
            onClick={() => props.onSendIcon(i)}
          >
            <IconContext.Provider value={{ className: "icon" }}>
              {i}
            </IconContext.Provider>
          </div>
        );
      })}
    </div>
  );
};
const Icons = (props) => {
  return (
    <>
      <div className="icons-form-container" id="icons">
        {showIcons(props)};
        <button
          id="icon-btn-close"
          type="button"
          onClick={() => handleCloseIcons()}
        >
          <IconContext.Provider value={{ className: "close-btn-icons" }}>
            <AiFillCloseCircle />
          </IconContext.Provider>
        </button>
      </div>
    </>
  );
};

export default Icons;
