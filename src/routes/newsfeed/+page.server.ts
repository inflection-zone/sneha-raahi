import type { PageServerLoad } from "./$types";
import Parser from 'rss-parser';
import { RAAHI_UPDATES_NEWSFEED_RSS_LINK, COMMUNITY_UPDATES_NEWSFEED_RSS_LINK } from "$env/static/private";
import hrt from 'human-readable-time';

////////////////////////////////////////////////////////////////////

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load: PageServerLoad = async (event) => {
    try {
        const newsItems = [];
        const newsFeeds = [];
        const parser = new Parser();
          const feed = await parser.parseURL(RAAHI_UPDATES_NEWSFEED_RSS_LINK);
          console.log(feed.title);
          feed.items.forEach(item => {
            newsItems.push({
              title: item.title,
              link: item.link,
              pubDate: hrt(new Date(item.pubDate), '%relative% ago'),
              description: item.description,
              source: item.source
            });
          });

          const newsfeed = await parser.parseURL(COMMUNITY_UPDATES_NEWSFEED_RSS_LINK);
          console.log(newsfeed .title);
          newsfeed .items.forEach(item => {
            newsFeeds.push({
              title: item.title,
              link: item.link,
              pubDate: hrt(new Date(item.pubDate), '%relative% ago')
            });
          });
          return {
            newsItems,
            newsFeeds
        };
    }
    catch (error) {
        console.error(`Error retrieving news-feed: ${error.message}`);
    }
};
