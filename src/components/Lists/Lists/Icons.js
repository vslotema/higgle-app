import { AiFillCloseCircle, AiOutlineScissor } from "react-icons/ai";
import {
  FaEnvira,
  FaItunesNote,
  FaBell,
  FaBirthdayCake,
  FaCocktail,
  FaEuroSign,
  FaHeart,
  FaLaptopCode,
  FaPen,
  FaShoppingCart,
  FaUmbrellaBeach,
  FaCamera,
  FaPodcast,
  FaPepperHot,
  FaSpa,
  FaDumbbell,
  FaHeartbeat,
  FaSuitcase,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IconContext } from "react-icons";
import { BsTools } from "react-icons/bs";
import { GoMarkGithub, GoOrganization, GoStar, GoGraph } from "react-icons/go";

import { BiDumbbell } from "react-icons/bi";

export const icons = {
  envira: <FaEnvira />,
  note: <FaItunesNote />,
  bell: <FaBell />,
  birthdayCake: <FaBirthdayCake />,
  cocktail: <FaCocktail />,
  euro: <FaEuroSign />,
  heart: <FaHeart />,
  laptopCode: <FaLaptopCode />,
  pen: <FaPen />,
  health: <FaHeartbeat />,
  shopping: <FaShoppingCart />,
  beach: <FaUmbrellaBeach />,
  work: <FaSuitcase />,
  tools: <BsTools />,
  camera: <FaCamera />,
  podcast: <FaPodcast />,
  pepper: <FaPepperHot />,
  spa: <FaSpa />,
  scissors: <AiOutlineScissor />,
  github: <GoMarkGithub />,
  organization: <GoOrganization />,
  fitness: <FaDumbbell />,
  start: <GoStar />,
  graph: <GoGraph />,
};

const handleCloseIcons = () => {
  document.getElementById("icons").style.display = "none";
};

const showIcons = (props) => {
  return (
    <>
      {Object.keys(icons).map((icon) => {
        return (
          <div
            key={Math.floor(Math.random() * 100000)}
            className="icon-item"
            onClick={() => props.onSendIcon(icon)}
          >
            <IconContext.Provider value={{ className: "icon" }}>
              {icons[icon]}
            </IconContext.Provider>
          </div>
        );
      })}
    </>
  );
};
const Icons = (props) => {
  return (
    <>
      <div className="icons-form-container" id="icons">
        {showIcons(props)}
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
