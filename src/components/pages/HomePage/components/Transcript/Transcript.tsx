import React from "react";

interface TranscriptProps {
  conversation: string;
  transcriptRef: React.RefObject<HTMLDivElement>;
}

const Transcript = ({ conversation, transcriptRef }: TranscriptProps) => {
  return (
    <div className=" transcript-container" ref={transcriptRef}>
      <div
        className="content-container"
        dangerouslySetInnerHTML={{ __html: conversation }}
      />
    </div>
  );
};

export default Transcript;
