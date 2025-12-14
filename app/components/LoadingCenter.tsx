export default function LoadingCenter({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex items-center justify-center min-h-[8rem]">
      <div className="text-center">
        <p className="text-[#666666] dark:text-[#999999]">{message}</p>
      </div>
    </div>
  );
}
