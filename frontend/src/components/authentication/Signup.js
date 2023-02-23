import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FormControl, FormLabel, Input, VStack, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react';

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    // const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handelClick = () => setShow(!show);

    const postDetails = (pics) => { };

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "please fill all the field",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post("/api/user", { name, email, password }, config);
            toast({
                title: "Registration Successful",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };


    return (
        <VStack spacing='5px'>
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>E-mail</FormLabel>
                <Input
                    placeholder='Enter Your E-mail'
                    onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="passowrd" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Enter Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handelClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="passowrd" isRequired>
                <FormLabel>Confirm-Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Confirm-Password'
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handelClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic" isRequired>
                <FormLabel>Upload Your Picture</FormLabel>
                <Input
                    type="file"
                    p={1}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])} />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                color="white"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >Sign Up </Button>
        </VStack>
    )
}

export default Signup