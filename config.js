require('dotenv').config();

export default {
    siteName: process.env.SITE_NAME || "A Software Crafter's Journey",
    siteDescription: process.env.SITE_DESCRIPTION || "A Software Crafter's Journey",
    siteUrl: process.env.SITE_URL || 'https://a-software-crafter-s-journey.now.sh',
    contributionUrl: process.env.CONTRIBUTION_URL || 'https://github.com/ismailnguyen/a-software-crafter-s-journey/tree/master/articles',
    companyName: process.env.COMPANY_NAME || 'Ismail NGUYEN',
    companyUrl: process.env.COMPANY_URL || 'https://ismailnguyen.com',
    twitterUsername: process.env.TWITTER_USERNAME || 'ishmaa_el',
    progressBarColor: process.env.PROGRESS_BAR_COLOR || '#3B8070',
    bodyBackgroundColor: process.env.BODY_BACKGROUND_COLOR || '#f5f5f5',
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID
};