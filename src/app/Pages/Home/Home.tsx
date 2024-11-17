"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/Component/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { answers } from "./data";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [visibleStories, setVisibleStories] = useState({ 0: true });
  const [answersArray, setAnswersArray] = useState(answers);

  const handleSubmit = () => {
    if (inputValue.length > 0) {
      setAnswersArray([inputValue, ...answersArray]);
      setInputValue("");
    }
  };

  useEffect(() => {
    const observers: Record<number, IntersectionObserver> = {};
    const observerCallback =
      (index: number) => (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          setVisibleStories((prev) => ({
            ...prev,
            [index]: entry.isIntersecting,
          }));
        });
      };

    const storyElements = document.querySelectorAll(".story-item");
    storyElements.forEach((element, index) => {
      const observer = new IntersectionObserver(observerCallback(index), {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      });
      observer.observe(element);
      observers[index] = observer;
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, [answersArray]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-black pt-[40px]">
      <div className="px-4 sm:px-6 md:px-8 lg:px-20">
        <Navbar />

        <div className="flex flex-col mt-12 md:mt-20">
          <div className="w-full md:w-4/5 lg:w-3/5">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-normal font-baskerville-bt leading-tight">
              What childhood memory do you remember the most?
            </h1>

            <div className="mt-6 md:mt-10">
              <input
                type="text"
                placeholder="You can pour your heart out here..."
                className="w-full bg-black text-white font-popins font-normal text-lg sm:text-xl md:text-2xl cursor-pointer focus:outline-none placeholder:text-gray-500"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div className="mt-56 md:mt-32">
            <Button
              className="text-black bg-white px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-sm sm:text-base"
              onClick={handleSubmit}
              disabled={inputValue.length === 0}
            >
              Submit
            </Button>
          </div>

          <div className="mt-16 md:mt-20">
            <h2 className="text-white font-baskerville-bt text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-10">
              Stories
            </h2>

            <div className="space-y-6 md:space-y-8">
              {answersArray.map((answer, index) => (
                <div
                  key={index}
                  className={`story-item transition-all duration-1000 ${
                    index === 0 ||
                    visibleStories[index as keyof typeof visibleStories]
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-20"
                  }`}
                >
                  <p className="text-white text-xl sm:text-2xl md:text-3xl break-words">
                    "{answer}"
                  </p>
                  <hr className="my-6 md:my-8 border-t border-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
