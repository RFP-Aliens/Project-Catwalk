/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import './answerStyles.css';

const Answer = (props) => {
  const [helpful, setHelpful] = useState( () => {
    return props.answer.helpfulness;
  });
  const [report, setReport] = useState( () => {
    return false;
  });
  let date = new Date(props.answer.date);
  let dateFormat = {month: 'short', day: 'numeric', year: 'numeric'};
  date = date.toLocaleDateString('en-US', dateFormat);

  const handleHelpful = (event) => {
    axios.put(`/qa/answers/${event.target.id}/helpful`)
      .then(response => {
        setHelpful( (currState) => {return currState + 1;} );
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleReport = (event) => {
    axios.put(`/qa/answers/${event.target.id}/report`)
      .then(response => {
        setReport(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      {!report
      ? <div className='container'>
        <span>A:</span>
        <div className='answerBody'>
          <div className='answer'>
            {props.answer.body}
          </div>
          <div>
            <span className='user'>
              by {props.answer.answerer_name}, {date}
            </span>
            <span className='helpful'>
              Helpful? <span className='yes' id={props.answer.answer_id} onClick={handleHelpful}>Yes</span> ({helpful})
            </span>
            <span className='report' id={props.answer.answer_id} onClick={handleReport}>
              Report
            </span>
          </div>
        </div>
      </div>
      : <div></div>
      }
    </div>
  );
};

export default Answer;