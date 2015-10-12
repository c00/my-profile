angular.module('settings', [])

.constant('settings', {environment:'development',logLevel:'debug',apiBase:'http://localhost/covlelogin/web/api/',app:'nextdoorteacher',googleMapsApiKey:'AIzaSyCwiNnH990mMHJ8oK_YErFxeQWKroVR-U4',debug:true,pictureFolder:'img/profiles/',subjectPictureFolder:'img/subjects/',oAuth:{google:{endpoint:'https://accounts.google.com/o/oauth2/auth',clientId:'705441731416-iqd7ubbi7so12k4rvj5pr0frdpoqfo4p.apps.googleusercontent.com',scope:'email profile',state:'nextdoorteacher1',redirectUri:'http://localhost/nextdoorteacher/web/oAuthRedirect',responseType:'code',approvalPrompt:'force'}}})

;