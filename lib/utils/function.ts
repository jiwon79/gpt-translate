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

  return base64.replace("data:audio/webm;base64,", "")
}

export const audioArrayToUrl = (audioArray: number[]): string => {
  const arrayBuffer = new Uint8Array(audioArray).buffer;
  const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });

  return URL.createObjectURL(audioBlob);
}
