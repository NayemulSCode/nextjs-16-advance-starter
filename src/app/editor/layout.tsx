// Puck ships its own full-screen UI, so the editor bypasses site chrome.
export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
