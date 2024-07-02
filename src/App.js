import React from 'react';
import IntakeForm from './components/IntakeForm';
import VoiceJournal from './components/VoiceJournal';
import './App.css';

function App() {
  const [showIntakeForm, setShowIntakeForm] = React.useState(false);
  const [showVoiceJournal, setShowVoiceJournal] = React.useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Welcome to SISTAS</h1>
      </header>
      <p className="app-description">
      SISTAS is a revolutionary app designed to support Black mothers during the postpartum period by tracking and analyzing emotional well-being through advanced AI technology. 

      SISTAS offers a safe and nurturing space where you can find culturally sensitive resources, advice from a supportive community of fellow moms and resources.  

      Share your daily feelings with SISTAS through daily voice or text journaling. Through sentiment analysis, AI, aka your “SISTA”, monitors your emotional state, identifying signs that you may need support and connects you with a beloved support person, your care team or community organization and helpful resources.
      </p>

      <button onClick={() => setShowIntakeForm(!showIntakeForm)}>Intake Form</button>
      <button onClick={() => setShowVoiceJournal(!showVoiceJournal)}>Voice Journal</button>

      {showIntakeForm && (
        <>
          <h2>New Moms Postpartum Support App Intake Form</h2>
          <IntakeForm />
        </>
      )}

      {showVoiceJournal && <VoiceJournal />}
    </div>
  );
}

export default App;


