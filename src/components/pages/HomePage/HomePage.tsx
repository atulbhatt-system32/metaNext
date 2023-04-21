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
      const response = await fetch(
        "https://file.notion.so/f/s/c4815b33-b4ec-4ac7-b517-c86a8c01d2be/summary.json?id=6b5a85bc-69ff-45ce-b6c1-4284e8eade60&table=block&spaceId=059c2a1b-35a9-4d47-9de6-42632cad988b&expirationTimestamp=1682089467177&signature=514JSggPOsGaQOF8OVJheTtu3gvgEcgxDnPDkDPdCbs&downloadName=summary.json"
      );
      const data = await response.json();
      setSummary(data);
    };

    const getConversation = async () => {
      const response = await fetch(
        "https://file.notion.so/f/s/8709d132-f76d-4af6-a708-ab964f072c5e/transcript.json?id=40e8c14b-e671-44a2-a026-3727ead04366&table=block&spaceId=059c2a1b-35a9-4d47-9de6-42632cad988b&expirationTimestamp=1682089489257&signature=phdS56X0S0gxwhPDeOhC98CiYM8w5wCd2vlQ7pHdaNI&downloadName=transcript.json"
      );
      const data = await response.json();

      originalTranscriptRef.current = data?.transcript;
      let _transcript = data?.transcript?.replaceAll('"\n\n', '"<br/> <br/>');

      setConversation(_transcript);
    };

    getSummary();
    getConversation();
  }, []);

  const handleSummaryItemHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  const handleSummaryItemClick = useCallback((ranges: [number, number][]) => {
    let transcript = originalTranscriptRef.current;
    console.log(transcript);
    ranges.forEach((range, index) => {
      const [start, end] = range;
      const selectedText = originalTranscriptRef?.current?.slice(start, end);

      if (transcript && selectedText) {
        transcript = transcript
          ?.replace(
            selectedText,
            `<span class="highlighted-text">${selectedText}</span>`
          )
          ?.replaceAll('"\n\n', '"<br/> <br/>');
      }
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
