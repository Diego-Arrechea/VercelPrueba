const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send(`
    <head>
    <title>
        Titulo ashex
    </title>
    <meta charset="utf-8">
    <!--[if IE]> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <![endif]-->
    <meta name="viewport"
        content="width=device-width, minimal-ui, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="description"
        content="The official YTS Retro Movies Torrents website. Download free yify movies torrents in 720p, 1080p and 3D quality. The fastest downloads at the smallest size." />
    <meta name="keywords" content="yts, yify, yify movies, yts movies, yts torrents, yify movies, yify torrents" />
    <meta property="og:title" content="The Official Home of Retro Movies Torrent Download - YTS" />
    <meta property="og:image" content="/assets/images/website/og_yts_logo.png" />
    <meta property="og:description"
        content="The official YTS Retro Movies Torrents website. Download free yify movies torrents in 720p, 1080p and 3D quality. The fastest downloads at the smallest size." />
    <meta property="og:url" content="https%3A%2F%2Fyts.mx%2F" />
    <!--[if IE]> <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" /> <![endif]-->
    <link rel="shortcut icon" href="/assets/images/website/favicon.ico">
    <link rel="apple-touch-icon" sizes="57x57" href="/assets/images/website/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/website/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/website/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/assets/images/website/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/assets/images/website/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/website/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/images/website/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/website/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/website/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/assets/images/website/favicon-160x160.png" sizes="160x160">
    <link rel="icon" type="image/png" href="/assets/images/website/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/assets/images/website/favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="/assets/images/website/favicon-32x32.png" sizes="32x32">
    <meta name="msapplication-TileColor" content="#00a300">
    <meta name="msapplication-TileImage" content="/assets/images/website/mstile-144x144.png">
    <meta name="msapplication-config" content="/assets/images/website/browserconfig.xml">
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml"
        title="YTS - The Official Home of Retro Movie Torrent Downloads" />
    <link rel="stylesheet" type="text/css" href="/css/fonts.css">
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
    <link rel="stylesheet" href="/fonts/BebasNeue-Regular.ttf">

    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "url": "/",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "/browse-movies/{search_term_string}/all/all/0/latest",
                "query-input": "required name=search_term_string"
            }
        }
        </script>
    <script src="/js/launcher.js"></script>
</head>
  `;);
});

app.listen(5000, () => {
    console.log("Running on port http://localhost:5000");
});

// Export the Express API
module.exports = app;