import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBestScore, setIsNewBestScore] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]); 
  const [gameStarted, setGameStarted] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false); 
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); 
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null); 
  const [fade, setFade] = useState('fade-in'); 

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (gameStarted && !showScore) { 
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [gameStarted, showScore]);

  const questions = [
    {
      questionText: 'Persamaan kata dari kata Mutu',
      answerOptions: [
        { answerText: 'Harga', isCorrect: false },
        { answerText: 'Jaminan', isCorrect: false },
        { answerText: 'Kuantitas', isCorrect: false },
        { answerText: 'Kualitas', isCorrect: true },
      ],
    },
    {
      questionText: 'Acuh sama artinya dengan',
      answerOptions: [
        { answerText: 'Cuek', isCorrect: false },
        { answerText: 'Peduli', isCorrect: true },
        { answerText: 'Jengkel', isCorrect: false },
        { answerText: 'Mau', isCorrect: false },
      ],
    },
    {
      questionText: 'Jika 7x - 6 = 22, berapa nilai x?',
      answerOptions: [
        { answerText: '3', isCorrect: false },
        { answerText: '4', isCorrect: true },
        { answerText: '5', isCorrect: false },
        { answerText: '6', isCorrect: false },
      ],
    },
    {
      questionText: 'Manakah kata yang paling tepat menggantikan "kontroversial" dalam kalimat resmi?',
      answerOptions: [
        { answerText: 'Disengketakan', isCorrect: false },
        { answerText: 'Diperdebatkan', isCorrect: true },
        { answerText: 'Diperbincangkan', isCorrect: false },
        { answerText: 'Dipermasalahkan', isCorrect: false },
      ],
    },
    {
      questionText: 'Jika harga sebuah barang naik 20% dan sekarang harganya Rp600.000, berapa harga awalnya?',
      answerOptions: [
        { answerText: 'Rp500.000', isCorrect: true },
        { answerText: 'Rp520.000', isCorrect: false },
        { answerText: 'Rp550.000', isCorrect: false },
        { answerText: 'Rp580.000', isCorrect: false },
      ],
    },
    {
      questionText: 'What is the most appropriate antonym for "prosperous"?',
      answerOptions: [
        { answerText: 'Poor', isCorrect: true },
        { answerText: 'Unsuccessful', isCorrect: false },
        { answerText: 'Unlucky', isCorrect: false },
        { answerText: 'Struggling', isCorrect: false },
      ],
    },
    {
      questionText: 'Jika hari ini adalah Senin, dua hari sebelum tiga hari setelah kemarin adalah hari apa?',
      answerOptions: [
        { answerText: 'Minggu', isCorrect: false },
        { answerText: 'Senin', isCorrect: true },
        { answerText: 'Selasa', isCorrect: false },
        { answerText: 'Rabu', isCorrect: false },
      ],
    },
    {
      questionText: 'Jika A lebih tinggi dari B, dan B lebih tinggi dari C, maka:',
      answerOptions: [
        { answerText: 'C lebih tinggi dari A.', isCorrect: false },
        { answerText: 'A lebih rendah dari C.', isCorrect: false },
        { answerText: 'A lebih tinggi dari C.', isCorrect: true },
        { answerText: 'Tidak bisa disimpulkan.', isCorrect: false },
      ],
    },
    {
      questionText: 'Sebuah prisma segitiga memiliki berapa sisi yang berbentuk persegi panjang?',
      answerOptions: [
        { answerText: 'Dua', isCorrect: false },
        { answerText: 'Tiga', isCorrect: true },
        { answerText: 'Empat', isCorrect: false },
        { answerText: 'Lima', isCorrect: false },
      ],
    },
    {
      questionText: 'Berikut ini yang bukan termasuk kata baku adalah',
      answerOptions: [
        { answerText: 'Karier', isCorrect: false },
        { answerText: 'Risiko', isCorrect: false },
        { answerText: 'Handal', isCorrect: true },
        { answerText: 'Lembap', isCorrect: false },
      ],
    },
  ];

  const shuffleQuestions = (questions) => {
    return [...questions].sort(() => Math.random() - 0.5);
  };

  const shuffleAnswers = (answerOptions) => {
    return [...answerOptions].sort(() => Math.random() - 0.5);
  };
  
  const handleAnswerOptionClick = (isCorrect, index) => {
    setSelectedAnswerIndex(index);
    setIsCorrectAnswer(isCorrect);

    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 100);
      }

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < shuffledQuestions.length) {
        setCurrentQuestion(nextQuestion);
        setShuffledAnswers(shuffleAnswers(shuffledQuestions[nextQuestion].answerOptions)); 
        setSelectedAnswerIndex(null); 
        setIsCorrectAnswer(null); 
      } else {
        setShowScore(true);
        if (score + (isCorrect ? 100 : 0) > bestScore) {
          setBestScore(score + (isCorrect ? 100 : 0));
          setIsNewBestScore(true);
        }
      }
    }, 500); 
  };

  const handleStartGame = () => {
    const shuffled = shuffleQuestions(questions); 
    setShuffledQuestions(shuffled); 
    setShuffledAnswers(shuffleAnswers(shuffled[0].answerOptions)); 
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setIsNewBestScore(false);
    setGameStarted(true); 
    setShowExitPopup(false); 

    setSelectedAnswerIndex(null);
    setIsCorrectAnswer(null);

    setFade('fade-out'); 
    setTimeout(() => {
      setGameStarted(true);
      setShowScore(false);
      setFade('fade-in');
    }, 500);
  };

  const handleEndGame = () => {
    setShowScore(true);
    setGameStarted(false); 
    
    setFade('fade-out');
    setTimeout(() => {
      setShowScore(true);
      setGameStarted(false);
      setFade('fade-in'); 
    }, 500); 
  };

  const handlePlayAgain = () => {
    handleStartGame();
  };

  const handleExitClick = () => {
    setShowExitPopup(true);
  };

  const handleExitConfirm = () => {
    setGameStarted(false);
    setShowExitPopup(false); 
  };

  const handleExitCancel = () => {
    setShowExitPopup(false);
  };

  return (
    <div className="app">
      {showExitPopup && <div className="overlay"></div>}

      {showExitPopup && (
        <div className="exit-popup">
          <p>Return to the main menu?<br></br>Any unsaved progress will be lost.</p>
          <button className="no-button" onClick={handleExitCancel}>
            No
          </button>
          <button className="yes-button" onClick={handleExitConfirm}>
            Yes
          </button>
        </div>
      )}
      
      {!gameStarted || showScore ? (
        <div className="cloud-container">
        <img src={`${process.env.PUBLIC_URL}/awan1.png`} alt="Cloud" className="awan awan-1" />
        <img src={`${process.env.PUBLIC_URL}/awan2.png`} alt="Cloud" className="awan awan-2" />
        <img src={`${process.env.PUBLIC_URL}/awan3.png`} alt="Cloud" className="awan awan-3" />
        <img src={`${process.env.PUBLIC_URL}/awan4.png`} alt="Cloud" className="awan awan-4" />
      </div>
      ) : null}
      
      {!gameStarted && !showScore ? (
        <div className={`start-section ${fade}`}>
          <img src={`${process.env.PUBLIC_URL}/logo brainify.PNG`} alt="Game Logo" className="game-logo" />
          <button onClick={handleStartGame}>START GAME</button>
        </div>
      ) : null}

      {showScore ? (
        <div className={`score-section ${fade}`}>
          <h2>Your score: {score}</h2>
          {isNewBestScore && <p className="new-best-score">NEW BEST SCORE!</p>}
          <p>Best Score: {bestScore}</p>
          <button onClick={handlePlayAgain}>PLAY AGAIN</button>
        </div>
      ) : null}

      {gameStarted && ! showScore ? (
        shuffledQuestions.length > 0 && (
          <>
            <div className="header">
              <button className="exit-button" onClick={handleExitClick}>
                Exit
              </button>
            </div>
            <div className="question-container">
            <div className="question-section">
              <div className="question-text">
                {shuffledQuestions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">
              {shuffledAnswers.map((answerOption, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}
                className={
                  selectedAnswerIndex === index
                    ? isCorrectAnswer
                      ? 'correct-answer'
                      : 'incorrect-answer'
                    : ''
                }
                disabled={selectedAnswerIndex !== null} 
              >
                {answerOption.answerText}
              </button>
              ))}
            </div>
            </div>
          </>
        )
      ) : null }
    </div>
  );
}

export default App;
