// Imports
// Selected route view
"use client";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function SelectedView() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <Button onPress={onOpen} className="max-w-fit">Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        className="bg-gray-200 rounded-lg flex items-center w-full"
        // style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
      >
        <ModalContent className="p-4 flex justify-center items-center w-full">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg font-semibold text-black justify-center items-center">Modal Title</ModalHeader>
              <ModalBody className="text-sm text-gray-500 flex justify-center items-center">
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center gap-2">
                <Button color="danger" variant="light" onPress={onClose} className="bg-red-500 text-white">
                  Close
                </Button>
                <Button color="primary" onPress={onClose} className="bg-blue-500 text-white">
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
