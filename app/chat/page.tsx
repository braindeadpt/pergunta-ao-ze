import { Suspense } from "react";
import type { Metadata } from "next";
import Chat from "@/components/Chat";

export const metadata: Metadata = {
  title: "Falar com o Zé",
};

export default function ChatPage() {
  return (
    <div className="flex min-h-[calc(100vh-180px)] flex-col">
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 text-center text-stone-400">
            A carregar…
          </div>
        }
      >
        <Chat />
      </Suspense>
    </div>
  );
}
