// Load them google fonts before starting...
window.WebFontConfig = {
    google: {
        families: ["Pangolin", "Neucha"],
    },
    active() {},
};

/* eslint-disable */
// include the web-font loader script
(function () {
    const wf = document.createElement("script");
    wf.src = `${
        document.location.protocol === "https:" ? "https" : "http"
    }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = "text/javascript";
    wf.async = "true";
    const s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(wf, s);
})();
/* eslint-enabled */

var fontStyle = {
    default: {
        fontFamily: "Neucha",
        fontSize: 50,
        fill: "black",
        align: "center",
    },
    sub: {
        fontFamily: "Neucha",
        fontSize: 80,
        fill: "black",
        align: "center",
    },
    title: {
        fontFamily: "Neucha",
        fontSize: 100,
        fill: "black",
        align: "center",
    },
};
