import React from "react";
//this is a good example of the mistake that the interface is build without
//consideration for reuse. by tying the name to genres, it will be confusing
//to reuse the component for other non genre related feature.
const ListGroup = ({
  genres,
  valueProperty,
  textProperty,
  selectedGenre,
  onGenreSelect
}) => {
  return (
    <ul className="list-group">
      {genres.map((genre, ind) => (
        <li
          key={genre[valueProperty]}
          onClick={() => onGenreSelect(genre)}
          className={
            (!selectedGenre && ind === 0) || selectedGenre === genre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};
//give props default value to make it easier to use
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ListGroup;
