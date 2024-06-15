export const StatusChecker = (status: string, expectedStatus: string[]) =>{
  return expectedStatus.filter((itemStatus: string) => status.toLowerCase() === itemStatus.toLowerCase()).length > 0
}