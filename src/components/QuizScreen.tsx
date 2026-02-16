import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { icons } from "lucide-react";
import type { QuizQuestion } from "@/data/quizData";
import logoBlack from "@/assets/logo-black.png";

interface QuizScreenProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  onBack: () => void;
}

const QuizScreen = ({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  onBack,
}: QuizScreenProps) => {
  const progress = ((questionIndex + 1) / (totalQuestions + 3)) * 100;

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[100dvh] flex-col px-6 py-8"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only md:not-sr-only">Back</span>
        </button>
        <img src={logoBlack} alt="Amara" className="h-3.5" />
        <span className="text-xs tracking-widest text-muted-foreground">
          {questionIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: `${((questionIndex) / (totalQuestions + 3)) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-10 max-w-lg text-center text-2xl font-light leading-snug md:text-3xl"
        >
          {question.question}
        </motion.h2>

        <div className="flex w-full max-w-md flex-col gap-3">
          {question.options.map((option, i) => {
            const IconComponent = icons[option.icon as keyof typeof icons];
            return (
              <motion.button
                key={option.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAnswer(option.label)}
                className="flex w-full items-center gap-4 rounded-2xl border border-border bg-background px-6 py-4 text-left text-sm leading-relaxed transition-all hover:border-primary hover:bg-primary/5 md:text-base"
              >
                {IconComponent && (
                  <IconComponent className="h-5 w-5 shrink-0 text-primary" />
                )}
                {option.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default QuizScreen;
