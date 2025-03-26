import React from "react";
import { MdPeopleAlt } from "react-icons/md";

import { ImTree } from "react-icons/im";

function PowerOfCode({
  title,
  desc,
  level,
  lesson,
  clas,
 
}) {
  return (
    <div className={clas}>
        <span className="explorer-span">
      <h1>{title}</h1>
      <p>{desc}</p>
      </span>
      <div className="explorerfooter">
        <div className="explorerfooter-child">
          <MdPeopleAlt />
          <div>{level}</div>
        </div>
        <div className="explorerfooter-child">
          <ImTree />
          <div>{lesson} Lessons</div>
        </div>
      </div>
    </div>
  );
}

export default PowerOfCode;
