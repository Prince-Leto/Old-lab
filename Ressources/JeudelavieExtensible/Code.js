// N = width -> i
// M = height -> j
var Timeout;
var TailleCase;
var Context;
var Tableau;
var N;
var M;
var Boolean = true;
var Run = true;
Add = function()
{
	window.addEventListener("keypress", function(event)
	{
		if(event.keyCode == 112)
		{
			if(Run)
			{
				Run = false;
				clearInterval(Timeout);
			}
			else
			{
				Run = true;
				Timeout = setInterval(Evolution, ~~(document.getElementById("Speed").value));
			}
		}
	}, false);
	Context = document.querySelector("canvas").getContext("2d");
	document.getElementById("Lancer").addEventListener("click", function()
	{
		Run = true;
		Aleatoire();
	}, false);
	document.querySelector("canvas").addEventListener("mousedown", function(event){Pose(event);}, false);
	document.getElementById("Speed").addEventListener("change", function()
	{
		if(Run)
		{
			clearInterval(Timeout);
			Timeout = setInterval(Evolution, document.getElementById("Speed").value);
		}
	}, false);
	Aleatoire();
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
	Context.fillStyle = "#000000";
	for(var i = 0; i < N; i++)
	{
		var Table = [];
		for(var j = 0; j < M; j++)
		{
			if(Math.random()*100 < ~~(document.getElementById("Taux").value))
			{
				Table.push(1);
				Context.fillRect(i*TailleCase + 1, j*TailleCase + 1, TailleCase - 2, TailleCase - 2);
			}
			else
			{
				Table.push(0);
			}
		}
		Tableau.push(Table);
	}
	//Timeout = setTimeout(Evolution, ~~(document.getElementById("Speed").value));
	Timeout = setInterval(Evolution, ~~(document.getElementById("Speed").value));
}
function Calcul(i, j)
{
	if(i >= 0 && i < N && j >= 0 && j < M)
	{
		return Tableau[i][j];
	}
	else
	{
		return 0;
	}
}	
function Evolution()
{
	Boolean = true;
	var New = [];
	var CompteurI0 = false;
	var CompteurIN = false;
	var CompteurJ0 = false;
	var CompteurJM = false;
	for(var i = -1; i < N+1; i++)
	{
		var Table = [];
		for(var j = -1; j < M+1; j++)
		{
			var Somme = Calcul(i-1, j-1) + Calcul(i, j-1) + Calcul(i+1, j-1) + Calcul(i-1, j) + Calcul(i+1, j) + Calcul(i-1, j+1) + Calcul(i, j+1) + Calcul(i+1, j+1);
			if(i >= 0 && i < N && j >= 0 && j < M)
			{
				if(Tableau[i][j] == 1)
				{
					if(Somme != 2 && Somme != 3)
					{
						Table.push(0);
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
					}
					else
					{
						Table.push(0);
					}
				}
			}
			else
			{
				if(Somme == 3)
				{
					Table.push(1);
					if(i == -1)
					{
						CompteurI0 = true;
					}
					else if(i == N)
					{
						CompteurIN = true;
					}
					if(j == -1)
					{
						CompteurJ0 = true;
					}
					else if(j == M)
					{
						CompteurJM = true;
					}
				}
				else
				{
					Table.push(0);
				}
			}
		}
		New.push(Table);
	}
	if(CompteurI0)
	{
		N++;			
	}
	else
	{
		New.shift();
	}
	if(CompteurIN)
	{
		N++;
	}
	else
	{
		New.pop();
	}
	if(CompteurJ0)
	{
		M++;
	}
	else
	{
		for(var i = 0; i < N; i++)
		{
			New[i].shift();
		}
	}
	if(CompteurJM)
	{
		M++;
	}
	else
	{
		for(var i = 0; i < N; i++)
		{
			New[i].pop();
		}
	}
	Tableau = New;
	Dessiner();
	//Timeout = setTimeout(Evolution, ~~(document.getElementById("Speed").value));
}
function Dessiner()
{
	TailleCase = ~~(document.getElementById("Taille").value);
	document.querySelector("canvas").width = N*TailleCase;
	document.querySelector("canvas").height = M*TailleCase;
	Context.fillStyle = "#FFFFFF";
	Context.fillRect(0, 0, TailleCase*N, TailleCase*M);
	Context.fillStyle = "#000000";
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
	for(var i = 0; i < N; i++)
	{
		for(var j = 0; j < M; j++)
		{
			if(Tableau[i][j] == 1)
			{
				Context.fillRect(i*TailleCase+1, j*TailleCase+1, TailleCase - 2, TailleCase - 2);
			}
		}
	}
}
function Activer()
{
	document.getElementById("Taille").disabled = false;
	document.getElementById("Taux").disabled = false;
	document.getElementById("First").disabled = false;
	document.getElementById("Second").disabled = false;
	document.getElementById("Show").disabled = false;
	document.getElementById("Lancer").disabled = false;
}
function Desactiver()
{
	document.getElementById("Taille").disabled = true;
	document.getElementById("Taux").disabled = true;
	document.getElementById("First").disabled = true;
	document.getElementById("Second").disabled = true;
	document.getElementById("Show").disabled = true;
	document.getElementById("Lancer").disabled = true;
}
function Get()
{
	if(document.getElementById("Get").value == "Poser soi-même !")
	{
		//clearTimeout(Timeout);
		clearInterval(Timeout);
		TailleCase = ~~(document.getElementById("Taille").value);
		document.querySelector("canvas").height = ~~(document.getElementById("First").value)*TailleCase;
		document.querySelector("canvas").width = ~~(document.getElementById("Second").value)*TailleCase;
		N = document.querySelector("canvas").width/TailleCase;
		M = document.querySelector("canvas").height/TailleCase;
		Desactiver();
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
		Context.fillStyle = "#000000";
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
		Activer();
		document.getElementById("Get").value = "Poser soi-même !";
		//Evolution();
		Run = true;
		Timeout = setInterval(Evolution, ~~(document.getElementById("Speed").value))
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
/*function Clavier()
{
	if(document.getElementById("Get").value == "Poser soi-même !")
	{
		if(event.keyCode == 112 && Boolean)
		{
			clearTimeout(Timeout);
			Boolean = false;
		}
		else
		{
			Boolean = true;
			Evolution();
		}
	}
}
document.onkeypress = Clavier;*/