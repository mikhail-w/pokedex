import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../assets/styles/FlavorText.css';

function FlavorText({ textArray }) {
  console.log('INSIDE FLAVOR TEXT COMPONENT', textArray);
  // const [users, setUsers] = useState([...Array(10).keys()].map(i => i + 1));
  const [pageNumber, setPageNumber] = useState(0);

  const linesPerPage = 1;
  const pagesVisited = pageNumber * linesPerPage;

  const displayText = textArray
    .slice(pagesVisited, pagesVisited + linesPerPage)
    .map(flavorText => {
      return (
        <>
          <div className="flavorText">
            <h3 key="{idx}">{flavorText}</h3>
          </div>
        </>
      );
    });

  const pageCount = Math.ceil(textArray.length / linesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">
      {displayText}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </div>
  );
}

export default FlavorText;
