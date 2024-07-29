import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../assets/styles/FlavorText.css';
import { Center, Flex, Text } from '@chakra-ui/react';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'; // icons form react-icons
import { IconContext } from 'react-icons'; // for customizing icons
import '../App.css';

function FlavorText({ textArray }) {
  // console.log('INSIDE FLAVOR TEXT COMPONENT', textArray);
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
            <p key={flavorText}>{flavorText}</p>
          </div>
        </>
      );
    });

  const pageCount = Math.ceil(textArray.length / linesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Center flexDirection={'column'} margin={'20px'}>
      <Text
        className="text"
        marginTop={'40px'}
        fontFamily={'Alleyn W01 Regular'}
      >
        {displayText}
      </Text>
      <Flex margin={'0px'}>
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          pageCount={pageCount}
          onPageChange={changePage}
          pageRangeDisplayed={0}
          marginPagesDisplayed={0}
          containerClassName={'paginationBttns'}
          previousLinkClassName={'previousBttn'}
          nextLinkClassName={'nextBttn'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
          
        />
      </Flex>
    </Center>
  );
}

export default FlavorText;
