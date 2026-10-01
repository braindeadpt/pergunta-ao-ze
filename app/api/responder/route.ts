import { NextResponse } from "next/server";
import { getEngine } from "@/lib/engine";

export async function POST(request: Request) {
  let pergunta: unknown;
  try {
    const body = await request.json();
    pergunta = body?.pergunta;
  } catch {
    return NextResponse.json({ erro: "Pedido inválido." }, { status: 400 });
  }

  if (typeof pergunta !== "string" || pergunta.trim().length === 0) {
    return NextResponse.json({ erro: "Escreve a tua pergunta." }, { status: 400 });
  }

  if (pergunta.length > 500) {
    return NextResponse.json(
      { erro: "A pergunta é demasiado longa." },
      { status: 400 }
    );
  }

  const resultado = await getEngine().responder(pergunta.trim());
  return NextResponse.json(resultado);
}
