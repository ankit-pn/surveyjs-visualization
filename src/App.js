import React, { useEffect, useState } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import surveyJson from './data3.json';
import participantData from './participants.json'
const App = () => {
  const [survey, setSurvey] = useState(null);


  const saveSurveyData = (sender) => {
    const results = JSON.stringify(sender.data);
    console.log(results); // For debugging purposes

    // Here you would typically send the data to your server
    fetch('your-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: results,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success (e.g., show a success message to the user)
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error (e.g., show an error message to the user)
    });
  };
  useEffect(() => {
    // const participantData = [
    //   {
    //     "name": "ankit",
    //     "time_slot": "10am",
    //     "phone_number": "8809814750"
    //   },
    //   {
    //     "name": "she",
    //     "time_slot": "11am",
    //     "phone_number": "8809816750"
    //   }
    // ];

    const newSurvey = new Model(surveyJson);

    const handleValueChanged = (sender, options) => {
      if (options.name === "interview_time") {
        const timeSlot = options.value;
        const filteredParticipants = participantData.filter(p => p.time_slot === timeSlot);
        
        const a01Question = newSurvey.getQuestionByName("participant_id");
        a01Question.choices = [
          ...filteredParticipants.map(p => ({
            value: p.name,
            text: p.name
          })),
          {
            value: "NA",
            text: "NA"
          }
        ];
      }
      
      if (options.name === "participant_id") {
        const selectedName = options.value;
        const selectedParticipant = participantData.find(p => p.name === selectedName);
        
        if (selectedParticipant) {
          newSurvey.setValue("phone_number", selectedParticipant.phone_number);
        }
      }
    };

    // Add the onValueChanged event handler
    newSurvey.onValueChanged.add(handleValueChanged);

    // Handle phone_number display
    newSurvey.onTextMarkdown.add((survey, options) => {
      if (options.text.includes("{phone_number}")) {
        const phoneNumber = survey.getValue("phone_number");
        options.html = options.text.replace("{phone_number}", phoneNumber || "___________");
      }
    });

    newSurvey.onComplete.add(saveSurveyData);


    setSurvey(newSurvey);
  }, []);

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>SurveyJS Visualization</h1>
      <Survey model={survey} />
    </div>
  );
};

export default App;