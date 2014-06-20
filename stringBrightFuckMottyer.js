farbbibliothek = new Array();
farbbibliothek[0] = new Array("#000000","#FF1100","#FF2200");
farbbibliothek[1] = new Array("#000000","#FF1100","#FF2200");
farbbibliothek[2] = new Array("#000000","#FF1100","#FF2200");
farbbibliothek[3] = new Array("#000000","#FF1100","#FF2200");
farbbibliothek[4] = new Array("#000000","#EE0000","#DD0000","#CC0000","#BB0000","#AA0000","#990000","#880000","#770000","#660000","#550000","#440000","#330000","#220000","#110000","#000000","#110000","#220000","#330000","#440000","#550000","#660000","#770000","#880000","#990000","#AA0000","#BB0000","#CC0000","#DD0000","#EE0000");
farbbibliothek[5] = new Array("#000000","#000000","#000000","#FFFFFF","#FFFFFF","#FFFFFF");
farbbibliothek[6] = new Array("#0000FF","#FFFF00");
farben = farbbibliothek[4];

function farbschrift()
{
  for(var i=0 ; i<Buchstabe.length; i++)
  {
    document.all["a"+i].style.color=farben[i];
  }
  farbverlauf();
}

function string2array(text)
{
  Buchstabe = new Array();
  while(farben.length<text.length)
  {
    farben = farben.concat(farben);
  }
  k=0;
  while(k<=text.length)
  {
    Buchstabe[k] = text.charAt(k);
    k++;
  }
}

function divserzeugen()
{
  for(var i=0 ; i<Buchstabe.length; i++)
  {
    document.write("<span id='a"+i+"' class='a"+i+"'>"+Buchstabe[i] + "</span>");
  }
  farbschrift();
}
var a=1;

function farbverlauf()
{
  for(var i=0 ; i<farben.length; i++)
  {
    farben[i-1]=farben[i];
  }
  farben[farben.length-1]=farben[-1];
  setTimeout("farbschrift()",30);
}
var farbsatz=1;

function farbtauscher()
{
  farben = farbbibliothek[farbsatz];
  while(farben.length<text.length)
  {
    farben = farben.concat(farben);
  }
  farbsatz=Math.floor(Math.random()*(farbbibliothek.length-0.0001));
}

setInterval("farbtauscher()",5000);
text= "+----------------------------- HackU : LeapMotion Demo -----------------------------+"; //h
string2array(text);
divserzeugen();
//document.write(text);