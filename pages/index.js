import Head from 'next/head';
import Image from 'next/image';
import govtechLogo from '../assets/govtech-logo.jpeg';
import Dropdown from './dropdown';
import { useState } from 'react';
import competencies from '../assets/roles.json';

const Home = () => {
  // Inputs
  const [inputActions, setInputActions] = useState('');
  const onUserChangeActions = (event) => {
    setInputActions(event.target.value);
  }
  const [inputOutcomes, setInputOutcomes] = useState('');
  const onUserChangeOutcomes = (event) => {
    setInputOutcomes(event.target.value);
  }
  const [inputSkills, setInputSkills] = useState('');
  const onUserChangeSkills = (event) => {
    setInputSkills(event.target.value);
  }
  const [inputUpdates, setInputUpdates] = useState('');
  const onUserChangeUpdates = (event) => {
    setInputUpdates(event.target.value);
  }
  const [custom, setCustom] = useState(false);
  const toggle = () => {
    setCustom(!custom);
  }
  const [inputCompetencies, setInputCompetencies] = useState('');
  const changeJob = (job) => {
    setInputCompetencies(competencies[job].join(', '));
  }

  const options = [
    {job: "Product Manager"},
    {job: "Engagement Manager"},
    {job: "Data Scientist"},
    {job: "Quantitative Analyst"},
    {job: "Data Engineer"},
    {job: "AI Engineer"}
  ]

  // OpenAI API interface
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch('api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputActions, inputOutcomes, inputSkills }),
    });

    const data = await response.json();
    const {output} = data;
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const callGenerateEndpoint2 = async () => {
    setIsGenerating(true);

    const response = await fetch('api/generate2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputUpdates, inputCompetencies }),
    });

    const data = await response.json();
    const {output} = data;
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Competency Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Get GPT3 to do your write-up!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Turn point-form actions and outcomes into a competency write-up for a particular competency area</h2>
          </div>
          <label className='header-toggle'>
            <input type="checkbox" defaultChecked={custom} onClick={toggle} />
            <span />
            <strong>Custom Competency</strong>
          </label>
        </div>
        <div className='prompt-container'>
          {custom ? (<><div className='prompt-row'>
            <h3>Action: </h3>
            <textarea placeholder='Write the actions you took separated by commas'
            className='prompt-box'
            value={inputActions}
            onChange={onUserChangeActions}
            />
          </div>
          <div className='prompt-row'>
            <h3>Result: </h3>
            <textarea placeholder='Describe the outcome you achieved'
            className='prompt-box'
            value={inputOutcomes}
            onChange={onUserChangeOutcomes}
            />
          </div>
          <div className='prompt-row'>
            <h3>Skills: </h3>
            <textarea placeholder='Copy and paste the sub-competency area'
            className='prompt-box'
            value={inputSkills}
            onChange={onUserChangeSkills}
            />
          </div>
          <div className='prompt-buttons'>
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
              <div className='generate'>
                {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
              </div>
            </a>
          </div></>) : (<>
          <div className='prompt-row'>
            <h3>Job Role: </h3>
            <Dropdown placeHolder="Select Job Title" options={options} onChange={(value) => changeJob(value)}/>
          </div>
          <div className='prompt-row'>
            <h3>Updates: </h3>
            <textarea placeholder='Copy and paste your monthly update pointers'
            className='prompt-box bigger'
            value={inputUpdates}
            onChange={onUserChangeUpdates}
            />
          </div>

          <div className='prompt-buttons'>
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint2}>
              <div className='generate'>
                {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          <div className='prompt-row'>

          </div>
          </>)}
          {apiOutput && (
            <div className='output'>
              <div className='output-header-container'>
                <div className='output-header'>
                  <h3>Output</h3>
                </div>
              </div>
              <div className='output-content'>
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.tech.gov.sg"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={govtechLogo} alt="govtech logo" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
