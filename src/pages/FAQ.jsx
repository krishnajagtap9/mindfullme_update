import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What is MindfulMe?",
    answer:
      "MindfulMe is a web platform that helps users manage and improve mental wellbeing through journaling, guided breathing, mood tracking, and community connection.",
  },
  {
    question: "Is MindfulMe free to use?",
    answer:
      "Yes, MindfulMe offers a free plan with essential features to support your mental health journey.",
  },
  {
    question: "Can I track my mood with MindfulMe?",
    answer:
      "Absolutely! MindfulMe includes an AI-powered mood tracker that helps you reflect on your emotions over time.",
  },
  {
    question: "Is my personal data safe?",
    answer:
      "Your data is yours — always. We ensure complete privacy and data ownership to keep your journey secure.",
  },
  {
    question: "What features are planned for the future?",
    answer:
      "We're working on integrating licensed therapists, real-time support groups, and expanding culturally sensitive tools.",
  },
];

const Faq = () => {
  return (
    <div className="w-70%  px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Accordion key={index} className=" rounded-2xl shadow-md"sx={{backgroundColor:"transparent" ,borderColor:"#CCCCFF",borderWidth:"1px" ,color:"#CCCCFF"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{color:"#ccccff"}} />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`} 
            >
              <Typography className="text-lg font-medium">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-gray-700" sx={{color:"#ccccff"}}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Faq;
