import { redirect } from 'next/navigation';

// Multilanguage removed — all locale URLs redirect to the root page
export default function LocalePage() {
  redirect('/');
}
