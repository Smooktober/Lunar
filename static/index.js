function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
const form = document.querySelector('form');
const input = document.querySelector('input');


form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        let searchPrefix = getCookie('customSearchEngine') || 'https://duckduckgo.com/?q=';
    
    if (!isUrl(url)) {
        url = searchPrefix + url;
    }
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

        let storedStateUV = localStorage.getItem('checkboxState_uv');
        let storedStateDIP = localStorage.getItem('checkboxState_dip');
        let proxy = (storedStateDIP === 'true') ? 'dip' : 'uv';

        let config = proxy === 'dip' ? __DIP$config : __uv$config;

        let encodedUrl = config.prefix + config.encodeUrl(url);

        let checkboxState = localStorage.getItem('checkboxState_abc');
        if (checkboxState === 'true') {
            let win = window.open();
            win.document.body.style.margin = '0';
            win.document.body.style.height = '100vh';
            let iframe = win.document.createElement('iframe');
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.margin = '0';
            iframe.src = window.location.origin + encodedUrl;
            win.document.body.appendChild(iframe);
        } else {
            window.location.href = encodedUrl;
        }
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || (val.includes('.') && val.substr(0, 1) !== ' ')) return true;
    return false;
}