var Context;
var TCercle;
var Win = [false, 0];
var Size;
var Run = false;
var Tableau;
var Travailleur;
var Img = new Image();
Img.style.display = "none";
Img.style.position = "absolute";
Img.style.top = "50%";
Img.style.left = "50%";
Img.style.marginTop = "-16px";
Img.style.marginLeft = "-16px";
Img.src = "Ressources/Puissance4/Loader.gif";
Add = function()
{
	Context = document.querySelector("canvas").getContext("2d");
	Size = ~~(document.getElementById("La").value);
	TCercle = Size/6;
	Travailleur = new Worker('Ressources/Puissance4/Worker.js');
	document.body.appendChild(Img);
	document.querySelector("canvas").height = Size;
	document.querySelector("canvas").width = Size*7/6;
	document.querySelector("canvas").addEventListener("click", Souris, false);
	document.getElementById("La").addEventListener("change", function()
	{
		Size = ~~(document.getElementById("La").value);
		TCercle = Size/6;
		document.querySelector("canvas").height = Size;
		document.querySelector("canvas").width = Size*7/6;
		Dessiner();
	}, false);
	document.querySelector("input[type=button]").addEventListener("click", function()
	{
		Tableau = [];
		var Table;
		for(var i = 0; i < 7; i++)
		{
			Table = [];
			for(var j = 0; j < 6; j++)
			{
				Table.push(0);
			}
			Tableau.push(Table);
		}
		Win = [false, 0];
		Dessiner();
	}, false);
	Tableau = [];
	var Table;
	for(var i = 0; i < 7; i++)
	{
		Table = [];
		for(var j = 0; j < 6; j++)
		{
			Table.push(0);
		}
		Tableau.push(Table);
	}
	Dessiner();
}
function Put(Table, Data, Value)
{
	var i = 0;
	while(i < 6 && Table[Data][i] == 0)
	{
		i++;
	}
	if(i > 0)
	{
		Table[Data][--i] = Value;
	}
	return Table;
}
function Poss(Table, Data)
{
	var i = 0;
	while(i < 7 && Table[Data][i] == 0)
	{
		i++;
	}
	if(i > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}
function Com(i, j, Compte, A, Arr)
{
	var Win = A;
	if(Arr[i][j] > 0)
	{
		if(Compte <= 0)
		{
			Compte = 1;
		}
		else
		{
			Compte++;
		}
	}
	else if(Arr[i][j] < 0)
	{
		if(Compte >= 0)
		{
			Compte = -1;
		}
		else
		{
			Compte--;
		}
	}
	else
	{
		Compte = 0;
	}
	if(!Win[0] && Compte < -3)
	{
		Win = [true, -1];
	}
	else if(!Win[0] && Compte > 3)
	{
		Win = [true, 1];
	}
	return [Win, Compte];
}
function Look(Arr)
{
	var Win = [false, 0];
	var Compte;
	for(var i = 0; i < 7; i++)
	{
		Compte = 0;
		for(var j = 0; j < 6; j++)
		{
			Pro = Com(i, j, Compte, Win, Arr);
			Win = Pro[0];
			Compte = Pro[1];
		}
	}
	for(var j = 0; j < 6; j++)
	{
		Compte = 0;
		for(var i = 0; i < 7; i++)
		{
			Pro = Com(i, j, Compte, Win, Arr);
			Win = Pro[0];
			Compte = Pro[1];
		}
	}
	var i;
	var j;
	for(var k = 2; k > 0; k--)
	{
		Compte = 0;
		j = k;
		i = 0;
		while(i < 7 && j < 6)
		{
			Pro = Com(i, j, Compte, Win, Arr);
			Win = Pro[0];
			Compte = Pro[1];
			i++;
			j++;
		}
		Compte = 0;
		j = k;
		i = 6;
		while(i >= 0 && j < 6)
		{
			Pro = Com(i, j, Compte, Win, Arr);
			Win = Pro[0];
			Compte = Pro[1];
			i--;
			j++;
		}
	}
	for(var k = 0; k < 4; k++)
	{
		Compte = 0;
		i = k;
		j = 0;
		while(i < 7 && j < 6)
		{
			Pro = Com(i, j, Compte, Win, Arr);
			Win = Pro[0];
			Compte = Pro[1];
			i++;
			j++;
		}
		Compte = 0;
		i = 6 - k;
		j = 0;
		while(i >= 0 && j < 6)
		{
			Pro = Com(i, j, Compte, Win, Arr);
			Win = Pro[0];
			Compte = Pro[1];
			i--;
			j++;
		}
	}
	return Win;
}
function Check()
{
	Win = Look(Tableau);
	if(Win[0])
	{
		if(Win[1] > 0)
		{
			alert("Perdu !");
		}
		else
		{
			alert("Gagné !");
		}
	}
	else
	{
		var i = 0;
		while(i < 7 && !Poss(Tableau, i))
		{
			i++;
		}
		if(i > 6)
		{
			Win[0] = true;
			alert("Égalité...");
		}
	}
}
function Copie(Parametre)
{
	var Copie = [];
	for(var i = 0; i < 7; i++)
	{
		var Table = [];
		for(var j = 0; j < 6; j++)
		{
			Table.push(Parametre[i][j]);
		}
		Copie.push(Table);
	}
	return Copie;
}
function Dessiner()
{
	Context.clearRect(0, 0, Size*7/6, Size)
	for(var i = 0; i < 7; i++)
	{
		for(var j = 0; j < 6; j++)
		{
			if(Tableau[i][j] != 0)
			{
				if(Tableau[i][j] > 0)
				{
					Context.fillStyle = "red";
				}
				else
				{
					Context.fillStyle = "yellow";
				}
				Context.beginPath();
					Context.arc(i*TCercle + TCercle/2, j*TCercle + TCercle/2, TCercle/2*0.9, 0, 2*Math.PI);
					Context.fill();
					Context.stroke();
				Context.closePath();
			}
			else
			{
				Context.beginPath();
					Context.arc(i*TCercle + TCercle/2, j*TCercle + TCercle/2, TCercle/2*0.9, 0, 2*Math.PI);
					Context.stroke();
				Context.closePath();
			}
		}
	}
}
function Souris(e)
{
	X = e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft) - document.querySelector("canvas").offsetLeft;
	Value = ~~((X - X%(Size/6))/(Size/6));
	if(Poss(Tableau, Value) && !Run && !Win[0])
	{
		Tableau = Put(Tableau, Value, -1);
		Dessiner();
		Check();
		if(!Win[0])
		{
			Travailleur.onmessage = function(event)
			{
				Run = false;
				Tableau = Put(Tableau, event.data[0], 1);
				Dessiner();
				//document.querySelector("img").style.display = "none";
				Img.style.display = "none";
				Check();
			}
			Run = true;
			//document.querySelector("img").style.display = "block";
			Img.style.display = "block";
			Travailleur.postMessage([Copie(Tableau), ~~(document.getElementById("Max").value)]);
		}
	}
}