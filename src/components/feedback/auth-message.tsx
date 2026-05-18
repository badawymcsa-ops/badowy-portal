type AuthMessageProps = {
  message?: string;
};

export function AuthMessage({ message }: AuthMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-bd border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm leading-7 text-rose-100">
      {message}
    </div>
  );
}
