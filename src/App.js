import React from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import surveyJson from './data.json';
const App = () => {
  // Replace this with your actual SurveyJS JSON
  // const surveyJson = {
  //   "pages": [
  //     {
  //       "name": "page1",
  //       "elements": [
  //         {
  //           "type": "text",
  //           "name": "question1",
  //           "title": "What is your name?"
  //         },
  //         {
  //           "type": "rating",
  //           "name": "question2",
  //           "title": "How would you rate your experience?"
  //         }
  //       ]
  //     }
  //   ]
  // };

  const survey = new Model(surveyJson);

  return (
    <div className="App">
      <h1>SurveyJS Visualization</h1>
      <Survey model={survey} />
    </div>
  );
};

export default App;