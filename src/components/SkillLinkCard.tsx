import React from "react";
import SkillLinkImg from "../assets/ChatGPT Image Aug 24, 2025, 01_04_49 PM.png"; // Make sure the path is correct

const SkillLinkCard: React.FC = () => {
  return (
    <section className="max-w-sm md:max-w-md lg:max-w-lg mx-auto my-8 p-4">
      <a
        href="https://skilllink3.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
          {/* Image */}
          <img
            src={SkillLinkImg}
            alt="SkillLink"
            className="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Description */}
          <div className="p-5">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              SkillLink
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              SkillLink is a platform that connects skilled professionals with
              clients looking for their expertise. Explore projects, showcase
              skills, and grow your career seamlessly.
            </p>
          </div>
        </div>
      </a>
    </section>
  );
};

export default SkillLinkCard;
