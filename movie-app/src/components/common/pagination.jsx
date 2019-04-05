import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  handlePagination
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount <= 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => handlePagination(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemCount: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  handlePagination: PropTypes.func
};
export default Pagination;
