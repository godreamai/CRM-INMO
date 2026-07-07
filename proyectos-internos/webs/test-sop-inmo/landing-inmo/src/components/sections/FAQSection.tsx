"use client";

import { useState } from "react";
import { FAQ } from "@/content/data";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="sec-compact bg-bg" id="faq">
      <div className="wrap">
        <div className="md:grid md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4 mb-8 md:mb-0">
            <span className="label">Preguntas</span>
            <h2 className="heading-md mt-3 mb-4">
              Lo que mas consultan antes de decidir
            </h2>
            <p className="body-md">
              Si tu pregunta no esta, escribinos. Respondemos directo, sin
              formulario ni bot.
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="divide-y divide-border-subtle border-t border-b border-border-subtle">
              {FAQ.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-start justify-between py-5 text-left gap-4 group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[0.9375rem] font-medium text-text group-hover:text-accent transition-colors duration-150">
                        {item.question}
                      </span>
                      <svg
                        className="shrink-0 mt-1 text-text-tertiary transition-transform duration-150"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="pb-5 pr-8">
                        <p className="text-[0.8125rem] text-text-secondary leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
