import Image from "next/image";

const ChatLogo = ({ dim, dimL }) => {
  return (
    <div
      style={{
        backgroundColor: "#0000FF",
        width: dimL,
        height: dimL,
        borderRadius: "50%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image src="/chat.png" width={dim} height={dim} alt="chat" />
      </div>
    </div>
  );
};
export default ChatLogo;
