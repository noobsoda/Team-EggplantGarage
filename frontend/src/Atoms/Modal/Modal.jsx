import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledModal = styled(motion.div)`
  width: 100%;
  height: calc(70vh - 48px);
  padding: 24px 0;
  position: absolute;
  left: 0px;
  top: 30vh;
  border-radius: 32px 32px 0px 0px;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.darkgrey};
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  min-width: 360px;
  max-width: 435px;
`;

export default function Modal(props) {
  return (
    <StyledModal
      className={props.className}
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: -50,
        opacity: 0,
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
    >
      {props.children}
    </StyledModal>
  );
}
