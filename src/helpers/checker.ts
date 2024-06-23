export const StatusChecker = (status: string, expectedStatus: string[]) =>{
  return expectedStatus.filter((itemStatus: string) => status.toLowerCase() === itemStatus.toLowerCase()).length > 0
}

export const PrivilageChecker = (roles: string, statusNow:string): boolean => {
  const roleStatusMap: { [key: string]: string[] } = {
    'WAITING_FOR_VAL_FORM_COST_CONTROL': ['admin', 'cost_control', 'procurement'],
    'WAITING_FOR_VAL_FORM_WAREHOUSE_LOGISTIK': ['admin', 'warehouse', 'procurement'],
    'APPROVE_MSR':['cost_control', 'admin'],
    'WAITING_APPROVE_PM': ['admin',  'project_manager'],
    'WAITING_APPROVE_AM_MANAGER':['admin',  'am_manager'],
    'WAITING_APPROVE_PROCUREMENT': ['admin', 'procurement'],
    'WAITING_AM_MANAGER_APPROVE': ['admin', 'am_manager'],
    'APPROVE_AM_MANAGER': ['admin', 'am_manager'],
    'APPROVE_COST_CONTROL': ['admin', 'cost_control'],
    'APPROVE_PM' : ['admin', 'project_manager'],
    'APPROVE_BOARD_DIRECTOR': ['admin', 'board_of_director'],
  };

    const allowedRoles = roleStatusMap[statusNow];
    return allowedRoles ? allowedRoles.includes(roles) : false;
};