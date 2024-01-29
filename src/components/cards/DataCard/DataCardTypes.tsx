
export type DataCardDataset = {
  title: string;
  amount: number;
  color: string;
}

export type DataCardType = {
  variant: "primary" | "secondary";
  percentage?: number;
  amount: number;
  title: string;
  image: string;
  data?: DataCardDataset[];
}