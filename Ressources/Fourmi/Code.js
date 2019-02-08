var Context;
var Taille;
var Largeur;
var Hauteur;
var Tableau = [];
var Fourmis;
var Interval;
var Ordre;
/*var Ordre = [[1, "white"], [1, "black"], [1, "blue"], [0, "green"], [1, "yellow"], [0, "lime"], [0, "grey"], [1, "red"], 
[1, "aqua"], [1, "teal"], [1, "silver"], [1, "maroon"]];*/
/*var Ordre = [[0, "white"], [1, "black"], [1, "blue"], [0, "green"], [1, "yellow"], [1, "lime"], [0, "grey"], [1, "red"], 
[1, "aqua"], [1, "teal"], [1, "silver"], [1, "maroon"]];*/
/*var Ordre = [[1, "white"], [0, "black"], [0, "blue"], [0, "green"], [0, "yellow"], [0, "lime"], [0, "grey"], [1, "red"], 
[1, "aqua"], [0, "teal"], [1, "silver"], [1, "maroon"]];*/
//[[1, "white"], [0, "black"], [0, "blue"], [1, "green"], [0, "yellow"], [1, "lime"], [1, "grey"], [1, "red"]]
//[[1, "black"], [1, "white"], [1, "blue"], [0, "green"], [1, "yellow"]]
/*[[1, "white"], [1, "black"], [1, "blue"], [0, "green"], [0, "yellow"], [0, "lime"], [1, "grey"], [1, "red"], 
[1, "aqua"], [0, "teal"], [1, "silver"], [1, "maroon"]]*/
function Modulo(a, b)
{
	var Reste = a%b;
	if(Reste < 0 && b > 0)
	{
		Reste += b;
	}
	return Reste;
}
function Avancer()
{
	for(var i = 0; i < Fourmis.length; i++)
	{
		if(Tableau[Fourmis[i][0]][Fourmis[i][1]] === false)
		{
			Tableau[Fourmis[i][0]][Fourmis[i][1]] = Ordre[0][0];
		}
		if(Ordre[Tableau[Fourmis[i][0]][Fourmis[i][1]]][0] == 0)
		{
			Fourmis[i][2] = Modulo(Fourmis[i][2] - 1, 4);
		}
		else
		{
			Fourmis[i][2] = Modulo(Fourmis[i][2] + 1, 4);
		}
		Tableau[Fourmis[i][0]][Fourmis[i][1]] = Modulo(Tableau[Fourmis[i][0]][Fourmis[i][1]] + 1, Ordre.length);
		Context.fillStyle = Ordre[Tableau[Fourmis[i][0]][Fourmis[i][1]]][1];
		Context.fillRect(Fourmis[i][0]*Taille, Fourmis[i][1]*Taille, Taille, Taille);
		if(Fourmis[i][2] == 0)
		{
			Fourmis[i][1] = Modulo(Fourmis[i][1] - 1, Hauteur);
		}
		else if(Fourmis[i][2] == 1)
		{
			Fourmis[i][0] = Modulo(Fourmis[i][0] + 1, Largeur);
		}
		else if(Fourmis[i][2] == 2)
		{
			Fourmis[i][1] = Modulo(Fourmis[i][1] + 1, Hauteur);
		}
		else
		{
			Fourmis[i][0] = Modulo(Fourmis[i][0] - 1, Largeur);
		}
		Context.fillStyle = "red"
		Context.fillRect(Fourmis[i][0]*Taille, Fourmis[i][1]*Taille, Taille, Taille);
	}
}
function Dessiner()
{
	for(var l = 0; l < ~~(document.getElementById("Iter").value); l++)
	{
		for(var i = 0; i < Fourmis.length; i++)
		{
			if(Tableau[Fourmis[i][0]][Fourmis[i][1]] === false)
			{
				Tableau[Fourmis[i][0]][Fourmis[i][1]] = Ordre[0][0];
			}
			if(Ordre[Tableau[Fourmis[i][0]][Fourmis[i][1]]][0] == 0)
			{
				Fourmis[i][2] = Modulo(Fourmis[i][2] - 1, 4);
			}
			else
			{
				Fourmis[i][2] = Modulo(Fourmis[i][2] + 1, 4);
			}
			Tableau[Fourmis[i][0]][Fourmis[i][1]] = Modulo(Tableau[Fourmis[i][0]][Fourmis[i][1]] + 1, Ordre.length);
			if(Fourmis[i][2] == 0)
			{
				Fourmis[i][1] = Modulo(Fourmis[i][1] - 1, Hauteur);
			}
			else if(Fourmis[i][2] == 1)
			{
				Fourmis[i][0] = Modulo(Fourmis[i][0] + 1, Largeur);
			}
			else if(Fourmis[i][2] == 2)
			{
				Fourmis[i][1] = Modulo(Fourmis[i][1] + 1, Hauteur);
			}
			else
			{
				Fourmis[i][0] = Modulo(Fourmis[i][0] - 1, Largeur);
			}
		}
	}
	for(var i = 0; i < Largeur; i++)
	{
		for(var j = 0; j < Hauteur; j++)
		{
			if(Tableau[i][j] !== false)
			{
				Context.fillStyle = Ordre[Tableau[i][j]][1];
				Context.fillRect(i*Taille, j*Taille, Taille, Taille);
			}
			Context.fillStyle = "red";
		}
	}
	Context.fillStyle = "red";
	for(i = 0; i < Fourmis.length; i++)
	{
		Context.fillRect(Fourmis[i][0]*Taille, Fourmis[i][1]*Taille, Taille, Taille);
	}
}
function Start()
{
	clearInterval(Interval);
	Taille = ~~(document.getElementById("Size").value);
	Largeur = ~~(document.getElementById("Lag").value);
	Hauteur = ~~(document.getElementById("Haut").value);
	Fourmis = [[(Largeur - Largeur%2)/2, (Hauteur - Hauteur%2)/2, 0]];
	Tableau = [];
	Ordre = eval(document.getElementById("Text").value);
	document.querySelector("canvas").width = Largeur*Taille;
	document.querySelector("canvas").height = Hauteur*Taille;
	if(document.getElementById("Fill").checked)
	{
		Context.fillStyle = Ordre[0][1];
		Context.fillRect(0, 0, Largeur*Taille, Hauteur*Taille);
	}
	for(var i = 0; i < Largeur; i++)
	{
		var Table = [];
		for(var j = 0; j < Hauteur; j++)
		{
			Table.push(false);
		}
		Tableau.push(Table);
	}
	if(document.getElementById("Animer").checked)
	{
		Context.fillStyle = "red";
		for(var i = 0; i < Fourmis.length; i++)
		{
			Context.fillRect(Fourmis[i][0]*Taille, Fourmis[i][1]*Taille, Taille, Taille);
		}
		Interval = setInterval(Avancer, ~~(document.getElementById("Speed").value));
	}
	else
	{
		Dessiner();
	}
}
Add = function()
{
	document.querySelector("input[type=button]").addEventListener("click", function()
	{
		if(document.querySelector("input[type=button]").value == "Poser ses fourmis")
		{
			clearInterval(Interval);
			Taille = ~~(document.getElementById("Size").value);
			Largeur = ~~(document.getElementById("Lag").value);
			Hauteur = ~~(document.getElementById("Haut").value);
			document.querySelector("canvas").width = Largeur*Taille;
			document.querySelector("canvas").height = Hauteur*Taille;
			document.getElementById("Size").disabled = true;
			document.getElementById("Lag").disabled = true;
			document.getElementById("Haut").disabled = true;
			document.getElementById("Valid").disabled = true;
			Tableau = [];
			for(var i = 0; i < Largeur; i++)
			{
				var Table = [];
				for(var j = 0; j < Hauteur; j++)
				{
					Table.push(false);
				}
				Tableau.push(Table);
			}
			document.querySelector("input[type=button]").value = "Lancer";
			Context.clearRect(0, 0, Largeur*Taille, Hauteur*Taille);
			Fourmis = [];
		}
		else
		{
			document.querySelector("input[type=button]").value = "Poser ses fourmis";
			document.getElementById("Size").disabled = false;
			document.getElementById("Lag").disabled = false;
			document.getElementById("Haut").disabled = false;
			document.getElementById("Valid").disabled = false;
			Ordre = eval(document.getElementById("Text").value);
			if(document.getElementById("Animer").checked)
			{
				Interval = setInterval(Avancer, ~~(document.getElementById("Speed").value));
			}
			else
			{
				Dessiner();
			}
		}
	}, false);
	document.querySelector("canvas").addEventListener("click", function(event)
	{
		if(document.querySelector("input[type=button]").value == "Lancer")
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
			Fourmis.push([(x - x%Taille)/Taille, (y - y%Taille)/Taille, 0]);
			Context.fillStyle = "red";
			Context.fillRect(x - x%Taille, y - y%Taille, Taille, Taille);
		}
	}, false);
	document.getElementById("Animer").addEventListener("change", function()
	{
		if(document.getElementById("Animer").checked)
		{
			document.getElementById("Iter").disabled = true;
		}
		else
		{
			document.getElementById("Iter").disabled = false;
		}
	}, false);
	document.getElementById("Speed").addEventListener("change", function()
	{
		clearInterval(Interval);
		Interval = setInterval(Avancer, ~~(document.getElementById("Speed").value));
	}, false);
	document.getElementById("Valid").addEventListener("click", Start, false);
	Context = document.querySelector("canvas").getContext("2d");
	Start();
}