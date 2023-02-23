import { Box, useDisclosure, Input, Button, Tooltip, Text, MenuButton, Menu, MenuList, Avatar, MenuItem, MenuDivider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Flex, useToast, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const { user, setSelectedChat, chats, setChats } = ChatState();
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.pushState("/")
    }
    const toast = useToast();
    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                positon: "top-left",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                Headers: {
                    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjY0YmE2MjEwMjkzNjA3NDI4ZWJkOSIsImlhdCI6MTY3NzA4NjQ0MSwiZXhwIjoxNjc5Njc4NDQxfQ.TydYMrqgYTEgpmuuCrA0m10jsabJXmjA3AU-LejNH9E",
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config)
            console.log("kykyu", data)
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Failed to load the Search Results",
                status: "warning",
                duration: 5000,
                isClosable: true,
                positon: "bottom-left",
            });
        }

    };

    const accessChat = async (userId) => {
        console.log(userId);

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    return <>
        {/* <Flex justify="space-between"> */}
        <Box
            alignItems="center"
            bg='white'
            w="100"
            p="5px 10px 5px 10px"
            borderWidth='2px'>

            <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                <Button varient="ghost" onClick={onOpen}>
                    <i class="fas fa-search" ></i>
                    <Text d={{ base: "none", }} px="4">
                        Search User
                    </Text>
                </Button>
            </Tooltip>
            <Text fontSize="2x1" fontFamily="Work sans">
                Chatflex
            </Text>
            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize="2x1" m={1} />
                    </MenuButton>
                    {/* <MenuList></MenuList> */}
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                        <Avatar size='sm' cursor='pointer' name={user.name} />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            {/* <MenuItem>My Profile</MenuItem> */}
                        </ProfileModal>
                        <MenuDivider />
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>
        {/* </Flex> */}
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>

                <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                <DrawerBody>
                    {/* <Flex> */}
                    <Box paddingRight={2}>
                        <Input placeholder="search by name or emil"
                            Mr={2}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />

                    </Box>
                    <Button
                        onClick={handleSearch}
                    >Go</Button>
                    {/* </Flex> */}
                    {loading ? (
                        <ChatLoading />) :
                        (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )
                    }
                    {loadingChat && <Spinner ml="auto" display="flex" />}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>;
};

export default SideDrawer;