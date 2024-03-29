import utils from '~/assets/js/utils.js';

export default function (context) {
    context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
    var isPCEnv = utils.isPCEnv(context.userAgent);

    if (!isPCEnv && !context.req.url.startsWith("/mobile")) {
        context.redirect('http://10.17.2.1:5000/mobile');
    }
}
