import { useCallback, useEffect, useState } from "react";
import chroma from "chroma-js";
import { motion } from "framer-motion";

import styles from "./Quotes.module.css";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CheckIcon from "@mui/icons-material/Check";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import "../App.css";

type TQuote = {
  id: number;
  author: string;
  quote: string;
  color: string;
};

type TColors = {
  [key: number]: string;
};

const Quotes = () => {
  const [quotes, setQuotes] = useState<TQuote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [colors, setColors] = useState<{
    [key: number]: string;
  }>({});
  const [page, setPage] = useState(0);
  const quotesPerPage = 10;

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const getRandomColor = useCallback(() => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  const getRandomGradient = useCallback(() => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const color3 = getRandomColor();
    return `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`;
  }, [getRandomColor]);

  const getTextColor = useCallback((bgColor: string) => {
    const colorArray = bgColor.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/g);

    if (colorArray && colorArray.length > 0) {
      const firstColor = colorArray[0];

      const baseColor = chroma(firstColor);

      const contrastingColor = baseColor.set("hsl.h", "+180").hex();

      const isLight = baseColor.luminance() > 0.5;

      return isLight ? contrastingColor : "#ffffff";
    }
    return "#ffffff";
  }, []);

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://dummyjson.com/quotes?limit=${quotesPerPage}&skip=${
        page * quotesPerPage
      }`
    );
    const { quotes } = await response.json();
    console.log(quotes);

    const initialColors = quotes.reduce((acc: TColors, quote: TQuote) => {
      acc[quote.id] = getRandomGradient();
      return acc;
    }, {});

    setQuotes((prev) => [...prev, ...quotes]);
    setColors((prev) => ({ ...prev, ...initialColors }));
    setIsLoading(false);
  }, [page, quotesPerPage, getRandomGradient]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.offsetHeight &&
      !isLoading
    ) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleIcon = async (quote: TQuote, index: number) => {
    try {
      setIsCopied(index);
      await navigator.clipboard.writeText(quote?.quote);
      setTimeout(() => {
        setIsCopied(null);
      }, 2000);
    } catch (error) {
      setIsCopied(null);
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.navWrapper}>
        <p className={styles.logo}>Quotes Haven</p>
        <div onClick={toggleTheme}>
          {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
        </div>
      </div>
      <div className={styles.wrapper}>
        {quotes?.map((quote: TQuote, index: number) => {
          const textColor = getTextColor(colors[quote.id]);
          return (
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
                scale: 1.25,
                transition: {
                  duration: 1,
                },
              }}
              viewport={{
                once: true,
              }}
              key={index}
              className={styles.quotesContainer}
              style={{
                backgroundImage: colors[quote?.id],
                backgroundSize: "400% 400%", // Ensure size matches the animation
                backgroundPosition: "0% 50%",
              }}
            >
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
            </motion.div>
          );
        })}
        {isLoading && <p>Loading more quotes...</p>}
      </div>
    </>
  );
};

export default Quotes;
