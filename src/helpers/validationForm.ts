
export const disableSubmit = (payload: any)=>{
  for (const key in payload) {
    if(payload.isManual){
      if (key !== "isManual" && key !== "requested_by"){
        if (payload[key] === "" || payload[key] === 0) {
          return true;
        }
      }
    }else{
      if (key !== "groupCode" && key !== "coaCode" && key !== "isManual" && key !== "requested_by" && key !== 'vessel'){
        if (payload[key] === "" || payload[key] === 0) {
          return true;
        }
      }
    }
  }
  return false;
}