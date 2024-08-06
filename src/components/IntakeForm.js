import React, { useState } from 'react';
import './IntakeForm.css';

const IntakeForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  switch (step) {
    case 1:
      return (
        <form>
          <h1>Personal Information</h1>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
      
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" onChange={handleChange} />
      
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" onChange={handleChange} />
      
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" onChange={handleChange} />
      
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" onChange={handleChange} />
      
          <button type="button" onClick={nextStep}>Next</button>
        </form>
      );
      case 2:
        return (
          <form>
            <h1>Your Pregnancy Journey</h1>
      
            <label htmlFor="deliveryDate">Delivery Date:</label>
            <input type="date" id="deliveryDate" name="deliveryDate" onChange={handleChange} />
      
            <label htmlFor="babyName">Baby's Name:</label>
            <input type="text" id="babyName" name="babyName" onChange={handleChange} />
      
            <label htmlFor="babyDob">Baby's Date of Birth:</label>
            <input type="date" id="babyDob" name="babyDob" onChange={handleChange} />
      
            <label htmlFor="complications">Any Complications During Pregnancy or Delivery?</label>
            <textarea id="complications" name="complications" onChange={handleChange} />
      
            <label htmlFor="medications">Current Medications or Supplements:</label>
            <textarea id="medications" name="medications" onChange={handleChange} />
      
            <label htmlFor="allergies">Allergies (if any):</label>
            <input type="text" id="allergies" name="allergies" onChange={handleChange} />
      
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </form>
        );
        case 3:
          return (
            <form>
              <h1>Postpartum Journey</h1>
        
              <label htmlFor="emotionalState">How are you feeling emotionally since the birth of your baby?</label>
              <textarea id="emotionalState" name="emotionalState" onChange={handleChange} />
        
              <label htmlFor="mommyEmoticons">Mommy emoticons</label>
              <input type="text" id="mommyEmoticons" name="mommyEmoticons" onChange={handleChange} />
        
              <label htmlFor="experiences">Are you experiencing any of the following? (select)</label>
              <select id="experiences" name="experiences" onChange={handleChange}>
                <option value="depression">Depression</option>
                <option value="anxiety">Anxiety</option>
                <option value="moodSwings">Mood swings</option>
                <option value="troubleSleeping">Trouble sleeping</option>
                <option value="other">Other (please specify)</option>
              </select>
        
              <label htmlFor="support">Who is supporting you during your postpartum journey? (e.g., from family, partner, friends, healthcare providers, community organization, faith organization)?</label>
              <input type="text" id="support" name="support" onChange={handleChange} />
        
              <label htmlFor="additionalInfo">Are you interested in receiving information about: (additional info provided - AI recommended) (e.g., balancing multiple kids in the household, childcare, housing, groceries, homeless prenatal, sister web (community doulas), BIH, legal help) Respectful care, grievance process in the healthcare system, mental health resources</label>
              <textarea id="additionalInfo" name="additionalInfo" onChange={handleChange} />
        
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={nextStep}>Next</button>
            </form>
          );
        case 4:
          return (
            <form>
              <h1>Additional Information</h1>

              <label htmlFor="source">How did you hear about this app? (healthcare team, family, friend, internet search, other)</label>
              <input type="text" id="source" name="source" onChange={handleChange} />

              <label htmlFor="expectations">What are your expectations from this app? (postpartum support, track my postpartum journey, resources, best doctors to go to for black moms)</label>
              <textarea id="expectations" name="expectations" onChange={handleChange} />

              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={nextStep}>Next</button>
            </form>
          );
        case 5:
          return (
            <form>
              <h1>Additional Information</h1>

              <label htmlFor="source">How did you hear about this app? (healthcare team, family, friend, internet search, other)</label>
              <input type="text" id="source" name="source" onChange={handleChange} />

              <label htmlFor="expectations">What are your expectations from this app? (postpartum support, track my postpartum journey, resources, best doctors to go to for black moms)</label>
              <textarea id="expectations" name="expectations" onChange={handleChange} />

              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={nextStep}>Next</button>
            </form>
          );

        case 6:
          return (
            <form>
              <h1>Consent</h1>
        
              <label htmlFor="consent">I consent to the use of my information for the purposes of receiving support through this app.</label>
              <input type="checkbox" id="consent" name="consent" onChange={handleChange} />
        
              <label htmlFor="privacy">I understand that the information provided will be used confidentially and in accordance with privacy regulations.</label>
              <input type="checkbox" id="privacy" name="privacy" onChange={handleChange} />
        
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={nextStep}>Next</button>
            </form>
          );
        case 7:
          return (
            <form>
              <h1>Signature</h1>
        
              <label htmlFor="signature">Your signature (if physical form) / Tick box (if digital form)</label>
              <input type="checkbox" id="signature" name="signature" onChange={handleChange} />
        
              <button type="button" onClick={prevStep}>Back</button>
            </form>
          );
    // Add more cases as needed for additional steps
    default:
      return (
        <form>
          <h1>Consent</h1>
          <label htmlFor="agree_terms">I agree to the terms and conditions</label>
          <input type="checkbox" id="agree_terms" name="agree_terms" onChange={handleChange} />
          <button type="button" onClick={prevStep}>Back</button>
          <button type="button"> Submit </button>
        </form>
      );
  }
};

export default IntakeForm;