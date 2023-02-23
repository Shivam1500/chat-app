import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Box, Container, Text, Tab, Tabs, TabPanels, TabPanel, TabList, Flex } from '@chakra-ui/react'
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';

const Homepage = () => {
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));


        if (user) history.push("/chats");
    }, [history]);

    return (
        <Container maxW='md' centerContent>
            {/* <Flex> */}
            <Box d="flex"
                justifyContent="center"
                p={3}
                bg={"white"}
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px">
                <Text fontSize="4x1" fontFamily="Work sans" color="black">chatFlix</Text>
            </Box>
            <Box bg={"white"}
                w="100%"
                p={4}
                color="black"
                borderRadius="lg"
                borderWidth="1px">
                <Tabs variant='soft-rounded' >
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            {/* </Flex> */}
        </Container>
    )
}

export default Homepage