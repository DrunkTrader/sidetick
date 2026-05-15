"use client";

type OTPInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function OTPInput({ value, onChange }: OTPInputProps): React.JSX.Element {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-full border border-[rgba(0,200,150,0.2)] bg-transparent px-4 py-2"
      inputMode="numeric"
      maxLength={6}
      aria-label="OTP"
    />
  );
}
