'use client';

import RoundedContainedButton from "@/components/buttons/RoundedContainedButton";
import StatusChip from "@/components/chips/StatusChip";
import CustomSearchField from "@/components/inputs/CustomSearchField";
import CustomTable, { CustomTableColumnInterface } from "@/components/tables/CustomTable";
import { TitleDashboardText } from "@/components/text/styledText";
import FlexWrapper from "@/components/wrappers/FlexWrapper";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export interface MsrData {
  msrNumber: string,
  reqBy: string,
  urgency: string,
  creationDate: string,
  status: React.ReactElement,
  action: React.ReactElement,
}

const ProductDelivered: React.FC = () => {

  const router = useRouter();

  const msrHeader: CustomTableColumnInterface[] = [
    {
      id: 'msrNumber',
      label: 'MSR Number',
    },
    {
      id: 'reqBy',
      label: 'Requested By',
    },
    {
      id: 'urgent',
      label: 'Urgent',
    },
    {
      id: 'creationDate',
      label: 'Creation Date',
    },
    {
      id: 'status',
      label: 'Status',
    },
    {
      id: 'aksi',
      label: 'Aksi',
    },
  ]

  const [msrData] = React.useState<MsrData[]>([
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Normal',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Delivered" color={3} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/product-delivered/QFE12345678910')} />
    },
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Very Urgent',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Delivered" color={3} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/product-delivered/QFE12345678910')} />
    },
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Normal',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Delivered" color={3} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/product-delivered/QFE12345678910')} />
    },
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Very Urgent',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Delivered" color={3} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/product-delivered/QFE12345678910')} />
    },
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Normal',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Delivered" color={3} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/product-delivered/QFE12345678910')} />
    },
    {
      msrNumber: 'QFE12345678910',
      reqBy: 'Andi Kumala',
      urgency: 'Very Urgent',
      creationDate: '27 Februari 2023 -  10:35:05',
      status: <StatusChip label="Delivered" color={3} />,
      action: <RoundedContainedButton isDisabled={false} label="View Details" onClick={() => router.push('/product-delivered/QFE12345678910')} />
    },
  ])

  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);

  return(
    <Grid
      container
      direction={'column'}
      sx={{}}
    >

      <TitleDashboardText>Product Delivered</TitleDashboardText>

      {/* content */}
      <FlexWrapper direction="column" justifyContent="center" alignItems="center">
        {
          msrData && msrData.length > 0
          ?
          <Grid
            container
            direction={'column'}
            sx={{
              marginTop: '72px'
            }}
          >
            <CustomSearchField
              placeholder="Search MSR Number"
              isDisabled={false}
              isError={false}
              onChange={(val) => setSearch(val)}
              textHelper=""
              value={search}
            />
            <CustomTable
              column={msrHeader}
              datas={msrData}
              onPageChange={(page) => setPage(page)}
              rowsPerPage={4}
              page={page}
              count={msrData.length}
            />
          </Grid>
          : <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '440px',
              flexGrow: 1
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '22px'
              }}
            >
              {`Oops, it looks like you haven't made a`}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '22px'
              }}
            >
              MATERIAL & SERVICE REQUISITION
            </Typography>
          </Box>
        }
      </FlexWrapper>

    </Grid>
  );
}

export default ProductDelivered