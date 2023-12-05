"use client";
export default function PrimaryButton({ text }: { text: string }) {
  return (
    <button className="bg-red-600 text-lg text-white rounded-lg mt-4">
      {text}
    </button>
  );
}
