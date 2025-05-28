import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Dummy data for FAQs
const faqs = [
  {
    question: "What is your return policy?",
    answer: "You can return items within 30 days of purchase for a full refund, provided they are in their original condition."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you will receive an email with a tracking number and a link to track your package."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary by destination."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our customer support team via email at support@example.com or by calling us at 1-800-123-4567."
  }
];

export default function App() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 font-sans"> {/* Added font-sans for Inter font */}
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-800">Frequently Asked Questions</h2> {/* Changed heading color */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            className="rounded-2xl shadow-md bg-transparent border-2 border-purple-500" // Added bg-transparent and purple border
            sx={{
              '&.Mui-expanded': {
                margin: '0', // Ensure no extra margin when expanded
              },
              '&:before': {
                display: 'none', // Remove default Mui Accordion border
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-purple-700" />} // Changed expand icon color
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography className="text-lg font-medium text-purple-700"> {/* Changed question text color */}
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-purple-800"> {/* Changed answer text color */}
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
