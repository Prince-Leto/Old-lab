// N = width -> i
// M = height -> j
var Timeout;
var TailleCase;
var Context;
var Tableau;
var N;
var M;
function SetInt(N)
{
	clearInterval(Timeout);
	Timeout = setInterval(MaFonction, N);
}
function Aleatoire()
{
	//clearTimeout(Timeout);
	clearInterval(Timeout);
	TailleCase = ~~(document.getElementById("Taille").value);
	N = ~~(document.getElementById("Second").value);
	M = ~~(document.getElementById("First").value);
	document.querySelector("canvas").height = ~~(document.getElementById("First").value)*TailleCase;
	document.querySelector("canvas").width = ~~(document.getElementById("Second").value)*TailleCase;
	//Context.clearRect(0, 0, TailleCase*N, TailleCase*M);
	Context.fillStyle = "#FFFFFF";
	Context.fillRect(0, 0, TailleCase*N, TailleCase*M);
	if(document.getElementById("Show").checked)
	{
		Context.beginPath();
		for(var i = 0; i <= TailleCase*N; i += TailleCase)
		{
			Context.moveTo(i, 0);
			Context.lineTo(i, TailleCase*M);
		}
		for(var j = 0; j <= TailleCase*M; j += TailleCase)
		{
			Context.moveTo(0, j);
			Context.lineTo(TailleCase*N, j);
		}
		Context.stroke();
		Context.closePath();
	}
	Tableau = [];
	for(var i = 0; i < N; i++)
	{
		var Table = [];
		for(var j = 0; j < M; j++)
		{
			if(Math.random()*100 < document.getElementById("Taux").value)
			{
				Table.push(1);
				Context.fillStyle = "#000000";
				Context.fillRect(i*TailleCase + 1, j*TailleCase + 1, TailleCase - 2, TailleCase - 2)
			}
			else
			{
				Table.push(0);
			}
		}
		Tableau.push(Table);
	}
	SetInt(~~(document.getElementById("Speed").value));
	//Timeout = setTimeout(MaFonction, document.getElementById("Speed").value);
}
function Modulo(a, b)
{
	var Reste = a%b
	if(Reste < 0 && b > 0)
	{
		Reste += b;
	}
	return Reste;
}
function MaFonction()
{
	var New = [];
	for(var i = 0; i < N; i++)
	{
		var Table = [];
		for(var j = 0; j < M; j++)
		{
			var Somme = Tableau[Modulo(i - 1, N)][Modulo(j - 1, M)] + Tableau[Modulo(i, N)][Modulo(j - 1, M)] + Tableau[Modulo(i + 1, N)][Modulo(j - 1, M)] + Tableau[Modulo(i - 1, N)][Modulo(j, M)] + Tableau[Modulo(i + 1, N)][Modulo(j, M)] + Tableau[Modulo(i - 1, N)][Modulo(j + 1, M)] + Tableau[Modulo(i, N)][Modulo(j + 1, M)] + Tableau[Modulo(i + 1, N)][Modulo(j + 1, M)];
			if(Tableau[i][j] == 1)
			{
				if(Somme != 2 && Somme != 3)
				{
					Table.push(0);
					//Context.clearRect(i*TailleCase+1, j*TailleCase+1, TailleCase - 2, TailleCase - 2);
					Context.fillStyle = "#FFFFFF";
					Context.fillRect(i*TailleCase + 1, j*TailleCase + 1, TailleCase - 2, TailleCase - 2);
				}
				else
				{
					Table.push(1);
				}
			}
			else
			{
				if(Somme == 3)
				{
					Table.push(1);
					Context.fillStyle = "#000000";
					Context.fillRect(i*TailleCase + 1, j*TailleCase + 1, TailleCase - 2, TailleCase - 2);
				}
				else
				{
					Table.push(0);
				}
			}
		}
		New.push(Table);
	}
	Tableau = New;
	//Timeout = setTimeout(MaFonction, document.getElementById("Speed").value);
}
function Get()
{
	if(document.getElementById("Get").value == "Poser soi-même !")
	{
		//clearTimeout(Timeout);
		clearInterval(Timeout);
		TailleCase = ~~(document.getElementById("Taille").value);
		document.querySelector("canvas").height = document.getElementById("First").value*TailleCase;
		document.querySelector("canvas").width = document.getElementById("Second").value*TailleCase;
		N = document.querySelector("canvas").width/TailleCase;
		M = document.querySelector("canvas").height/TailleCase;
		document.getElementById("Taille").disabled = true;
		document.getElementById("Taux").disabled = true;
		document.getElementById("First").disabled = true;
		document.getElementById("Second").disabled = true;
		document.getElementById("Show").disabled = true;
		document.getElementById("Lancer").disabled = true;
		Tableau = [];
		for(var i = 0; i < N; i++)
		{
			var Table = [];
			for(var j = 0; j < M; j++)
			{
				Table.push(0);
			}
			Tableau.push(Table);
		}
		//Context.clearRect(0, 0, TailleCase*N, TailleCase*M);
		Context.fillStyle = "#FFFFFF";
		Context.fillRect(0, 0, TailleCase*N, TailleCase*M);
		if(document.getElementById("Show").checked)
		{
			Context.beginPath();
			for(var i = 0; i <= TailleCase*N; i += TailleCase)
			{
				Context.moveTo(i, 0);
				Context.lineTo(i, TailleCase*M);
			}
			for(var j = 0; j <= TailleCase*M; j += TailleCase)
			{
				Context.moveTo(0, j);
				Context.lineTo(TailleCase*N, j);
			}
			Context.stroke();
			Context.closePath();
		}
		document.getElementById("Get").value = "Lancer !";
	}
	else if(document.getElementById("Get").value == "Lancer !")
	{
		document.getElementById("Taille").disabled = false;
		document.getElementById("Taux").disabled = false;
		document.getElementById("First").disabled = false;
		document.getElementById("Second").disabled = false;
		document.getElementById("Show").disabled = false;
		document.getElementById("Lancer").disabled = false;
		document.getElementById("Get").value = "Poser soi-même !";
		SetInt(~~(document.getElementById("Speed").value));
	}
}
function Pose(event)
{
	if(document.getElementById("Get").value == "Lancer !")
	{
		var x = new Number();
		var y = new Number();
		var canvas = document.querySelector("canvas");

		if(event.x != undefined && event.y != undefined)
		{
			x = event.x;
			y = event.y;
		}
		else // Firefox method to get the position
		{
			x = event.clientX + document.body.scrollLeft +
			document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop +
			document.documentElement.scrollTop;
		}
		x -= canvas.offsetLeft;
		x += document.body.scrollLeft;
		y -= canvas.offsetTop;
		y += document.body.scrollTop;
		if(Tableau[(x-x%TailleCase)/TailleCase][(y-y%TailleCase)/TailleCase] == 1)
		{
			//Context.clearRect(x-x%TailleCase+1, y-y%TailleCase+1, TailleCase - 2, TailleCase - 2);
			Context.fillStyle = "#FFFFFF";
			Context.fillRect(x-x%TailleCase+1, y-y%TailleCase+1, TailleCase - 2, TailleCase - 2);
			Tableau[(x-x%TailleCase)/TailleCase][(y-y%TailleCase)/TailleCase] = 0;
		}
		else
		{
			Context.fillStyle = "#000000";
			Context.fillRect(x-x%TailleCase+1, y-y%TailleCase+1, TailleCase - 2, TailleCase - 2);
			Tableau[(x-x%TailleCase)/TailleCase][(y-y%TailleCase)/TailleCase] = 1;
		}
	}
}
Add = function()
{
	Context = document.querySelector("canvas").getContext("2d");
	document.querySelector("canvas").addEventListener("mousedown", function(event){Pose(event);}, false);
	document.getElementById("Speed").addEventListener("change", function(){SetInt(document.getElementById("Speed").value)}, false);
	Aleatoire();
}
/*function Clavier()
{
	if(event.keyCode == 13)
	{
		Lancer();
	}
}
document.onkeypress = Clavier;*/