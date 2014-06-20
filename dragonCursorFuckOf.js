function circle_text() 
{
    // 文字列を区切り、逆順に直し、連結する
    var msg = 'I thought what I' + 'd do was, I' + 'd pretend I was one of those deaf-mutes'.split('').reverse().join('');
    // フォント指定
    var font = 'verdana,arial';
    // 文字サイズ
    var size = 3;
    // 文字色
    var color = 'white';
    // 動作速度
    var speed = .3;
    var rotation = -.1;

    /* ブラウザ判別 */
    // Netscape
    var ns = (document.layers);
    // IEとか
    var ie = (document.all);
    // FireFoxやNetscape6~（chromeはここに含まれる）
    var dom = document.getElementById;

    // 即座に中心座標を算出
    var halfSizeX = window.innerWidth ? window.innerWidth / 2: $(window).width() / 2;
    var halfSizeY = window.innerHeight ? window.innerHeight / 8: $(window).height() / 8;

    // メッセージ分割
    msg = msg.split('');
    // メッセージ長
    var n = msg.length;
    var a = size * 13;
    var currStep = 0;
    var ymouse = halfSizeY;
    var xmouse = halfSizeX;
    var props = "<font face=" + font + " size=" + size + " color=" + color + ">";

    /* IE時の処理 */
    if (ie) window.pageYOffset = 0;

    /* Netscape時の処理 */
    if (ns)
    {
        for (i = 0; i < n; i++) document.write('<layer name="nsmsg' + i + '" top=0 left=0 height=' + a + ' width=' + a + '><center>' + props + msg[i] + '</font></center></layer>');
    }
    /* 大抵ここに入る(変なブラウザでない限り)	*/
    else if ( ie || dom )
    {
    // 絶対位置で指定し、z-indexプロパティで重なり順も制御
    document.write('<div id="outer" style="position:absolute;top:0px;left:0px;z-index:30000;"><div style="position:relative">');
    // 入力してある文字を表示していく
    for ( i = 0; i < n; i++ ) document.write('<div id="iemsg' + (dom && !ie ? i : '') + '" style="position:absolute;top:0px;left:0;height:' + a + 'px;width:' + a + 'px;text-align:center;font-weight:normal;cursor:default">' + props + msg[i] + '</font></div>');
        document.write('</div></div>');
    } (ns) ? window.captureEvents(Event.MOUSEMOVE) : 0;

    /* マウスの座標を取得する */
    function Mouse(evnt)
    {
        ymouse = ( ns || ( dom && !ie ) ) ? evnt.pageY + 20 - ( window.pageYOffset ) : event.y;
        xmouse = ( ns || (dom && !ie ) ) ? evnt.pageX + 20 : event.x - 20;

        ymouse = halfSizeY;
        xmouse = halfSizeX;;
    }

    // マウスイベントの取得
    if (ns || ie || dom) (ns) ? window.onMouseMove = Mouse : document.onmousemove = Mouse;

    var y = new Array();
    var x = new Array();
    var Y = new Array();
    var X = new Array();
    resetArray();

    /* 配列の初期化 */
    function resetArray()
    {
      for ( i  = 0; i < n; i++ )
      {
         y[i] = 0;
         x[i] = 0;
         Y[i] = 0;
         X[i] = 0;
     }
 }
 var iecompattest = function ()
 {
    return (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
    }

/* 円を描くように追随させる処理 */
var makecircle = function ()
{
    if (ie) outer.style.top = iecompattest().scrollTop + 'px';
    currStep -= rotation;

    for ( i = 0; i < n; i++ )
    {
        var d = (ns) ? document.layers['nsmsg' + i] : ie ? iemsg[i].style : document.getElementById('iemsg' + i).style;
        d.top = y[i] + a * Math.sin( ( currStep + i * 1 ) / 3.8 ) + window.pageYOffset - 15 + ( ie || dom ? 'px' : '' );
        d.left = x[i] + a * Math.cos( ( currStep + i * 1) / 3.8 ) * 2 + ( ie || dom ? 'px' : '' );
    }
}

/* マウスがドラッグされたときに呼ばれる */
var drag = function ()
{
    y[0] = Math.round( Y[0] += ( ( ymouse ) - Y[0] ) * speed );
    x[0] = Math.round( X[0] += ( ( xmouse ) - X[0] ) * speed );

    for ( var i = 1; i < n; i++ )
    {
        y[i] = Math.round( Y[i] += ( y[i - 1] - Y[i] ) * speed );
        x[i] = Math.round( X[i] += ( x[i - 1] - X[i] ) * speed );
    }
    makecircle();
    setTimeout(function ()
    {
        drag();
    }, 10);
    }

    if (ns || ie || dom)
    {
        if (typeof window.addEventListener != "undefined")　window.addEventListener("load", drag, false);
        else if (typeof window.attachEvent != "undefined")　window.attachEvent("onload", drag);
    }
    else
    {
        if ( window.onload != null )
        {
            var oldOnload = window.onload;
            window.onload = function (e)
            {
                oldOnload(e);
                drag();
            };
        }
        else window.onload = drag;
    }
}
circle_text();