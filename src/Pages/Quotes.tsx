import { useCallback, useEffect, useState } from "react";

import { motion } from "framer-motion";

import styles from "./Quotes.module.css";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import "../App.css";
import Quote from "../Components/Quote";
import { TQuote, TColors } from "../types/quotes.types";
import { getRandomGradient, getTextColor } from "../utility/colors";

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

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://dummyjson.com/quotes?limit=${quotesPerPage}&skip=${
        page * quotesPerPage
      }`
    );
    const quotable = await fetch(
      `https://api.quotable.io/quotes?page=${page}&limit=${quotesPerPage}`
    );
    const { quotes } = await response.json();
    const { results } = await quotable.json();
    console.log(results);

    const initialColors = quotes.reduce((acc: TColors, quote: TQuote) => {
      acc[quote.id] = getRandomGradient();
      return acc;
    }, {});

    setQuotes((prev) => [...prev, ...quotes]);
    setColors((prev) => ({ ...prev, ...initialColors }));
    setIsLoading(false);
  }, [page, quotesPerPage]);

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
                  duration: 0.5,
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
              <Quote
                quote={quote}
                textColor={textColor}
                isCopied={isCopied}
                handleIcon={handleIcon}
                index={index}
              />
            </motion.div>
          );
        })}
        {isLoading && <p>Loading quotes...</p>}
      </div>
    </>
  );
};

export default Quotes;
