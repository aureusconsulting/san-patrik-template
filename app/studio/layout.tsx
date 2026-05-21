// Minimal layout for the Studio route — bypasses the site body styles
// and prevents tracking scripts from loading inside the editor.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
