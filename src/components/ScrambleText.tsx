import { useEffect, useRef, useState } from "react";
import { randomScrambleChar } from "../lib/chars";

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export default function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [output, setOutput] = useState<string>(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isHovered) {
      setOutput(text);
      return;
    }

    let revealed = 0;
    let frame = 0;

    intervalRef.current = setInterval(() => {
      frame += 1;
      if (frame % 4 === 0 && revealed < text.length) {
        revealed += 1;
      }
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
          out += " ";
        } else if (i < revealed) {
          out += ch;
        } else {
          out += randomScrambleChar();
        }
      }
      setOutput(out);
    }, 25);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, text]);

  return <span className={className}>{output || "\u00A0"}</span>;
}