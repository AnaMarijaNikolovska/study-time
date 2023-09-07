import React, { useEffect, useState } from 'react';
import { GetAllCategories } from '../../services/CategoryService';
import { Box, Button, Card, CardBody, Flex, Heading, Icon, SimpleGrid, Tooltip } from '@chakra-ui/react';
import { AddIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default function CategoriesPage(props) {
  const [categories, setCategories] = useState(null);
  const colors = ['#00ff00', '#ff33cc', '#cc33ff',
    '#ffff00', '#EC0B0B', '#ffa812', '#FFB700',
    '#d8bfd8', '#ffa07a', '#ee82ee', '#75ebff',
    '#ff1a1a', '#7FFFD4', '#00BFFF', '#53eb87',
    '#D2B48C', '#fc6868', '#00FF46', '#29FFDF',
    '#93acff', '#94c296', '#CB5EF0', '#F705B1',
    '#FFDD33', '#ff5c67', '#F7057E'];

  const getColor = () => {
    let len = colors.length;
    let randomNum = Math.floor(Math.random() * len);
    let color = colors[randomNum];
    colors.splice(randomNum, 1);
    return color;
  };

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  useEffect(() => {
    GetAllCategories()
      .then(r => setCategories(r.data));
  }, []);

  return (
    <Box>
      <Flex justifyContent='center'>

        <Flex margin={'60px'} border={'2px solid transparent'} padding={'10px'}
              _hover={{
                color: 'teal.500',
                border: '2px solid',
                padding: '10px',
                borderRadius: '20px',
              }}>
          <Link to={'/categories/addCategory'}>
            <Tooltip marginBottom={'10px'} label='Click here to add a new category' placement='top' hasArrow>
              <Heading>
                Add Category
              </Heading>
            </Tooltip>
            {/*<Button as={AddIcon} size={'sm'}></Button>*/}
          </Link>
        </Flex>
      </Flex>

      <Flex justifyContent={'space-evenly'} gridColumn={'5'}>
        <SimpleGrid columns={5} spacing={7}>
          {categories && categories.length > 0 && categories.map((category, index) =>
            <Link key={index} to={`/categories/${category.id}`}>
              <Card
                maxW={'200px'}
                maxH={'150px'}
                height={'150px'}
                style={{
                  backgroundColor: getColor(),
                  margin: '5px',
                }}>
                <CardBody className='text-left'>
                  <Heading className='title-font'>
                    {category.name}
                  </Heading>
                  {/*<p> {category.description}</p>*/}
                </CardBody>
              </Card>
            </Link>,
          )}
        </SimpleGrid>

      </Flex>

    </Box>
  );

}