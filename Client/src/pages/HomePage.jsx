import React from 'react';
import useFetchAlbums from '../../APIs/useAlbums';
import useFetchSongs from '../../APIs/useSongs';
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

const HomePage = () => {
    const { albums, errorAlbum, loadingAlbum} = useFetchAlbums();
    const { songs, errorSong, loadingSong, setPage, setLimit } = useFetchSongs();

    if (loadingSong) {
        return <div>Loading...</div>
    }
    if (loadingAlbum) {
        return <div>Loading...</div>;
    }
    if (errorSong) {
        return <div> Error: {errorSong.message} </div>
    }
    if (errorAlbum) {
        return <div> Error: {errorAlbum.message} </div>;
    }

    const album = albums[0];
    //console.log(albums.length);
    //console.log(songs.length)

    return (
        <Flex flexDir="column"
            pr={"rem"}
            w={'full'}
            mt={{ base: '10rem', lg: 'rem' }}
            gap="4"
            bg={"white"}>
                <Box alignItems={'center'} bg={"red"} w={"90%"}>
                    <Box w={'250px'} h={'250px'}>
                        <Image size="small" src={album.cover} />
                    </Box>
                    <Text> 
                        {album.name}
                        <br />
                        {album.artist}
                        <br />
                        {album.genre}
                        <br />
                    </Text>
                </Box>
        </Flex>
    );
}

export default HomePage