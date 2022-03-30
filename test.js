window.onload = function() {
	//alert("ページが読み込まれました！")
	scriptHome = location.pathname.replace(/^[\/]?(.*[\\\/])[^\\\/]+$/, "$1").replace(/\%20/g, " ");
	log("script home=" + scriptHome);
	// スクリーンロック
	downCurtain();

	// 吹き出し表示リンクの登録
	//registTooltips("main");
	//registTooltips("alert_button");
	// マウスホバーアニメーション登録
	// ローカルリンクの登録
	registLocalLinks();
	//registLocalLinks();
	registSsoLinks();
	// VPN 経由リンクの登録
	registVPNLinks("vpn");
	// VPN 接続時に実行する関数の登録
	document.onconnectVPN = loginSso;
	//addTestClickListener();
	registEdgeLinks();
}


/*******************************************************************************
 * [概要]
 * sso_frame.onload イベント発生時に下記の処理を行います。
 *
 * 1. SSO リンクを登録します。
 *******************************************************************************/
function onloadSsoFrame() {
	registSsoAllLinks(frames["sso_frame"].document);
}

/*******************************************************************************
 * [概要]
 * ログインフォームをアラート情報の位置に移動します。
 *******************************************************************************/
function downCurtain(id) {
	//
	var outerPane = document.getElementById("curtain");
	if (outerPane) { 
		outerPane.className = "curtain_down";
	}
	//
	scroll(0,0);
}



function addTestClickListener(){
	//alert('addTestClickListener');
	var btn = document.getElementById('ie');
	if(btn.addEventListener) {
		//btn.addEventListener('click', btnClick, false);
		addClickListener(btn, myFunction);
		alert("regist ssoLink href=" + btn.href);
	} else if(btn.attachEvent) {
		btn.attachEvent('onclick', myFunction);
	}
}
function myFunction(element) {
	var localHref = element.getAttribute("href");
	alert (localHref);
	openURLedge(localHref)
  }


function submitLogin1() {
	//try {
		var pm = document.getElementById("login_message");
		pm.innerHTML = "";

		var uid = document.getElementById("uid");
		var pwd = document.getElementById("pwd");
		//
		//if (updateVPNStatus()) {
			alert("loginSso"+uid.value+pwd.value)
			doLoginSso(uid.value, pwd.value);
		//} else {
			//loginVPN(uid, pwd);
			//alert("loginVPN")
		//}
	//} finally {
	//}
	//
	return false;
}


function OnLinkClick(name) {
	target = document.getElementById("output");
	target.innerHTML =  "Hello, " + name;
	url = "microsoft-edge:https://www.google.com/";
	window.open(location.href.replace(/^https://www.google.com, 'googlechromes:'));
	//window.open(url);
	return false;
}

function UserName()
{
var objShell;
var code;
objShell = new ActiveXObject("WScript.Shell");
uname = objShell.ExpandEnvironmentStrings("%USERNAME%");
}



function openURLchrome(url){
	var shell= new ActiveXObject("WScript.Shell");
	shell.run("C:\Program Files\Google\Chrome\Application\chrome.exe:"+url);
}
function openURLie(url){
   window.open(url);
}

function openNewService(url){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET","http://127.0.0.1/atuologin");
    xhr.send();

}
function madehtml(url,local_html){
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var file = fs.CreateTextFile(local_html);
	var uid="aaa";
	var pass="bbb";
	//html生成
    file.Write("<html>\r\n");
    file.Write("<head>\r\n");
    file.Write("<script>\r\n");
    file.Write("window.onload = function(){\r\n");
    file.Write("var form = document.createElement('form');\r\n");
    file.Write("var request = document.createElement('input');\r\n");
    file.Write("form.method = 'POST';\r\n");
    file.Write("form.action = 'http://127.0.0.1/cslogin';\r\n");
    file.Write("var request = document.createElement('input');\r\n");
    file.Write("request.type = 'hidden';\r\n");
    file.Write("request.name = 'sonyLCommonID';\r\n");
    file.Write("request.value = '" + uid + "';\r\n");
    file.Write("form.appendChild(request);;\r\n");
    file.Write("var request2 = document.createElement('input');\r\n");
    file.Write("request2.type = 'hidden';\r\n");
    file.Write("request2.name = 'userPassword';\r\n");
    file.Write("request2.value = '" + pass + "';\r\n");
    file.Write("form.appendChild(request2);;\r\n");
    file.Write("var request3 = document.createElement('input');\r\n");
    file.Write("request3.type = 'hidden';\r\n");
    file.Write("request3.name = 'SSO_URL';\r\n");
    file.Write("request3.value = '" + url + "';\r\n");
    file.Write("form.appendChild(request3);;\r\n");
    file.Write("document.body.appendChild(form);\r\n");
    file.Write("form.submit();\r\n");
    file.Write("};\r\n");
    file.Write("</script>\r\n");
    file.Write("</head>\r\n");
    file.Write("<body></body>\r\n");
    file.Write("</html>");
	file.close();
}

//日付から文字列に変換する関数
function getStringFromDateFileName() {
	var date = new Date();
	var year_str = date.getFullYear();
	//月だけ+1すること
	var month_str = 1 + date.getMonth();
	var day_str = date.getDate();
	var hour_str = date.getHours();
	var minute_str = date.getMinutes();
	var second_str = date.getSeconds();
	var rand_str = Math.random().toString();
	local_html="ssopost.html";

	format_str = 'SSOpost_YYYYMMDDhhmmssrand.html';
	format_str = format_str.replace(/YYYY/g, year_str);
	format_str = format_str.replace(/MM/g, month_str);
	format_str = format_str.replace(/DD/g, day_str);
	format_str = format_str.replace(/hh/g, hour_str);
	format_str = format_str.replace(/mm/g, minute_str);
	format_str = format_str.replace(/ss/g, second_str);
	format_str = format_str.replace(/rand/g, rand_str.slice(2,5));

	return format_str;
   };
var isEdge=false;
function openNewfileEdge(url){
	
	var local_html = getStringFromDateFileName();
	//alert(local_html);
	
	//htmlを生成
	madehtml(url,local_html);
	//新規htmlの完全に閉じるため、0.5秒後、htmlを開く
	setTimeout( function() {
		var shell= new ActiveXObject("WScript.Shell");
		if (isEdge) {
			//edgeで限定して開く
			shell.run("auto.bat");
		}else{
			//規定ブラウザで開く
			shell.run(local_html);
		}
	}, 500 )
	//htmlが一時的に使用するので、5秒後削除する
	setTimeout( function() {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		// DelteFileを実行します。１つ目の引数はファイルパス（ファイル名、フォルダーを含んだファイルへのパス）、
		//２つ目の引数は読み取り専用のファイルでも消してしまうかどうかを示す論理値です。
		fso.DeleteFile(local_html);
	}, 5000 );
}


function openNewfile(url){
	setTimeout( function() {
		alert('aaa');
	}, 30000 );
}

function openURL(url){
	
	var shell= new ActiveXObject("WScript.Shell");
	if (isEdge) {
		shell.run("microsoft-edge:"+url);
	}else{
		shell.run(url);
	}
}
function openNewfileIE(url){
	madehtml(url);
}

function closeWin(){
	var querying = browser.tabs.query({});
	querying.then(logTabs, onError);

	if( (winObj) && (!winObj.closed) ){
	  winObj.close();
	}
	else{
	  alert('サブウインドウは開かれていません');
	}
	winObj = null;
  }

function openNewPythonCMD(url){
	var shell= new ActiveXObject("WScript.Shell");
	//exec.exe --url https://bing.com
	shell.Run("C:\\sony\\PTN\\test_py\\dist\\exec.exe --url=http://127.0.0.1/login --uid=ddd --pwd=eee")	

}

function openNewCsCMD(url){
	var shell= new ActiveXObject("WScript.Shell");
	shell.Run('C:\\Users\\yi.liu\\source\\repos\\ConsoleApp1\\ConsoleApp1\\bin\\Release\\net6.0\\ConsoleApp1.exe https://www.google.com/'); 
}


function openNewjp(url){

}

// function openNew11(url){
// 	var objShell = new ActiveXObject("Shell.Application");
		
	
// 	var wshShell = new ActiveXObject("WScript.Shell");
// 	alert(wshShell)
// 	var edge = wshShell.CreateObject("Shell.Application");
//     // edge.ShellExecute(testurl);
// 	var url = WScript.Arguments(0);
// 	//objShellWindows = objShell.Windows();
// 	//alert("objShellWindows.count"+objShellWindows.count)
// 	if (objShellWindows != null)
// 	{

// 	}

// 	//var ssoWindow=open_win(url,"_blank");
// 	//ssoWindow.push(ssoWindow);
// 	//alert(ssoWindow)
// 	var appWindows = getShellApplication().Windows();
// 	var objFolder = appWindows.NameSpace(0x4);
// 	alert(objFolder)
// var colItems = objFolder.Items();
// 	alert(appWindows.count)
// 	for (i = appWindows.count - 1; 0 <= i; --i) {
// 		alert(i);
// 		try {
// 			var w = appWindows.item(i);
// 			alert(w);
// 			if (!w.fullname.match(/edge.exe$/i)) {
// 				continue;
// 			}
// 			alert("[" + i + "] HWND=" + hwnd + ":" + w.HWND);
// 			if (hwnd == w.HWND) {
// 				alert("find[" + i + "] " + hwnd);
// 				return w;
// 			}
// 		} catch (e) {
// 			la("Failed to find window; [" + e.number + "]" + e.description + "/" + e.message);
// 		}
// 	}

// 	ssoWindow=open_win(url);
// 	//var ssoWindow = openSSOWindow(url);
// 	alert(ssoWindow);
// }

function getShellApplication() {
	if (shellApplication == null) {
		shellApplication = new ActiveXObject("Shell.Application");
	}
	return shellApplication;
}
var shellApplication;


function open_win(url) { 
    var wnd = window.open(url); 

    wnd.addEventListener("load",function(){ 
    if (wnd.find("morning")){ 
     alert("string found"); 
    } 
    else{ 
     alert("string not found"); 
    } })
    return wnd;
} 

function openSSOWindow(url){

	ssoWindow = window.open(url,  "_top" , "" , true )
	//var ssoWindow= new ActiveXObject("WScript.Shell");

	return ssoWindow;
}



function testMy(){
	var name = document.getElementById("name").value
	log(name)
	var ptnVersion = document.getElementById("ptn_version");
	ptnVersion.innerHTML = "V" + name;
	//getPid()
}



/*******************************************************************************
 * [概要]
 * ログインフォームでログインボタン押下時の処理を行います。
 * VPN 接続済の場合は SSO にログイン情報を送信します。
 * VPN 未接続の場合は VPN にログイン情報を送信し、VPN 接続監視を開始します。
 * ログイン情報の送信後、ログインフォームを隠します。
 *
 * return: 常に false
 *******************************************************************************/
 function submitLogin() {
	try {
		var pm = document.getElementById("login_message");
		pm.innerHTML = "";

		var uid = document.getElementById("uid");
		var pwd = document.getElementById("pwd");
		//
		if (updateVPNStatus()) {
			loginSso();
		} else {
			loginVPN(uid, pwd);
		}
	} finally {
	}
	//
	return false;
}


/*******************************************************************************
 * [概要]
 * SSO にログインします。
 *******************************************************************************/
 function loginSso() {
	lockScreen();
	
	var uid = document.getElementById("uid");
	var pwd = document.getElementById("pwd");

	var pm = document.getElementById("login_message");
	pm.innerHTML = "ログイン中 ...";
	debug("[loginSso] " + pm.innerHTML);
	// [2013.11.11] C-SAAF 自動起動 - PTN の SSO 事前認証よりも先に起動させる...
	//launchCSaaf();
	//
	log("[loginSso] SSO Authenticate successful!");
	ssoStatus = true;
	//
	doLoginSso(uid.value, pwd.value);
	log("[loginSso] SSO Login successful!");
	pm.innerHTML = "";
	//
	upCurtain();
	// 2010.12.2 アラート表示 (2016/12/27 自動起動選択性に変更)
	showAlert();
	
	checkSsoAuth(uid.value, pwd.value, function(rtn) {
		alert("[loginSso] SsoAuth return: " + rtn);
		switch (rtn) {
		case SSO_UNEXPECTED_URL:	// [2013/04/12] 正常終了と同じ扱いに変更
		case SSO_CATCH_EXCEPTION:	// [2013/05/20] 正常終了と同じ扱いに変更
		case SSO_SUCCESS:
			log("[loginSso] SSO Authenticate successful!");
			ssoStatus = true;
			//
			doLoginSso(uid.value, pwd.value);
			log("[loginSso] SSO Login successful!");
			pm.innerHTML = "";
			//
			upCurtain();
			// 2010.12.2 アラート表示 (2016/12/27 自動起動選択性に変更)
			showAlert();

			break;
		case SSO_UNAUTHENTICATION:
			pm.innerHTML = "ユーザ名またはパスワードが不正です。";
			document.getElementById("uid").focus();
			error("SSO Loing unauthorization!");
			break;
		case SSO_SUSPEND_ACCOUNT:
			pm.innerHTML = "パスワードが不正です。パートナーネットワーク画面上部[パスワード初期化]をクリックしてください。";
			document.getElementById("uid").focus();
			error("Suspend SSO Account!");
			break;
		case SSO_PASSWORD_EXPIRED:
			pm.innerHTML = "有効期限を過ぎています。パスワードを変更して下さい。";
			error("SSO Loing password expired!");
			fnShellWindowsJ();
			displayChangePasswordWindow(uid.value, pwd.value);
			break;
		case SSO_UNREGIST_PASSWORD_HINT:
			pm.innerHTML = "パスワードのヒントが未設定です。パスワードのヒントを設定して下さい。";
			error("unregistrate of password hint!");
			fnShellWindowsJ();
			displayPasswordHintWindow(uid.value, pwd.value);
			break;
		case SSO_TIMEOUT:
			pm.innerHTML = "タイムアウトしました。(" + rtn + ")";
			document.getElementById("uid").focus();
			error("SSO Loing timeout. " + rtn);
			break;
		default:
			pm.innerHTML = "ログインできませんでした(" + rtn + ")別ユーザーがログインしている可能性があります。<br>別ユーザーをログオフするか、PCを再起動して再度ログインをお試しください。";
			document.getElementById("uid").focus();
			error("SSO Loing unexpected error. " + rtn);
			break;
		}
		fnShellWindowsJ();
		unlockScreen();
	});
}

/*******************************************************************************
 * [概要]
 * 画面全体をロックします。
 *******************************************************************************/
 function lockScreen() {
	var screenShiled = document.getElementById('screen_shield');
	if (screenShiled)
		screenShiled.className = 'screen_lock';

}
