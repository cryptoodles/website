// Imports
import Link from "next/link"; // Local routing
import Layout from "@components/Layout"; // Layout wrapper
import { sampleDecks } from "@utils/constants"; // Bags to render
import styles from "@styles/pages/Home.module.scss"; // Styles

// Types
import type { ReactElement } from "react";

export default function Home(): ReactElement {
  // Quicklinks to render
  const quicklinks: Record<string, string>[] = [
    { name: "OpenSea", url: "https://opensea.io/collection/adventure-cards" },
    {
      name: "Twitter",
      url: "https://twitter.com/0xadventures",
    },
    {
      name: "Contract",
      url: "https://etherscan.io/address/0x329Fd5E0d9aAd262b13CA07C87d001bec716ED39",
    },
  ];

  const mapToObj = (m) => {
    return Array.from(m).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  };
  /**
   * Selects 3 random bags from defaultBags
   * @returns {Record<string, string>[]} randomized bags
   */
  const getRandomThreeDecks = () => {
    const shuffled = Object.entries(sampleDecks).sort(() => 0.5 - Math.random());
    // return mapToObj(new Map(shuffled.slice(0, 3)));
    return shuffled.slice(0, 3);
  };

  return (
    <Layout>
      <div>
        <div className={styles.home__cta}>
          {/* CTA title */}
          <h1>Adventure Cards</h1>

          {/* Quicklinks */}
          <ul>
            {quicklinks.map(({ name, url }, i) => {
              return (
                <li key={i}>
                  {url.startsWith("/") ? (
                    // If link to local page use Link
                    <Link href={url}>
                      <a>{name}</a>
                    </Link>
                  ) : (
                    // Else, redirect in new tab
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {name}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* CTA Description */}
          <p>
            Adventure Cards is a collection of randomized trading cards generated and stored on chain.
            <br /> Attributes, art, and game mechanics are intentionally
            omitted for others to interpret and build. <br />
            Feel free to use Adventure Cards in any way you want.
          </p>
        </div>

        {/* Rendering sample decks */}
        <div className={styles.home__feature}>
          <span>Example Decks:</span>
          { getRandomThreeDecks().map(a => (

            <a
              href={`https://opensea.io/assets/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7/${a[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              key={a[0]}
              className={styles.home__bag}
            >
              <div className={styles.home__bag_attributes}>
                <span>#{a[0]}</span>
                <div dangerouslySetInnerHTML={{__html: a[1]["image"]}}>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
