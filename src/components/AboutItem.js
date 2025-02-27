import React from "react";

const SkillBar = ({ skill, percentage }) => {
  return (
    <div className="my-4">
      <div className="flex justify-between">
        <span>{skill}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const SkillSet = () => {
  return (
    <div className="Items">
      <SkillBar skill="JavaScript" percentage={100} />
      <SkillBar skill="React" percentage={75} />
      <SkillBar skill="CSS" percentage={70} />
      <SkillBar skill="Node.js" percentage={80} />
      <SkillBar skill="MongoDB" percentage={60} />
    </div>
  );
};

export default SkillSet;
