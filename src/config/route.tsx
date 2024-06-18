'use client';
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
type Iicons = {
  [icon: string]: string | StaticImport;
}
export interface ISidebarItem {
  id?: number;
  name: string;
  label: string;
  icon?: React.ReactNode;
  route?: string;
  children?: ISidebarItem[];
}
export const menu = (dashboardIcons: Iicons) =>{
  const sidebarItem : ISidebarItem[] = [
    {
      name:'dashboard',
      label: 'Dashboard',
      icon: <Image src={dashboardIcons.dashboardIcon} alt='dashboard-icon' width={24} height={24} />,
      route: '/dashboard',
    },
    {
      name:'msr',
      label: 'MSR',
      icon: <Image src={dashboardIcons.createMsrIcon} alt='create-msr-icon' width={24} height={24} />,
      route: '/material-service-request'
    },
    {
      name:'purchase-request',
      label: 'Purchase Request',
      icon: <Image src={dashboardIcons.createMsrIcon} alt='create-msr-icon' width={24} height={24} />,
      route: '/purchase-request'
    },
    {
      name:'purchase-order',
      label: 'Purchase Order',
      icon: <Image src={dashboardIcons.createMsrIcon} alt='create-msr-icon' width={24} height={24} />,
      route: '/purchase-order'
    },
    {
      name:'soq',
      label: 'SOQ',
      icon: <Image src={dashboardIcons.deliveringProductIcon} alt='delivering-product-icon' width={24} height={24} />,
      route: '/soq'
    },
    // {
    //   name:'delivered',
    //   label: 'Product Delivered',
    //   icon: <Image src={dashboardIcons.productDeliveredIcon} alt='product-delivered-icon' width={24} height={24} />,
    //   route: '/product-delivered'
    // },
    {
      name: 'inventory',
      label: 'Inventory',
      icon: <Image src={dashboardIcons.inventoryIcon} alt='inventory-icon' width={24} height={24} />,
      route: '/inventory'
    },
    {
      name: 'master',
      label: 'Master',
      icon: <Image src={dashboardIcons.createMsrIcon} alt='create-msr-icon' width={24} height={24} />,
      children:[
        {
          id: 1,
          name: 'master_inventory',
          label: 'Master Inventory',
          route: '/master-inventory',
        },
        {
          id: 2,
          name: 'master_vendor',
          label: 'Master Vendor',
          route: '/master-vendor',
        },
        {
          id: 3,
          name: 'master_budgetcode',
          label: 'Master Budget Code',
          route: '/master-budget-code',
        },
        {
          id: 4,
          name: 'master_groupcode',
          label: 'Master GroupCodes',
          route: '/master-group-code',
        },
        {
          id: 5,
          name: 'master_jasa',
          label: 'Master Jasa',
          route: '/master-jasa',
        },
        {
          id: 6,
          name: 'master_departement',
          label: 'Master Departement',
          route: '/master-departement',
        },
        {
          id: 7,
          name: 'master_coa',
          label: 'Master Coa',
          route: '/master-coa',
        },

      ]
    },
  ];

  return {
    sidebarItem
  }
}