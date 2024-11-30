import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../assets/styles/FlavorText.css';
import { Center, Flex, Text, Box, useMediaQuery } from '@chakra-ui/react';

const FlavorText = ({ flavorTextArray }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isMobile] = useMediaQuery('(max-width: 900px)'); // Media query for mobile mode
  console.log('NEW:', flavorTextArray);

  const linesPerPage = 1;

  // Filter for English flavor text and remove duplicates
  const filteredTextArray = Array.from(
    new Set(
      flavorTextArray
        .filter(item => item.language?.name === 'en') // Check if item.language exists
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
  console.log('CURRENT TEXT:', currentText);

  return (
    <Center flexDirection="column" mt="20px" maxW="90%" outline={'2px solid'}>
      <Text
        margin={{ base: '30px', md: '40px' }}
        fontFamily="Alleyn W01 Regular"
        textAlign="center"
        height={{ base: '100px', md: '100px' }}
        overflow="hidden"
        textOverflow="ellipsis"
        fontSize={{ base: '17px', md: '20px' }}
        lineHeight={{ base: '20px', md: '24px' }}
      >
        {currentText.map((flavorText, index) => (
          <span className="flavorText" key={index}>
            {flavorText.flavor_text || 'No text available'}
          </span>
        ))}
      </Text>

      <Center mt={{ base: '10px', md: '20px' }} width="100%">
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
          breakLabel={isMobile ? null : '...'}
          breakClassName="breakBttn"
          pageClassName={isMobile ? 'hiddenPage' : 'paginationPage'}
          pageLinkClassName={isMobile ? 'hiddenLink' : 'pageLink'}
        />
      </Center>
    </Center>
  );
};

export default FlavorText;
