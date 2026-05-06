import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Blood Cholesterol Balance",
    answer: `How does this nutraceutical help maintain healthy cholesterol levels naturally?
It supports lipid metabolism using herbs like berberine, garlic, and green tea to help balance cholesterol naturally.

Can I take this product if I already have high cholesterol medication?
It is best to consult your healthcare provider before combining it with prescription cholesterol medicines.

How long does it usually take to notice improvements in cholesterol balance?
Visible improvements may typically be seen with consistent use over 6–12 weeks.

Does this formulation also help support heart and vascular health?
Yes, it supports overall cardiovascular health through antioxidant and lipid-balancing action.

What makes this combination of herbs effective for lipid metabolism?
The synergistic blend targets multiple pathways like fat absorption, synthesis, and clearance.`,
  },
  {
    question: "Blood Sugar",
    answer: `How does this product help support healthy blood glucose levels?
It supports glucose metabolism and insulin function using berberine, cinnamon, and fenugreek.

Can it help reduce post-meal sugar spikes?
Yes, it helps slow carbohydrate absorption to reduce post-meal glucose spikes.

Is it safe to take this along with diabetic medication?
Consult your doctor before combining it with anti-diabetic medications.

How do ingredients like berberine and cinnamon work together in this formula?
They work synergistically to improve insulin sensitivity and glucose utilization.

Can this be used for long-term blood sugar management?
Yes, it is designed for regular use to support long-term metabolic balance.`,
  },
  {
    question: "Brain Tonic",
    answer: `How does this nutraceutical support memory and cognitive function?
It enhances brain function using Bacopa, Ginkgo, and Ashwagandha for memory and focus support.

Can it help with stress-related mental fatigue and lack of focus?
Yes, it helps reduce mental fatigue and supports stress resilience.

Is it suitable for students or professionals with high mental workload?
Yes, it is suitable for individuals needing sustained mental performance.

How do herbs like Bacopa and Ginkgo support brain health?
They support neurotransmission and improve cerebral blood flow for better cognition.

How long does it take to notice improvements in focus and clarity?
Consistent use for 4–8 weeks may support noticeable cognitive benefits.`,
  },
  {
    question: "General Health",
    answer: `What daily health benefits can I expect from this nutraceutical?
It supports energy, immunity, metabolism, and overall daily wellness.

Can it help improve energy levels and reduce fatigue naturally?
Yes, it helps reduce fatigue and supports natural energy production.

Is this suitable for long-term daily wellness support?
Yes, it is designed for safe long-term daily health maintenance.

How does this product support immunity and stress balance?
It uses adaptogens like Ashwagandha to support stress response and immunity.

Can it be combined with other supplements or vitamins?
Yes, it can generally be combined, but medical advice is recommended.`,
  },
  {
    question: "Vitality Power Plus",
    answer: `How does this product help improve stamina and physical performance?
It enhances energy and endurance using Shilajit, Ginseng, and Ashwagandha.

Is it suitable for people experiencing low energy or fatigue?
Yes, it is formulated to help combat fatigue and boost vitality.

How do ingredients like Shilajit and Ginseng enhance vitality?
They support mitochondrial energy production and physical endurance.

Can this help with both physical and mental endurance?
Yes, it supports both physical stamina and mental resilience.

When is the best time to take this for maximum energy benefits?
It is generally best taken in the morning for optimal energy support.`,
  },
];

export default function FAQ({ productName }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let displayItems = [];
  let headerTitle = "Frequently Asked Questions";

  if (productName) {
    const matchedCategory = faqs.find((f) => f.question === productName);
    if (matchedCategory) {
      headerTitle = `${matchedCategory.question} FAQs`;
      displayItems = matchedCategory.answer.split("\n\n").map((block) => {
        const lines = block.split("\n");
        return {
          question: lines[0],
          answer: lines.slice(1).join("\n"),
        };
      });
    }
  }

  // Fallback to plotting out all default FAQ headers if no product match is found
  if (displayItems.length === 0) {
    displayItems = faqs;
  }

  return (
    <div className="w-full bg-white py-12 sm:py-16 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        {/* Header Side */}
        <div className="w-full md:w-1/3 md:sticky md:top-32">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#111827] mb-4 block">
            Assistance
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#111827] leading-[1.15] tracking-tight mb-6">
            {headerTitle.split("FAQs")[0]} <br />{" "}
            <span className="text-gray-400 font-display italic">FAQs.</span>
          </h2>
          <p className="text-[16px] text-gray-500 font-medium leading-relaxed mb-8">
            Clear, concise answers to the most common questions regarding
            clinical dosing, benefits, and long-term regimen expectations.
          </p>
          <div className="w-16 h-1 bg-gray-400 rounded-full" />
        </div>

        {/* Accordion Side */}
        <div className="w-full md:w-2/3">
          <div className="flex flex-col gap-4">
            {displayItems.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border-b transition-colors duration-300 ${isOpen ? "border-[#111827]" : "border-gray-200"}`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-6 sm:py-8 text-left flex justify-between items-start gap-4 focus:outline-none group"
                  >
                    <span
                      className={`block text-base sm:text-[22px] leading-snug font-semibold tracking-tight pr-2 sm:pr-8 break-words transition-colors ${isOpen ? "text-[#111827]" : "text-[#111827] group-hover:text-gray-400"}`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`w-10 h-10 rounded-full border flex flex-col items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "border-[#111827] bg-[#111827] text-white -rotate-180" : "border-gray-200 text-gray-400 group-hover:border-gray-400 group-hover:text-gray-400"}`}
                    >
                      <FaChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      isOpen
                        ? "max-h-[500px] mb-8 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-500 text-[15px] sm:text-[16px] xl:text-[18px] leading-relaxed font-medium whitespace-pre-line pl-3 border-l-2 border-[#111827]/20">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
