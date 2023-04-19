import React, { useState, useEffect, useRef, useCallback } from "react";

import { Summary, TextContainer, Transcript } from "./components";
import "./styles.css";

const HomePage = () => {
  const [summary, setSummary] = useState([]);
  const [conversation, setConversation] = useState<string>("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const originalTranscriptRef = useRef<string>("");
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getSummary = async () => {
      const response = await fetch("/src/assets/summary.json");
      const data = await response.json();
      setSummary(data);
    };

    const getConversation = async () => {
      const response = await fetch("/src/assets/transcript.json");
      const data = await response.json();
      console.log(data?.transcript);
      originalTranscriptRef.current = data?.transcript?.replaceAll(
        ' "\n\n',
        '"<br/> <br/>'
      );
      setConversation(originalTranscriptRef.current);
    };

    getSummary();
    getConversation();
  }, []);

  const handleSummaryItemHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  const handleSummaryItemClick = useCallback((ranges: [number, number][]) => {
    let transcript = originalTranscriptRef.current;

    ranges.forEach((range) => {
      const [start, end] = range;
      const selectedText = transcript?.slice(start, end);
      if (transcript && selectedText)
        transcript = transcript?.replace(
          selectedText,
          `<span class="highlighted-text">${selectedText}</span>`
        );
    });

    setConversation(transcript);
  }, []);

  const scrollToFirstHighlightedText = useCallback(() => {
    const firstHighlightedText =
      transcriptRef.current?.querySelector(".highlighted-text");
    if (firstHighlightedText) {
      firstHighlightedText.scrollIntoView();
    }
  }, [conversation]);

  useEffect(() => {
    scrollToFirstHighlightedText();
  }, [scrollToFirstHighlightedText]);

  return (
    <div className="page-container">
      <TextContainer title="Summary">
        <Summary
          items={summary}
          hoveredIndex={hoveredIndex}
          onSummaryItemHover={handleSummaryItemHover}
          onSummaryItemClick={handleSummaryItemClick}
        />
      </TextContainer>
      <TextContainer title="Conversation">
        <Transcript conversation={conversation} transcriptRef={transcriptRef} />
      </TextContainer>
    </div>
  );
};

export default HomePage;
