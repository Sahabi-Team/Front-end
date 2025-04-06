import React from "react";
import { ExpandMoreRounded } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";

function AccordionItem({ question, answer }) {
  return (
    <Accordion sx={{border: "1px solid #D9D9D9", borderRadius: "8px !important", mb: 1, boxShadow: "none", "&:hover": {background: "#F7F7F7"}, "&:before": { display: "none" }}}>
      <AccordionSummary expandIcon={<ExpandMoreRounded sx={{color: "#00A359", fontSize: 32}}/>}>
        <Typography fontWeight={500} fontSize={20}>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{textAlign: "left"}}>
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionItem;