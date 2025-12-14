interface IEmojiIconProps {
  emoji: string;
  variant?: "success" | "not-found";
}

export default function EmojiIcon({
  emoji,
  variant = "success",
}: IEmojiIconProps) {
  const textColor = variant === "success" ? "text-white" : "text-[#666666]";

  return <span className={`text-3xl ${textColor}`}>{emoji}</span>;
}
