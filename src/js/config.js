const config = {
    'gsdkweb.dm.com': {
        baseUrl: 'http://gamecatsdk.dm.com/',
        domain: '.dm.com'
    }
}

const configParams = config[location.hostname]

if (configParams) {
    window.baseUrl = configParams.baseUrl
    window.domain = configParams.domain
}
