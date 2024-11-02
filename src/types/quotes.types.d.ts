export type TQuote = {
  _id: number;
  author: string;
  content: string;
  color: string;
  tags: string[];
};

export type TColors = {
  [key: number]: string;
};
