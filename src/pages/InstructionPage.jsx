import WritingInstruction from "../components/WritingInstruction";
import ContentSuggestions from "../components/ContentSuggestions";

const InstructionPage = () => {
  return (
    <div
      className="relative z-10 min-h-screen flex justify-center items-start pt-28 px-4 pb-12 text-white"
      style={{
        backgroundColor: "#121212",
        fontFamily: "'Tiro Bangla', 'Roboto', sans-serif",
      }}
    >
      <div className="w-full max-w-3xl bg-gray-800/80 rounded-xl p-8 shadow-lg backdrop-blur-sm space-y-10">
        <WritingInstruction />
        <ContentSuggestions />
      </div>
    </div>
  );
};

export default InstructionPage;
