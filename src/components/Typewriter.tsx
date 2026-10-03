import { useEffect, useState } from "react";

interface TypewriterProps {
  prefix: string;
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
  gradientClassName?: string;
}

export default function Typewriter({
  prefix,
  words,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseMs = 2200,
  className = "",
  gradientClassName = "bg-gradient-to-r from-[#4B4FBF] via-[#0ea5e9] to-[#10b981] dark:from-[#818cf8] dark:via-[#38bdf8] dark:to-[#2dd4a7] bg-clip-text text-transparent",
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset if words array changes (e.g., language switch)
  useEffect(() => {
    setWordIndex(0);
    setText("");
    setIsDeleting(false);
  }, [words]);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const currentWord = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseMs);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 350);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  const currentWord = words[wordIndex % words.length] ?? "";

  return (
    <span className={`inline ${className}`}>
      {/* Screen-reader full accessibility text */}
      <span className="sr-only">
        {prefix} {currentWord}
      </span>
      <span aria-hidden="true" className="inline">
        <span>{prefix}</span>{" "}
        <span className={`inline font-extrabold ${gradientClassName}`}>
          {text}
        </span>
        <span
          className="inline-block w-[3px] sm:w-[4px] h-[0.82em] align-middle ms-1 rounded-full bg-cyan-500 dark:bg-cyan-300 animate-pulse shadow-[0_0_12px_rgba(14,165,233,0.7)]"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
