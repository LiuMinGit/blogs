const headConf = require("./config/headConf");
const pluginsConf = require("./config/pluginsConf");
const navConf = require("./config/navConf");
const sidebarConf = require("./config/sidebarConf");


module.exports = {
    base: "/blogs/",
    title: "那一刻的技术博客",
    description: "刘某人技术博客",
    head: headConf,
    plugins: pluginsConf,
    themeConfig: {
        lastUpdated: '更新时间', // string | boolean
        logo: '/assets/img/nyk.jpg',
        nav: navConf,
        sidebar: sidebarConf,
    }
}