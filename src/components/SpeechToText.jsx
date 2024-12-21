import React, { useState } from "react";

const VoiceInputComponent = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleStartListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Ваш браузер не поддерживает распознавание речи. Попробуйте использовать Chrome на Android или Safari на iOS."
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "ru-RU"; // Устанавливаем язык (русский)
      recognition.interimResults = true; // Показывать промежуточные результаты
      recognition.continuous = true; // Непрерывное распознавание

      recognition.onresult = (event) => {
        const result = Array.from(event.results)
          .map((res) => res[0].transcript)
          .join(" ");
        setTranscript(result); // Обновляем текст
      };

      recognition.onerror = (event) => {
        console.error("Ошибка распознавания речи:", event.error);
        if (event.error === "not-allowed") {
          alert(
            "Доступ к микрофону отклонён. Пожалуйста, проверьте настройки браузера."
          );
        } else {
          setTranscript("Ошибка: " + event.error);
        }
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false); // Останавливаем прослушивание после завершения
      };

      recognition.start();
      setListening(true);
    } catch (error) {
      console.error("Ошибка запуска распознавания:", error);
      alert("Не удалось начать распознавание речи. Проверьте настройки.");
    }
  };

  const handleStopListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.stop(); // Останавливаем слушатель
    }
    setListening(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button
        onClick={listening ? handleStopListening : handleStartListening}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: listening ? "#ff4d4f" : "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {listening ? "Остановить прослушивание" : "Начать прослушивание"}
      </button>

      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h3>Распознанный текст:</h3>
        <p
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            color: "black",
            minHeight: "50px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {transcript || "Текст будет отображаться здесь"}
        </p>
      </div>
    </div>
  );
};

export default VoiceInputComponent;
