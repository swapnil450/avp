import { EyeIcon } from "../Icons/icons";
import Image from "next/image";
import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { CheckIcon } from "./ProcessOrder";
import OrderInvoice from "../Invoice/OrderInvoice";
export default function ViewOrder({ order }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <span className="text-lg text-danger cursor-pointer active:opacity-50"></span>
      <EyeIcon onClick={onOpen} />
      <Modal
        scrollBehavior={`outside`}
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Order #{order?.orderid}
              </ModalHeader>
              <ModalBody>
                <OrderInvoice order={order} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
