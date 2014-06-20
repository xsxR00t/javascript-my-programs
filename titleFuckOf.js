tb5_messages = new tb5_makeArray(2);

tb5_messages[0] = "Test";
tb5_messages[1] = "Page";

tb5_rptType = 'infinite';
tb5_rptbr = 100;
tb5_speed = 200;
tb5_delay = 50;

var tb5_counter = 1;
var tb5_currMsg = 0;
var tb5_stsmsg = "";

function tb5_makeArray(n)
{
 this.length = n;
  return this.length;
}

function tb5_shuffle(arr)
{
  var k;
  for (i=0; i<arr.length; i++)
  {
    k = Math.round( Math.random() * ( arr.length - i - 2 ) ) + i;
	temp = arr[i];
	arr[i] = arr[k];
	arr[k] = temp;
  }
  return arr;
}

tb5_arr = new tb5_makeArray(tb5_messages[tb5_currMsg].length);
tb5_sts = new tb5_makeArray(tb5_messages[tb5_currMsg].length);

for (var i=0; i<tb5_messages[tb5_currMsg].length; i++)
{
  tb5_arr[i] = i;
  tb5_sts[i] = "/|";
}
tb5_arr = tb5_shuffle(tb5_arr);

function tb5_init(n)
{
  var k;
  if (n == tb5_arr.length)
  {
    if (tb5_currMsg == tb5_messages.length - 1)
	{
	  if ((tb5_rptType == 'finite') && (tb5_counter==tb5_rptNbr))
	  {
	    clearTimeout(tb5_timerID);
		return;
	  }
	  tb5_counter++;
	  tb5_currMsg=0;
    }
	else
	{
	  tb5_currMsg++;
	}
	n=0;
	tb5_arr = new tb5_makeArray(tb5_messages[tb5_currMsg].length);
	tb5_sts = new tb5_makeArray(tb5_messages[tb5_currMsg].length);
	
	for (var i=0; i<tb5_messages[tb5_currMsg].length; i++)
	{
	  tb5_arr[i] = i;
	  tb5_sts[i] = "";
	}
	tb5_arr = tb5_shuffle(tb5_arr);
	tb5_sp=tb5_delay;
  }
  else
  {
    tb5_sp=tb5_speed;
	k = tb5_arr[n];
	tb5_sts[k] = tb5_messages[tb5_currMsg].charAt(k);
	tb5_stsmsg = "";
	
	for (var i=0; i<tb5_sts.length; i++)
	  tb5_stsmsg += tb5_sts[i];

	document.title = tb5_stsmsg; n++;
  }
  tb5_timerID = setTimeout("tb5_init("+n+")", tb5_sp);
}

function tb5_randomizetitle() { tb5_init(0); }
tb5_randomizetitle();