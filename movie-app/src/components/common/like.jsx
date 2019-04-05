import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const Like = ({ liked, onLike }) => {
  var icon = liked ? faHeart : farHeart;
  return (
    <FontAwesomeIcon
      onClick={onLike}
      style={{ cursor: "pointer" }}
      icon={icon}
    />
  );
};

export default Like;
