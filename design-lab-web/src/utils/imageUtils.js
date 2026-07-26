export function getVersionedImage(url, updatedAt) {
  if (!url) return null;
  if (!updatedAt) return url;
  return `${url}?v=${new Date(updatedAt).getTime()}`;
}
