/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Question from './Question.jsx';
import Answers from './Answers.jsx';
import QuestionModal from './QuestionModal.jsx';

const Questions = (props) => {
  const [count, setCount] = useState(4);
  const [questions, setQuestions] = useState([]);
  useEffect( () => {
    setQuestions( () => {
      return props.questions.slice(0, count);
    })
  }, [count, props.questions.length]);

  const [errors, setErrors] = useState( () => {
    return {
      body: true,
      name: true,
      email: true
    }
  });


  const handleShowMore = (event) => {
    setCount( (curCount) => {
      return curCount + 2;
    });
  };

  return (
    <div className='wholeQuestion'>
      <QuestionModal open={props.view} onClose={props.handleView} product_name={props.product_name}>
        <form className='form' onSubmit={props.task}>
          <label>Your Question <span className='asterisk'>*</span></label>
          <textarea name='body' maxLength='1000' rows='8' placeholder='Why did you like the product or not?'></textarea>
          {!props.errors.body && <div className='error'>Please enter valid answer (max 1000 characters)</div>}
          <label>What is your nickname <span className='asterisk'>*</span></label>
          <input className='username' type='text' maxLength='60' name='username' placeholder='Example: jackson11!'></input>
          {!props.errors.name && <div className='error'>Please enter valid name (max 60 characters)</div>}
          <label>Your Email <span className='asterisk'>*</span></label>
          <input className='email' type='text' maxLength='60' name='email' placeholder='Example: jack@email.com'></input>
          {!props.errors.email ? <div className='error'>Please enter an email (max 60 characters)</div> : props.errors.email === 'wrong' && <div className='error'>Please enter a valid email</div>}
          <input className='submit' type='submit' value='Answer'></input>
        </form>
      </QuestionModal>
      {questions.map( (question) => {
        return (
          <div key={question.question_id} className='oneQ'>
              <Question question={question} product_name={props.product_name}/>
          </div>
        );
      })}
      <div className='topBar'>
        <span className='addQuestion'>
          <button onClick={props.handleView}>Add Question</button>
        </span>
        {props.questions.length > count
          && <span onClick={handleShowMore} className='qShowMore'>
            Show More Questions
          </span>
        }

      </div>
    </div>
  );
};

export default Questions;