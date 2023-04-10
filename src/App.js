import { useState } from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const App = () => {
  const [iscopied, setIsCopied] = useState("Copy");

  const start = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const startListening = () => {
    start();
    setIsCopied("Copy");
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const copytext = () => {
    navigator.clipboard.writeText(transcript);
    setIsCopied("Copied");
  };

  return (
    <>
      <div className="container">
        <h2>Speech to Text Converter</h2>
        <br />
        <p>
          A React hook that converts speech from the microphone to text and
          makes it available to your React components.
        </p>

        <div className="main-content">{transcript}</div>

        <div className="btn-style">
          <button onClick={copytext}>{iscopied}</button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
          <button onClick={resetTranscript}>Clear</button>
        </div>
      </div>
    </>
  );
};

export default App;
