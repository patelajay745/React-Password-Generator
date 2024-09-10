import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, , setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const passwordref = useRef(null);

  const copyPasswordToClipBoard = () => {
    passwordref.current?.select();

    // passwordref.current?.setSelectionRange(0,3);
    navigator.clipboard.writeText(password);
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg  text-orange-500 bg-gray-500 p-6">
        <h1 className="text-white text-center my-3 font-extrabold text-2xl mb-5">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            ref={passwordref}
            value={password}
            className="outline-none w-full py1 px-3"
            readOnly
            placeholder="Password"
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 "
          >
            Copy
          </button>
        </div>

        <div className="flex text-lg  gap-x-2 ">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label> Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label> Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
