import React, { useState, useCallback,useEffect} from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [numeric, setNumeric] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  const generatePassword = useCallback(() => {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numeric) characters += '0123456789';
    if (specialChar) characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setPassword(generatedPassword);
  }, [length, numeric, specialChar]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  useEffect(() => {
    generatePassword();
  }, [setPassword,length,numeric,specialChar])
  


  return (
    <>
      <div className="flex justify-center absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="container flex flex-col justify-between items-center bg-slate-800 max-w-md text-white rounded-2xl py-5 px-6">
          <h1 className='py-3 text-xl font-bold'>Password Generator</h1>

          <input
            className='rounded-2xl px-5 py-3 text-black mb-4 w-full'
            placeholder='PASSWORD'
            type="text"
            value={password}
            readOnly
          />

          <div className="dependencies flex flex-col justify-around items-center w-full px-5">
            <div className="w-full flex justify-between items-center py-2">
              <label htmlFor="length">Length: {length}</label>
              <input
                id="length"
                type="range"
                min={8}
                max={25}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-2/3"
              />
            </div>
            <div className="w-full flex justify-between items-center py-2">
              <div className="flex items-center">
                <input
                  id="numeric"
                  type="checkbox"
                  checked={numeric}
                  onChange={() => setNumeric(!numeric)}
                  className="mr-2"
                />
                <label htmlFor="numeric">Include Numbers</label>
              </div>
            </div>
            <div className="w-full flex justify-between items-center py-2">
              <div className="flex items-center">
                <input
                  id="specialChar"
                  type="checkbox"
                  checked={specialChar}
                  onChange={() => setSpecialChar(!specialChar)}
                  className="mr-2"
                />
                <label htmlFor="specialChar">Include Special Characters</label>
              </div>
            </div>
          </div>

          <button
            onClick={generatePassword}
            className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-700"
          >
            Generate Password
          </button>
          
          <button
            onClick={copyToClipboard}
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded-2xl hover:bg-green-700"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
