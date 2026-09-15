import { useEffect, useRef, useState } from "react";
import { randomScrambleChar } from "../lib/chars";

interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
}

export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [output, setOutput] = useState<string>(() => "\u00A0".repeat(text.length));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!triggered) {
      setOutput("\u00A0".repeat(text.length));
      return;
    }

    let cursor = 0;
    let startTimer: ReturnType<typeof setTimeout>;
    startTimer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        cursor += 0.5;
        const revealed = Math.floor(cursor);
        if (revealed >= text.length) {
          setOutput(text);
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          return;
        }
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " ") {
            out += "\u00A0";
          } else if (i < revealed) {
            out += ch;
          } else if (i < revealed + 3) {
            out += randomScrambleChar();
          } else {
            out += "\u00A0";
          }
        }
        setOutput(out);
      }, 25);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [triggered, delay, text]);

  return <>{output}</>;
}