import React, { useEffect, useState } from 'react';
import {
  Box,
  Link,
  useDisclosure,
  Flex,
  Text,
  Image,
  Badge,
  Button,
  Grid,
  useColorModeValue,
  Input,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  SkeletonCircle,
  IconButton,
  AvatarBadge,
  SkeletonText,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  MenuGroup,
  Card,
  CardBody,
  Skeleton,
  GridItem,
  VStack
} from '@chakra-ui/react';

const NavBar = () => {
    return (
        <>
            <Flex flexDir={{ base: 'row', lg: 'column' }}
                display={{ base: "none", lg: 'flex'}}
                w={{ base: 'full', lg: '14rem' }}
                h={{ base: '5rem', lg: '100vh' }}
                bg={"white"}>
                <Box bg="blue" display={'flex'} p="1rem" h={{ base: 'full', lg: 'auto' }}>
                    <Link to="/" _hover={{ textDecoration: 'none' }}>
                        <Box
                            display="flex"
                            h={{ base: 'full', lg: '4.5rem' }}
                            w={{ base: 'full', lg: '11.5rem'}}
                            rounded="18"
                            bg="white"
                            alignItems='center'
                            justifyContent={{ base: 'center', lg: 'center' }}>
                            <Image
                                boxSize={{ base: '50px', lg: '70px' }}
                                src="src/assets/finger-heart.png"
                                justifyContent={'left'}
                                mr="-10px"
                            />
                            <Text fontWeight={"extrabold"} fontSize={"30px"} fontFamily="Aktifo B" textColor={'purple.400'}>Myuzige</Text>
                        </Box>
                    </Link>
                </Box>
                <VStack>
                    <Text textColor={"purple"}> Hello </Text>
                </VStack>
            

            </Flex>
        </>
    )
};

export default NavBar