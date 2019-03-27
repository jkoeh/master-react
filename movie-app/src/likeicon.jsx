import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const LikeIcon = ({ liked, onLike }) => {
  var icon = liked ? faHeart : farHeart;
  return <FontAwesomeIcon onClick={onLike} icon={icon} />;
};

export default LikeIcon;
