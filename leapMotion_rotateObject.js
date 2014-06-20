// 指定IDのエレメント取得
var canvas = document.getElementById("screen");
// ウィンドウ内側の幅を取得する
var width = canvas.width = window.innerWidth;
// ウィンドウ内側の高さを取得する
var height = canvas.height = window.innerHeight;
// 描画するためのAPIにアクセスするオブジェクトを取得
var dcx = canvas.getContext("2d");
// 矩形の数
var particle = 100;

// 画面中心座標に原点を置く
dcx.translate( width / 2, height / 2 );
// 原点座標をスタックに積む
dcx.save();

Leap.loop( function( frame )
{
	// 手が認識されているかどうか
	if( frame.hands.length < 1 || frame.fingers.length < 1 ) return;
	// 手のひらの座標を取得
	var hand_x = frame.hands[0].palmNormal[0];
	var hand_z = frame.hands[0].palmNormal[2];
	
	// 感知された指の本数によってパーティクルの数が変わる
	particle = frame.fingers.length * 50;
	
	// スタックを取り出す
	dcx.restore();
	// 塗りつぶし
	dcx.fillStyle = "rgba( 255, 255, 255, 0.4 )";
	// 矩形描画
	dcx.fillRect( -width / 2, -height / 2, width, height );
	// スタックに積む
	dcx.save();
	
	for( var i = 0; i < particle; i++ )
	{
		// 小数点切り捨て
		var saturation = Math.round( Math.abs( 90 * hand_z ) );
		// HSL空間で色指定(色相、彩度、明度)
		dcx.fillStyle = "hsl(" + i + 10 + "," + saturation + "%, 40%)";
		// 座標移動
		dcx.translate( i + 5, 0 );
		// 回転
		dcx.rotate( hand_x * Math.PI / 5 );
		
		// 現在状態をスタックに積む
		dcx.save();
		// 回転
		dcx.rotate( 45 * Math.PI / 180 );
		
		// 矩形描画
		dcx.fillRect( 0, 0, 8 + i / 10, 8 + i / 10 );
		// スタックを取り出す
		dcx.restore();
	}
});