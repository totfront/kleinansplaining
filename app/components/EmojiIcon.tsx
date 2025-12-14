interface IEmojiIconProps {
  emoji: string;
}

export default function EmojiIcon({ emoji }: IEmojiIconProps) {
  return (
    <span className={"text-3xl inline-block mb-(--space-m)"}>{emoji}</span>
  );
}
