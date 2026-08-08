export default function MessageBubble({ content }: { content: string }) {
  return (
    <div
      className="self-end max-w-[88%] rounded-[18px_18px_5px_18px] px-[18px] py-3 text-[14.5px] leading-[1.55] sm:max-w-[80%] lg:max-w-[70%]"
      style={{
        background: "rgba(255,255,255,0.055)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        color: "rgba(255,255,255,0.88)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      {content}
    </div>
  );
}
