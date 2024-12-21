import { useState } from 'react'

import './App.css'
import SpeechToText from './components/SpeechToText'
import VoiceInputComponent from './components/SpeechToText'

function App() {


  return (
    <>
      <h1>Распознавание речи</h1>
      <VoiceInputComponent />

    </>
  )
}

export default App
