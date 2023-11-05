export default function parseToDriveUrl(url:string){
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const urlImgDownload = 'https://drive.google.com/uc?export=download&id';
    const match = url.match(regex);
    if(!match) return url;
    const driveId = match[1];
    const urlToUse = `${urlImgDownload}=${driveId}`;
    return urlToUse;
}