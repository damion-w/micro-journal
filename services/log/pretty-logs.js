function prettyLog(title, str) {
    if (process.env.NODE_ENV === 'dev') {
        console.log(`\n************************************************************`);
        console.log(title)
        console.log(`************************************************************`);
        if (str) {
            console.log(str)
            console.log(`------------------------------------------------------------`);
        }
    }
}

module.exports = prettyLog