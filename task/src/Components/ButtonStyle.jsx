import { Button, Box } from "@chakra-ui/react";
import React from "react";

import styles from "./ButtonStyle.module.css";
function ButtonStyle({ name }) {
  return (
    <Box className={styles.ancker}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {name}
    </Box>
  );
}

export default ButtonStyle;
