"use client";
export default function PrimaryButton({
  text,
  callback,
}: {
  text: string;
  callback?: () => void;
}) {
  return (
    <button
      onClick={callback}
      className="bg-red-600 text-lg text-white rounded-lg mt-4 px-2"
    >
      {text}
    </button>
  );
}
