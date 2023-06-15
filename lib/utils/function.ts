import { Language } from "@/lib/utils/constant";

export const blobUrlToBase64 = async (blobUrl: string): Promise<string> => {
  const response = await fetch(blobUrl);
  const data = await response.blob();

  const reader = new FileReader();

  const promise: Promise<string> = new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
  });

  await reader.readAsDataURL(data);

  const base64 = await promise;

  return base64
    .replace("data:audio/webm;base64,", "")
    .replace("data:audio/mp4;base64,", "");
}

export const audioArrayToUrl = (audioArray: number[]): string => {
  const arrayBuffer = new Uint8Array(audioArray).buffer;
  const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });

  return URL.createObjectURL(audioBlob);
}

export const reverseLanguage = (lang: Language): Language => {
  switch (lang) {
    case Language.EN:
      return Language.KO;
    case Language.KO:
      return Language.EN;
  }
}

export const getLanguageCode = (lang: Language): string => {
  switch (lang) {
    case Language.EN:
      return "en-US";
    case Language.KO:
      return "ko-KR";
  }
}
