import styles from "./Quotes.module.css";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CheckIcon from "@mui/icons-material/Check";
import InstagramIcon from "@mui/icons-material/Instagram";

import { TQuote } from "../types/quotes.types";

type QuoteProps = {
  quote: TQuote;
  textColor: string;
  isCopied: number | null;
  handleIcon: (quote: TQuote, index: number) => void;
  index: number;
};

const Quote = ({
  quote,
  textColor,
  isCopied,
  handleIcon,
  index,
}: QuoteProps) => {
  return (
    <>
      <p
        className={styles.quote}
        style={{
          color: textColor,
        }}
      >
        &quot; {quote?.quote}&quot;
      </p>
      <div className={styles.footer} style={{ color: textColor }}>
        <div
          className={styles.copy}
          onClick={() => handleIcon(quote, index)}
          aria-live="polite"
          title="copy"
        >
          {isCopied === index ? (
            <CheckIcon className={styles.copyIcon} />
          ) : (
            <ContentPasteIcon className={styles.copyIcon} />
          )}
        </div>

        <p className={styles.author}>&#45;{quote?.author}</p>
      </div>
      <div className={styles.social}>
        <InstagramIcon sx={{ fontSize: 15 }} />
      </div>
    </>
  );
};

export default Quote;
