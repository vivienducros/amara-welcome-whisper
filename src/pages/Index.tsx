import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/data/quizData";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuizScreen from "@/components/QuizScreen";
import ContactScreen from "@/components/ContactScreen";
import ThankYouScreen from "@/components/ThankYouScreen";

type Screen = "welcome" | "quiz" | "contact" | "thankyou";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");

  const handleStart = () => setScreen("quiz");

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);

    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreen("contact");
    }
  };

  const handleQuizBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      setScreen("welcome");
    }
  };

  const handleContactBack = () => {
    setQuestionIndex(quizQuestions.length - 1);
    setScreen("quiz");
  };

  const handleSubmit = (data: { firstName: string; email: string; phone: string }) => {
    setFirstName(data.firstName);
    // Log data client-side (no backend)
    console.log("Lead data:", { ...data, answers });
    setScreen("thankyou");
  };

  return (
    <main className="min-h-[100dvh] bg-background">
      <AnimatePresence mode="wait">
        {screen === "welcome" && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}
        {screen === "quiz" && (
          <QuizScreen
            key={`quiz-${questionIndex}`}
            question={quizQuestions[questionIndex]}
            questionIndex={questionIndex}
            totalQuestions={quizQuestions.length}
            onAnswer={handleAnswer}
            onBack={handleQuizBack}
          />
        )}
        {screen === "contact" && (
          <ContactScreen
            key="contact"
            totalQuestions={quizQuestions.length}
            onSubmit={handleSubmit}
            onBack={handleContactBack}
          />
        )}
        {screen === "thankyou" && (
          <ThankYouScreen key="thankyou" firstName={firstName} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
