import { GoogleService } from "@/lib/services/google";

interface IRequest extends Request {
  json: () => Promise<{ text: string; target: string; }>;
}

export async function POST(request: IRequest) {
  const body = await request.json();
  const {text, target} = body;
  const googleService = GoogleService.getInstance();

  const result = await googleService.translate(text, target);

  return new Response(JSON.stringify({
    result: result,
  }));
}
