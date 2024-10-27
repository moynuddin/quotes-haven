import styles from "./Quotes.module.css";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CheckIcon from "@mui/icons-material/Check";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

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
  const handleInstagram = (quote: TQuote) => {
    const quoteText = encodeURIComponent(`"${quote.quote}" - ${quote.author}`);
    const url = `https://www.instagram.com/create/story?media=&caption=${quoteText}`;

    // Open the URL in a new tab
    window.open(url, "_blank");
  };
  const handleTwitter = (quote: TQuote) => {
    const tweetText = encodeURIComponent(`"${quote.quote}" - ${quote.author}`);
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;

    // Open the URL in a new tab
    window.open(url, "_blank");
  };

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
            <CheckIcon className={styles.copyIcon} sx={{ fontSize: 14 }} />
          ) : (
            <ContentPasteIcon className={styles.copyIcon} />
          )}
        </div>

        <p className={styles.author}>&#45;{quote?.author}</p>
      </div>
      <div className={styles.social}>
        <span
          className={styles.instagram}
          onClick={() => handleInstagram(quote)}
          style={{ color: textColor }}
        >
          <InstagramIcon sx={{ fontSize: 15 }} />
        </span>
        <span
          className={styles.twitter}
          onClick={() => handleTwitter(quote)}
          style={{ color: textColor }}
        >
          <XIcon sx={{ fontSize: 15 }} />
        </span>
      </div>
    </>
  );
};

export default Quote;
