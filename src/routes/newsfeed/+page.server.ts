import type { PageServerLoad } from "./$types";
import Parser from 'rss-parser';
import { NEWSFEED_RSS_LINK } from "$env/static/private";

////////////////////////////////////////////////////////////////////////

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load: PageServerLoad = async (event) => {
    try {
        const newsItems = [];
        const parser = new Parser();
        (async () => {
            const feed = await parser.parseURL(NEWSFEED_RSS_LINK);
            console.log(feed.title);
            feed.items.forEach(item => {
              console.log(item.title + ':' + item.link);
              newsItems.push(item);
            });
          })();
        return {
            newsItems
        };
    }
    catch (error) {
        console.error(`Error retrieving news-feed: ${error.message}`);
    }
};
