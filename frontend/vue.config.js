var path = require('path')
module.exports = {
    outputDir : path.resolve(__dirname,'../backend/public'),
    css : {
        loaderOptions : {
            sass : {
                prependData : `@import "@/scss/_main.scss";`
            }

        }
    },

}