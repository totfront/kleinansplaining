import Link from "next/link";

interface IBackButtonProps {
  href: string;
  label?: string;
}

export default function BackButton({
  href,
  label = "Back to search",
}: IBackButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-[#666666] hover:text-[#406825] transition-colors mb-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      <span>{label}</span>
    </Link>
  );
}
