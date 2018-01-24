var url = window.location.href;
var appConfigUrl = url.substring(0, url.lastIndexOf('/')) + '/app.json';
var installerUrl = 'https://dl.openfin.co/services/download?fileName=Autilla-installer&supportEmail=support@autilla.com&config=' + appConfigUrl;
window.location.replace(installerUrl);
