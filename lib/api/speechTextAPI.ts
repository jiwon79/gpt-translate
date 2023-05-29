import request, { BasicResponse } from "./index";

interface STTResponse extends BasicResponse {
  translate: string;
}

interface TTSResponse extends BasicResponse {
  audioContent: string;
}

const speechTextAPI = {
  stt: async (audio: string): Promise<STTResponse> => request.post(`/api/stt`,
    {audio: audio},
    {'Content-Type': 'application/pdf'},
  ),
  tts: async (text: string): Promise<TTSResponse> => request.post(`/api/tts`,
    {text: text},
  ),
}

export default speechTextAPI;
