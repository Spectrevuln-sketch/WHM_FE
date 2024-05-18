export function isFile(input: File | undefined) {
  if (typeof window !== 'undefined' && 'File' in window && input instanceof File)
     return true;
  else
    return false;
}