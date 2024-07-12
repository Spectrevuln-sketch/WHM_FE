'use server';
import { ISidebarItem } from '@/config/route';
import {AccessControl} from 'accesscontrol';

interface IGrant {
  [role:string]: IMenu;
}

interface IMenu {
    [menu: string]:{
      [type: string]: string[];
    };
}
export async function configurePermissions(role:string, menuObj:IMenu) {
  // ===== Konfigurasi grant permission berdasarkan privilage dari respons API ======
  const ac = new AccessControl();
  const granted: IGrant = {
    [role]: menuObj
  }
  ac.lock().setGrants(granted);
  return ac.getGrants();
}

export async function checkGrantAccess(role:string, sidebarItems:ISidebarItem[]) {
  const ac = new AccessControl();

  const permittedSidebarItems = sidebarItems.filter(item => {
    if (role) {
      // Check if user has permission to access the item
      return ac.can(role).read(item.name).granted;
    } else {
      // If user is not authenticated, hide all sidebar items
      return false;
    }
  });
  return permittedSidebarItems
}