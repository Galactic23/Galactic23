import React, { useEffect, useState } from 'react';
import {
  Box,
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
  GridItem
} from '@chakra-ui/react';

const NavBar = () => {
    return (
        <>
            <Flex flexDir="column"
                px={{ base: '1rem', lg: '1rem' }}
                w={'full'}
                mt={{ base: '0rem', lg: '1rem' }}
                gap="4">
                <Box bg="black" display={{ base: 'none', lg: 'block' }}>
                    <Text>Hello</Text>
                </Box>
            
            

            </Flex>
        </>
    )
};

export default NavBar