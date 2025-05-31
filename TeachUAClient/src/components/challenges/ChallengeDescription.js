import React from "react";
import "./css/ChallengePage.css";

const ChallengeDescription = ({challenge}) => {
    return <div className="challenge-description" dangerouslySetInnerHTML={{__html: `${challenge.description}`}}/>
}
export default ChallengeDescription;