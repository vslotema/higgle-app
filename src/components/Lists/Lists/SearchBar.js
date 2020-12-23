import SearchBtn from "../../../icons/SearchBtn";

const Searchbar = (props) => {
  return (
    <form className="search-form">
      <input
        id="searchbar_form"
        type="text"
        className="searchbar"
        placeholder="Find list.."
        onChange={(e) => props.onChange(e)}
      ></input>
      <button
        type="submit"
        className="search-btn"
        onClick={(e) => props.onSubmit(e)}
      >
        <SearchBtn className="btn" />
      </button>
    </form>
  );
};

export default Searchbar;
