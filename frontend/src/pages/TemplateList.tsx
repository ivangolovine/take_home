import React, { useEffect, useState } from "react";
import TemplateMenu from "../components/TemplateMenu";
import './TemplateList.css';


const TemplateList: React.FC = () => {
  const [email, setEmail] = useState('');
  const [ccEmail, setCCEmail] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<{ title: string; textBox: string} | null>(null);

  const handleCCEmails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmails = e.target.value;
    const splitEmails = inputEmails.split(',').map(email => email.trim());
    setCCEmail(splitEmails);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleChange = e.target.value;
    setSelectedTemplate(prev => prev ? { ...prev, title: titleChange } : { title: titleChange, textBox: '' });
  };
  
  const handleTextBoxChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textBoxChange = e.target.value;
    setSelectedTemplate(prev => prev ? { ...prev, textBox: textBoxChange } : { title: '', textBox: textBoxChange });
  };

  const handleClearFields = () => {
    setEmail('');
    setCCEmail([]);
    setSelectedTemplate(null);
  };


  return (
      <div className="Email-Information-Outer">
        <div className="Email-To-Outer">
          <div className="CC-Email-Text-Container">
            <p className="CC-Email-Text">To</p>
          </div>
          <input
          className="CC-Emails"
          placeholder="ivangolovine@gmail.com"
          type="text"
          autoFocus={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="CC-Email-Outer">
          <div className="CC-Email-Text-Container">
            <p className="CC-Email-Text">CC</p>
          </div>
          <input
          className="CC-Emails"
          placeholder="Enter Email separated by comma"
          type="text"
          value={ccEmail}
          onChange={handleCCEmails}
          />
        </div>
        <div className="Email-Text-Area-Container">
          <input
            className="Email-Text-Subject"
            placeholder="Add Subject"
            value={selectedTemplate?.title || ''}
            onChange={handleTitleChange}
          />
          <textarea 
            className="Email-Text-Area"
            placeholder="Message..."
            value={selectedTemplate?.textBox || ''}
            onChange={handleTextBoxChange}
          />
        </div>
        <div className="Email-Container-Buttons">
          <div className="Send-Button-Email">
            <img src="icons/paper-plane-solid.svg"></img>
          </div>
          <div className="Clear-Button-Email" onClick={handleClearFields}>
            <img src="icons/trash-can-solid.svg"></img>
          </div>
        </div>
        <TemplateMenu  setSelectedTemplate = {setSelectedTemplate}/>
      </div>
  );
};

export default TemplateList;
