import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

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

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Get GPT3 to do your write-up!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Turn point-form actions and outcomes into a competency write-up for a particular competency area</h2>
          </div>
        </div>
        <div className='prompt-container'>
          <div className='prompt-row'>
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
          </div>
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
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
