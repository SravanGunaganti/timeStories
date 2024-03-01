const https = require('https');

const url = 'https://time.com';

function fetchWebsite(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                resolve(data);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function scrapeWebsite() {
    try {
        const data = await fetchWebsite(url);

        const latestStories = [];
        const startMarker = '<div class="partial latest-stories"';
        const endMarker = '</ul>';

        const startIndex = data.indexOf(startMarker);
        const endIndex = data.indexOf(endMarker, startIndex);
        

        if (startIndex !== -1 && endIndex !== -1) {
            const latestStoriesHtml = data.substring(startIndex, endIndex);
            const items = latestStoriesHtml.split('<li class="latest-stories__item">');
            items.shift()
            items.forEach(item => {
                const titleStart = item.indexOf('<h3 class="latest-stories__item-headline">') + '<h3 class="latest-stories__item-headline">'.length;
                const titleEnd = item.indexOf('</h3>', titleStart);
                const title = item.substring(titleStart, titleEnd).trim();

                const timestampStart = item.indexOf('<time class="latest-stories__item-timestamp">') + '<time class="latest-stories__item-timestamp">'.length;
                const timestampEnd = item.indexOf('</time>', timestampStart);
                const timestamp = item.substring(timestampStart, timestampEnd).trim();

                const readTimeStart = item.indexOf('<div class="time-to-read">') + '<div class="time-to-read">'.length;
                const readTimeEnd = item.indexOf('</div>', readTimeStart);
                const readTime = item.substring(readTimeStart, readTimeEnd).trim();

                const linkStart = item.indexOf('<a href="') + '<a href="'.length;
                const linkEnd = item.indexOf('">', linkStart);
                const link = url+item.substring(linkStart, linkEnd);

                latestStories.push({ title, timestamp, readTime, link });
            });
            console.log(latestStories)
            return latestStories
        } else {
            return []
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports=scrapeWebsite;