interface IEmojiIconProps {
  emoji: string;
  variant?: "success" | "not-found";
}

export default function EmojiIcon({ emoji }: IEmojiIconProps) {
  return <span className={"text-3xl mb-l"}>{emoji}</span>;
}
