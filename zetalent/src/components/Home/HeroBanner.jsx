"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const HeroBanner = () => {
  const router = useRouter();
  const [image, setImage] = useState(1); // Start at 1
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Corrected and more efficient effect for the image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      // Use the functional update form to avoid depending on `image` state
      setImage((prevImage) => (prevImage >= 7 ? 1 : prevImage + 1));
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []); // Empty dependency array runs this effect only once on mount

  // Placeholder rotation effect (this was already correct)
  useEffect(() => {
    const placeholders = [
      "Search for 'Web Developer'...",
      "Try 'Graphic Designer'...",
      "What about 'Project Manager'?",
      "Search for 'Data Analyst'...",
    ];
    let index = 0;
    setCurrentPlaceholder(placeholders[0]);
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  // Data for popular tags to make it cleaner
  const popularTags = ["Website Design", "Wordpress", "Logo Design", "AI Services"];

  return (
    <div className="h-[680px] relative bg-cover">
      <div className="absolute top-0 right-0 w-full h-full">
        {/* Map over an array to render images cleanly */}
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Image
            key={num}
            alt="hero"
            src={`/bg-hero${num}.webp`}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              image === num ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="z-10 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
        <h1 className="text-white text-shadow-amber-500 text-5xl leading-snug">
          Find the perfect &nbsp;<i>Freelance</i>
          <br /> services for your business.
        </h1>
        <div className="flex align-middle">
          <div className="relative">
            <input
              type="text"
              className="h-14 w-[450px] pl-10 rounded-md  border "
              placeholder={currentPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            className="bg-primary text-white px-12 text-lg font-semibold rounded-r-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="text-white flex gap-4 items-center">
          Popular:
          <ul className="flex gap-3">
            {popularTags.map((tag) => (
              <li
                key={tag}
                className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/search?q=${tag}`)}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;