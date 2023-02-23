import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, Button, useDisclosure, Image, Text } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({ user, children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>

            {children ? (<span onClick={onOpen}>{children}</span>) : (<IconButton
                d={{ base: "flex" }}
                icon={<ViewIcon />}
                onClick={onOpen}
            />
            )}
            <Modal size="xs" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="510px">
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="work sans"
                        display="flex"
                        justifyContent="center"
                    >{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Image borderRadius="full" boxsize="150px" src={user.pic} alt={user.name} />
                        <Text
                            fontSize={{ base: "20px", md: "30px" }}
                            fontFamily="work sans">
                            Email:{user.email}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
};

export default ProfileModal;