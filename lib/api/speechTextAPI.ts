import request, { BasicResponse } from "./index";

interface STTResponse extends BasicResponse {
  translate: string;
}

interface TTSResponse extends BasicResponse {
  audioContent: {
    type: string;
    data: number[];
  };
}

interface TranslateResponse extends BasicResponse {
  result: string;
}

const speechTextAPI = {
  stt: async (audio: string): Promise<STTResponse> => request.post(`/api/stt`,
    {audio: audio},
    {'Content-Type': 'application/pdf'},
  ),
  tts: async (text: string): Promise<TTSResponse> => request.post(`/api/tts`,
    {text: text},
  ),
  translate: async (text: string, lang: string): Promise<TranslateResponse> => request.post(`/api/translate`,
    {text: text, target: lang},
  ),
}

export default speechTextAPI;
