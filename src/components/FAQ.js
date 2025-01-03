import React, { useState } from "react";
import Navbar from "./Navbar"; // Import your existing Navbar component
import "./faq.css"; // Create a CSS file for styles or use inline styling

const Faq = () => {
  // FAQ data as an array of objects
  const faqData = [
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. Items must be unworn and in original packaging.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship internationally. Shipping costs will be calculated at checkout based on your location.",
    },
    {
      question: "How can I track my order?",
      answer:
        "After your order is shipped, you will receive an email with tracking information to monitor your delivery.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, PayPal, and Apple Pay.",
    },
    {
      question: "Can I change my order after placing it?",
      answer:
        "Once an order is placed, we cannot guarantee changes. Please contact customer service as soon as possible.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  // Function to toggle the FAQ answer visibility
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className ="faq">
      <Navbar />
      <div className="containerq">
        <h2>Frequently Asked Questions</h2>
        {faqData.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3 onClick={() => toggleAnswer(index)}>
              {faq.question}
            </h3>
            <p className={activeIndex === index ? "show" : ""}>
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
      <footer>
        <p>
          Follow us on <a href="#">Instagram</a>, <a href="#">Facebook</a>,{" "}
          <a href="#">Pinterest</a>
        </p>
      </footer>
    </div>
  );
};

export default Faq;
