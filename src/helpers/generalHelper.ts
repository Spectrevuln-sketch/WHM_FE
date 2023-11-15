export function isFile(input: File | undefined) {
  if ('File' in window && input instanceof File)
     return true;
  else return false;
}