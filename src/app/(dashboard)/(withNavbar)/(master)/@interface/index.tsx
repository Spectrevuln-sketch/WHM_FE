//  Global interface or type for master pages

import { GridColDef } from "@mui/x-data-grid";

export type ColumnTable = GridColDef & {
  field: string;
  headerName: string;
  width: number;
  editable: boolean;
  hide: boolean;
  headerAlign?: string;
  renderCell?: (params: any) => React.JSX.Element
}
export type TInitialData = {
  columns: ColumnTable[],
  initialState:{
    columns: {
      columnVisibilityModel:{
        [filed: string]: boolean
      }
    },
    filter?: any;
  }
  rows?: [];
}