

function MD5(str) { return hex_md5(str); }

var APPVersion = '1.1.1.1';
var FailStat ='0';
var CfgMode ='STC2';
var LoginTimes = '0';
var ModeCheckTimes = '0';
var ProductName = 'HG8245Q';
var Var_DefaultLang = 'arabic';
var Var_LastLoginLang = 'arabic';
var LockTime = '60';
var LockLeftTime = '0';
var errloginlockNum = '3';
var Language = '';
var locklefttimerhandle;

if(Var_LastLoginLang == '')
{
Language = Var_DefaultLang;
}
else
{
Language = Var_LastLoginLang;
}


document.title = ProductName;


function GetErrHtmlForAr(time)
{
var optTime = parseInt(time);
if(optTime == 2)
{
var errhtml = 'تم إجراء المحاولة مرات عديدة، يرجى إعادة المحاولة بعد ' +  optTime + ' ثواني.';
}
else
{
var optTimestring=String(optTime);
var TimestringLength = optTimestring.length;

if (TimestringLength > 1)
{
var timelastchar = optTimestring.charAt(TimestringLength - 1);
var timeprevlastchar = optTimestring.charAt(TimestringLength - 2);
}

if( (TimestringLength <= 1)
|| ((parseInt(timelastchar) <= 9 && parseInt(timelastchar) >= 3) && parseInt(timeprevlastchar) == 0)
|| (parseInt(timelastchar) == 0 && parseInt(timeprevlastchar) == 1))
{
var errhtml = 'تم إجراء المحاولة مرات عديدة، يرجى إعادة المحاولة بعد ' +  optTime + ' ثواني.';
}
else if(((parseInt(timelastchar) <= 2 && parseInt(timelastchar) >= 0) && parseInt(timeprevlastchar) == 0))
{
var errhtml = 'م إجراء المحاولة مرات عديدة، يرجى إعادة المحاولة بعد ' +  optTime + ' ثانية.';
}
else
{
var errhtml = 'تم إجراء المحاولة مرات عديدة، يرجى إعادة المحاولة بعد ' +  optTime + ' ثانية.';
}
}

return errhtml;
}

function showlefttime()
{
if(LockLeftTime <= 0)
{
window.location="/login.asp";
return;
}

if(LockLeftTime == 1)
{
if(Language == 'arabic')
{
document.getElementById('DivErrPage').dir = 'rtl';
var errhtml = 'تم إجراء المحاولة مرات عديدة، يرجى إعادة المحاولة بعد ' +  LockLeftTime + ' ثانية.';
}
else
{
var errhtml = 'Too many retrials, please retry ' +  LockLeftTime + ' second later.';
}
}
else
{
if(Language == 'arabic')
{
document.getElementById('DivErrPage').dir = 'rtl';
var errhtml = GetErrHtmlForAr(LockLeftTime);
}
else
{
var errhtml = 'Too many retrials, please retry ' +  LockLeftTime + ' seconds later.';
}
}

SetDivValue("DivErrPage", errhtml);
LockLeftTime = LockLeftTime - 1;
}


function setErrorStatus()
{
clearInterval(locklefttimerhandle);
if('1' == FailStat || (ModeCheckTimes >= errloginlockNum))
{
if(Language == 'arabic')
{
document.getElementById('DivErrPage').dir = 'rtl';
var errhtml = 'تم إجراء المحاولة مرات عديدة.';
}
else
{
var errhtml = 'Too many retrials.';
}
SetDivValue("DivErrPage", errhtml);
setDisable('txt_Username',1);
setDisable('txt_Password',1);
setDisable('Submit',1);
}
else if((LoginTimes > 0) && (LoginTimes < errloginlockNum))
{
if(Language == 'arabic')
{
document.getElementById('DivErrPage').dir = 'rtl';
var errhtml = "مجموعة الحساب/كلمة المرور غير صحيحة. يرجى إعادة المحاولة.";
}
else
{
var errhtml = 'Incorrect account/password combination. Please try again.';
}

SetDivValue("DivErrPage", errhtml);
}
else if(LoginTimes >= errloginlockNum && parseInt(LockLeftTime) > 0)
{
if(Language == 'arabic')
{
document.getElementById('DivErrPage').dir = 'rtl';
var errhtml = 'تم إجراء المحاولة مرات عديدة، يرجى إعادة المحاولة بعد ' +  LockLeftTime + ' ثواني.';
}
else
{
var errhtml = 'Too many retrials, please retry ' +  LockLeftTime + ' seconds later.';
}

SetDivValue("DivErrPage", errhtml);
setDisable('txt_Username',1);
setDisable('txt_Password',1);
setDisable('Submit',1);
locklefttimerhandle = setInterval('showlefttime()', 1000);
}
else
{
document.getElementById('loginfail').style.display = 'none';
}
}

function SubmitForm() {
var Username = document.getElementById('txt_Username');
var Password = document.getElementById('txt_Password');
var appName = navigator.appName;
var version = navigator.appVersion;

if (Language == "arabic")
{
if (appName == "Microsoft Internet Explorer")
{
var versionNumber = version.split(" ")[3];
if (parseInt(versionNumber.split(";")[0]) < 6)
{
alert("We cannot support the IE version which is lower than 6.0.");
return false;
}
}

if (Username.value == "") {
alert("حقل الحساب من الحقول المطلوبة.");
Username.focus();
return false;
}

if (Password.value == "") {
alert("حقل كلمة المرور من الحقول المطلوبة.");
Password.focus();
return false;
}
}
else
{

if (appName == "Microsoft Internet Explorer")
{
var versionNumber = version.split(" ")[3];
if (parseInt(versionNumber.split(";")[0]) < 6)
{
alert("We cannot support the IE version which is lower than 6.0.");
return false;
}
}

if (Username.value == "") {
alert("Account is a required field.");
Username.focus();
return false;
}

if (Password.value == "") {
alert("Password is a required field.");
Password.focus();
return false;
}
}

var cookie = document.cookie;
if ("" != cookie)
{
var date=new Date();
date.setTime(date.getTime()-10000);
var cookie22 = cookie + ";expires=" + date.toGMTString();
document.cookie=cookie22;
}

var cnt;

$.ajax({
type : "POST",
async : false,
cache : false,
url : '/asp/GetRandCount.asp',
success : function(data) {
cnt = data;
}
});

var Form = new webSubmitForm();
var cookie2 = "Cookie=body:" + "Language:" + Language + ":" + "id=-1;path=/";
Form.addParameter('UserName', Username.value);
Form.addParameter('PassWord', base64encode(Password.value));
document.cookie = cookie2;
Username.disabled = true;
Password.disabled = true;
Form.addParameter('x.X_HW_Token', cnt);
Form.setAction('/login.cgi');
Form.submit();
return true;
}

function LoadFrame() {


var UserLeveladmin = '1';
clearInterval(locklefttimerhandle);
document.getElementById('txt_Username').focus();

if (Language == "arabic")
{
document.getElementById('arabic').style.color = '#9b0000';
document.getElementById('English').style.color = '#434343';
document.getElementById('account').innerHTML = 'اسم المستخدم';
document.getElementById('Password').innerHTML = 'كلمة المرور';
document.getElementById('button').innerHTML = 'تسجيل الدخول';
document.getElementById('footer').innerHTML = 'حقوق الطبع والنشر محفوظة لدى شركة © Huawei Technologies Co., Ltd 2009-2018. جميع الحقوق محفوظة.';
document.getElementById('stc_dir').style.marginRight="120px";
document.getElementById('account').align = "left";
document.getElementById('Password').align = "left";
document.getElementById('stc_dir').dir = 'rtl';
document.getElementById('footer').dir = 'rtl';
document.getElementById('DivErrPage').dir = 'rtl';

}
else
{
   document.getElementById('arabic').style.color = '#434343';
   document.getElementById('English').style.color = '#9b0000';
   document.getElementById('account').innerHTML = 'Account';
document.getElementById('Password').innerHTML = 'Password';
document.getElementById('button').innerHTML = 'Login';
document.getElementById('footer').innerHTML = 'Copyright © Huawei Technologies Co., Ltd 2009-2018. All rights reserved';
document.getElementById('stc_dir').dir = '';
document.getElementById('footer').dir = '';
document.getElementById('account').align = "right";
document.getElementById('Password').align = "right";
document.getElementById('stc_dir').style.marginRight ='';
 document.getElementById('txt_Username').focus();
}

if ((LoginTimes != null) && (LoginTimes != '') && (LoginTimes > 0)) {
document.getElementById('loginfail').style.display = '';
setErrorStatus();
}
if( "1" == FailStat || (ModeCheckTimes >= errloginlockNum))
{
document.getElementById('loginfail').style.display = '';
setErrorStatus();
}
init();

if((UserLeveladmin == '0'))
{
if (Language == "english")
{
alert("The current user is not allowed to log in.");
return false;
}
}
 }

function init() {
if (document.addEventListener) {
document.addEventListener("keypress", onHandleKeyDown, false);
} else {
document.onkeypress = onHandleKeyDown;
}
}
function onHandleKeyDown(event) {
var e = event || window.event;
var code = e.charCode || e.keyCode;

if (code == 13) {
SubmitForm();
}
}
function onChangeLanguage(language) {
Language = language;
   var Username = document.getElementById('txt_Username').value;
if(language == 'arabic')
{
document.getElementById('arabic').style.color = '#9b0000';
document.getElementById('English').style.color = '#434343';
document.getElementById('account').innerHTML = 'اسم المستخدم';
document.getElementById('Password').innerHTML = 'كلمة المرور';
document.getElementById('button').innerHTML = 'تسجيل الدخول';
document.getElementById('footer').innerHTML = 'حقوق الطبع والنشر محفوظة لدى شركة © Huawei Technologies Co., Ltd 2009-2018. جميع الحقوق محفوظة.';
document.getElementById('stc_dir').style.marginRight="120px";
document.getElementById('account').align = "left";
document.getElementById('Password').align = "left";
document.getElementById('stc_dir').dir = 'rtl';
document.getElementById('footer').dir = 'rtl';
document.getElementById('DivErrPage').dir = 'rtl';

}
else if (language == 'english')
{
document.getElementById('arabic').style.color = '#434343';
document.getElementById('English').style.color = '#9b0000';
document.getElementById('account').innerHTML = 'Account';
document.getElementById('Password').innerHTML = 'Password';
document.getElementById('button').innerHTML = 'Login';
document.getElementById('footer').innerHTML = 'Copyright © Huawei Technologies Co., Ltd 2009-2018. All rights reserved.';
document.getElementById('stc_dir').style.marginRight ='';
document.getElementById('account').align = "right";
document.getElementById('Password').align = "right";
document.getElementById('stc_dir').dir = '';
document.getElementById('footer').dir = '';
document.getElementById('DivErrPage').dir = '';


}
if (((LoginTimes != null) && (LoginTimes != '') && (LoginTimes > 0))
||( "1" == FailStat) || (ModeCheckTimes >= errloginlockNum) )
{
setErrorStatus();
}
}
