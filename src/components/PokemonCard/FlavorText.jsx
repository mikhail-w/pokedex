import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../assets/styles/FlavorText.css';
import { Center, Flex, Text } from '@chakra-ui/react';

const FlavorText = ({ flavorTextArray }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const linesPerPage = 1;

  // Filter for English flavor text and remove duplicates
  const filteredTextArray = Array.from(
    new Set(
      flavorTextArray
        .filter(item => item.language.name === 'en')
        .map(item => item.flavor_text)
    )
  ).map(uniqueFlavorText => {
    return flavorTextArray.find(item => item.flavor_text === uniqueFlavorText);
  });

  const pageCount = Math.ceil(filteredTextArray.length / linesPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const currentText = filteredTextArray.slice(
    pageNumber * linesPerPage,
    (pageNumber + 1) * linesPerPage
  );

  return (
    <Center flexDirection="column" margin="20px" maxW={'560'}>
      <Text
        className="text"
        mt="40px"
        fontFamily="Alleyn W01 Regular"
        textAlign="center"
        height="100px"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {currentText.map((flavorText, index) => (
          <span className="flavorText" key={index}>
            {flavorText.flavor_text || 'No text available'}
          </span>
        ))}
      </Text>
      <Flex mt="20px">
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
