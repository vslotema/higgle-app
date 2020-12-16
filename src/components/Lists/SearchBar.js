import SearchBtn from "../../icons/SearchBtn";

const Searchbar = () => {
  return (
    <form className="search-form">
      <input
        type="text"
        className="searchbar"
        placeholder="Find list.."
      ></input>
      <button type="submit" className="search-btn">
        <SearchBtn className="btn"/>
      </button>
    </form>
  );
};

export default Searchbar;
