// jQuery
/* ページ読み込み完了後に自動的に関数が実行される */
$(function()
{
	var centerX = 0;
	var centerY = 0;
	sizing();
	draw(centerX, centerY);

	Leap.loop(function(frame)
	{
		if (frame.fingers[0])
		{
			// 指の位置情報の取り出し
			var x = frame.fingers[0].tipPosition[0];
			var y = frame.fingers[0].tipPosition[1];
			var z = frame.fingers[0].tipPosition[2];
		  
			// X軸はセンター値にプラスして右にずらす
			// Y軸は高さからマイナスして反転
			// Z軸は固定
			/* 描画 */
			draw(x + centerX, $("canvas").height() - y, 0);
		}
	});

	// ウィンドウサイズが変更されたら再描画
	$(window).resize(function()
	{
		sizing();
		draw(centerX, centerY);
	});
  
	function sizing()
	{
		// jQuery使ってるっぽい
		$("canvas").attr( { height:$("#content").height() } ) ;
		$("canvas").attr( { width:$("#content").width() } );
		centerX = $("canvas").width() / 2;
		centerY = $("canvas").height() / 2;
	}

	// 円を描画させる
	function draw(x, y, radius)
	{
		if (typeof radius === 'undefined') 
		{
			radius = 10;
		} 
		else
		{
			radius = radius < 10 ? 10 : radius;
		}
	
		var canvas = $('canvas')[0];
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, $("canvas").width(), $("canvas").height());
		//パスの初期化
		context.beginPath();
		// 円の描画
		/* arc(x, y, radius, startAngle, endAngle, anticlockwise)
		　　xy座標、半径、開始角度、終了角度、false:時計回りに描画
		*/
		context.arc(x, y, radius, 0, Math.PI * 2, false);
		// 塗りつぶし描画
		context.fill();
		// 線描画
		//context.stroke();
	} 
});