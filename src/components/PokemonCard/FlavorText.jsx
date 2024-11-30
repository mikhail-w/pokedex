import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../assets/styles/FlavorText.css';
import { Center, Flex, Text, Box, useMediaQuery } from '@chakra-ui/react';

const FlavorText = ({ flavorTextArray }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isMobile] = useMediaQuery('(max-width: 900px)'); // Media query for mobile mode

  const linesPerPage = 1;

  const pageCount = Math.ceil(flavorTextArray.length / linesPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const currentText = flavorTextArray.slice(
    pageNumber * linesPerPage,
    (pageNumber + 1) * linesPerPage
  );

  console.log('Test 1:', currentText);

  return (
    <Center flexDirection="column" mt="20px" maxW="90%">
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
        <span className="flavorText">{currentText}</span>
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
