import { IconContext } from "react-icons";
import React from "react";
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";
import { FaIcons } from "react-icons/fa";
import Icons from "./Icons";

const handleAdd = (e) => {
  e.preventDefault();
  openform();
};

const openform = () => {
  document.getElementById("new-list-name").value = null;
  const formAdd = document.getElementById("form-add");
  formAdd.style.display = "flex";
  formAdd.style.animation = "fade-in 0.3s ease";
  document.getElementsByClassName("add-list-btn")[0].style.opacity = "0.4";
  document.getElementsByClassName("search-form")[0].style.opacity = "0.4";
};

export function handleCloseForm() {
  const close = document.getElementById("form-add");
  close.style.animation = "fade-out 0.3s ease";
  close.addEventListener("animationend", () => {
    if (close.style.animationName === "fade-out") close.style.display = "none";
  });
  //document.getElementById("form-add").style.display = "none";
  document.getElementsByClassName("add-list-btn")[0].style.opacity = "1.0";
  document.getElementsByClassName("search-form")[0].style.opacity = "1.0";
}

const handleIconForm = () => {
  const icons = document.getElementById("icons");
  icons.style.display = "flex";
};

const NewListForm = (props) => {
  return (
    <>
      <button
        type="submit"
        onClick={(e) => handleAdd(e)}
        className="add-list-btn"
      >
        Add New List
        <IconContext.Provider value={{ className: "plus-icon" }}>
          <div>
            <AiOutlinePlus />
          </div>
        </IconContext.Provider>
      </button>
      <form className="add-list-container" id="form-add">
        <button id="close-btn" type="button" onClick={() => handleCloseForm()}>
          <IconContext.Provider value={{ className: "close-btn-icon" }}>
            <AiFillCloseCircle />
          </IconContext.Provider>
        </button>

        <input
          id="new-list-name"
          type="text"
          placeholder="Name your list.."
          onChange={(e) => props.receiveName(e)}
          required
        />

        <button
          className="add-btn"
          type="button"
          onClick={() => handleIconForm()}
        >
          Choose Icon
          <IconContext.Provider value={{ className: "popup-plus-icon" }}>
            <div>{props.icon ? props.icon : <FaIcons />}</div>
          </IconContext.Provider>
        </button>
        <Icons
          key={Date.now() + Math.floor(Math.random() * 100)}
          onSendIcon={props.onSendIcon}
        />

        <button
          className="add-btn"
          type="submit"
          onClick={(e) => props.receiveSubmit(e)}
        >
          Add
          <IconContext.Provider value={{ className: "popup-plus-icon" }}>
            <div>
              <AiOutlinePlus />
            </div>
          </IconContext.Provider>
        </button>
      </form>
    </>
  );
};

export default NewListForm;
