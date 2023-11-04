'use client';

import MasterBarangTable from "@/components/tables/MasterBarangTable";
import MasterInventoryTable from "@/components/tables/MasterInventoryTable";
import MasterUserTable from "@/components/tables/MasterUserTable";
import MasterVendorTable from "@/components/tables/MasterVendorTable";
import SuperAdminDashboardTabs from "@/components/tabs/SuperAdminDashboardTabs";
import { TitleDashboardText } from "@/components/text/styledText";
import { AccountCircle, Business, Inventory } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";

const Dashboard = () => {

  const [activeTab, setActiveTab] = React.useState(0)

  React.useEffect(() => {
    //
  }, [])

  return(
    <Grid
      container
      direction={'column'}
      sx={{
      }}
    >

      {/* title */}
      <TitleDashboardText>Setting Super Admin</TitleDashboardText>

      {/* tabs */}
      <SuperAdminDashboardTabs
        activeTab={activeTab}
        onChangeTab={(val) => setActiveTab(val)}
        tabs={[
          {
            icon: <AccountCircle />,
            title: 'MASTER USERS',
            subtitle: 'See Users'
          },
          {
            icon: <Inventory />,
            title: 'MASTER BARANG',
            subtitle: 'See Barang'
          },
          {
            icon: <Inventory />,
            title: 'MASTER INVENTORY',
            subtitle: 'See Inventory'
          },
          {
            icon: <Business />,
            title: 'MASTER VENDOR',
            subtitle: 'See Vendor'
          },
        ]}
      />

      {/* tables */}
      {activeTab === 0 && <MasterUserTable />}
      {activeTab === 1 && <MasterBarangTable />}
      {activeTab === 2 && <MasterInventoryTable />}
      {activeTab === 3 && <MasterVendorTable />}

    </Grid>
  );
}

export default Dashboard