const http = require("http");
const port = 3000;

const data = [
    {
        "title": "Amy Schneider’s Jeopardy! Streak Ends at 40 Consecutive Wins and $1.4Million",
        "link": "https://time.com/6142934/amy-schneider-jeopardy-streak-ends/"
    },
    {
        "title": "'Writing With Fire' Shines a Light on All-Women News Outlet",
        "link": "https://time.com/6142628/writing-with-fire-india-documentary/"
    },
    {
        "title": "Moderna Booster May Wane After 6 Months",
        "link": "https://time.com/6142852/moderna-booster-wanes-omicron/"
    },
    {
        "title": "Pressure Mounts for Biden to Nominate a Black Woman to the Supreme",
        "link": "https://time.com/6142743/joe-biden-supreme-court-nominee-black-woman-campaign-promise/ "

    },
    {
        "title": "The James Webb Space Telescope Is in Position—And Now We Wait",
        "link": "https://time.com/6142769/james-webb-space-telescope-reaches-l2/"
    },
    {
        "title": "We Urgently Need a New National COVID-19 Response Plan",
        "link": "https://time.com/6142718/we-need-new-national-covid-19-response-plan/"
    }
]

const server = http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const {method,url} = req;
    if (method==="GET" && url==="/getTimeStories"){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(data));
    }else {
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end("Not Fond");
    }
})

server.listen(port, () => {
    console.log('http://localhost:' + port);
})