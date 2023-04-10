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
  const stopListening = () => {
    SpeechRecognition.stopListening();
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
        <h2>Vocal Transcriber</h2>
        <p>
          This website converts spoken words to written text. It offers an
          easy-to-use interface and accurate transcription results. Ideal for
          transcribing lectures, interviews, and other audio content.
        </p>

        <div className="text_conatiner">{transcript}</div>

        <div className="btn-style">
          <button onClick={copytext}>{iscopied}</button>
          <button onClick={startListening}>Start</button>
          <button onClick={stopListening}>Stop</button>
          <button onClick={resetTranscript}>Clear</button>
        </div>
      </div>
    </>
  );
};

export default App;
