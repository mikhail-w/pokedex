import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../assets/styles/FlavorText.css';
import { Center, Flex, Text } from '@chakra-ui/react';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
// import '../App.css';

const FlavorText = ({ textArray }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const linesPerPage = 1;
  const pageCount = Math.ceil(textArray.length / linesPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const currentText = textArray.slice(
    pageNumber * linesPerPage,
    (pageNumber + 1) * linesPerPage
  );

  return (
    <Center flexDirection="column" margin="20px">
      <Text
        className="text"
        mt="40px"
        fontFamily="Alleyn W01 Regular"
        textAlign="center"
      >
        {currentText.map((flavorText, index) => (
          <div className="flavorText" key={index}>
            {flavorText}
          </div>
        ))}
      </Text>
      <Flex mt="10px">
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="paginationBttns"
          previousLinkClassName="previousBttn"
          nextLinkClassName="nextBttn"
          disabledClassName="paginationDisabled"
          activeClassName="paginationActive"
        />
      </Flex>
    </Center>
  );
};

export default FlavorText;
