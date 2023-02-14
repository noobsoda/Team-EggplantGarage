import React from "react";
import styled from "styled-components";
import Tapbar from "./Tapbar";
import { motion } from "framer-motion";

const StyledPage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default function Page(props) {
  return (
    <StyledPage
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
      <Tapbar />
    </StyledPage>
  );
}
