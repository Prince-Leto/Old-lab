var Tableau;
var Context;
var Hauteur;
var Largeur;
var Taille;
var Interval;
function Dessiner()
{
	Context.fillStyle = "#FFFFFF";
	Context.fillRect(0, 0, Largeur*Taille, Hauteur*Taille);
	Context.beginPath()
		Context.moveTo(0, 0);
		Context.lineTo(Largeur*Taille, 0);
		Context.lineTo(Largeur*Taille, Hauteur*Taille);
		Context.lineTo(0, Hauteur*Taille);
		Context.lineTo(0, 0);
	Context.stroke();
	Context.closePath();
	Context.moveTo(0, 0);
	if(document.getElementById("Grille").checked)
	{
		Context.beginPath();
		for(var i = Taille; i < Taille*Largeur; i += Taille)
		{
			Context.moveTo(i, 0);
			Context.lineTo(i, Taille*Hauteur);
		}
		for(var j = Taille; j < Taille*Hauteur; j += Taille)
		{
			Context.moveTo(0, j);
			Context.lineTo(Taille*Largeur, j);
		}
		Context.stroke();
		Context.closePath();
	}
	for(var i = 0; i < Largeur; i++)
	{
		for(var j = 0; j < Hauteur; j++)
		{
			if(Tableau[i][j] == 1)
			{
				Context.fillStyle = "rgba(0, 255, 0, 0.8)";
				Context.fillRect(i*Taille + 1, j*Taille + 1, Taille - 2, Taille - 2);
			}
			if(Tableau[i][j] == 2)
			{
				Context.fillStyle = "rgba(255, 255, 0, 0.8)";
				Context.fillRect(i*Taille + 1, j*Taille + 1, Taille - 2, Taille - 2);
			}
			else if(Tableau[i][j] == 3 && document.getElementById("Dead").checked)
			{
				Context.fillStyle = "rgba(0, 0, 0, 0.8)";
				Context.fillRect(i*Taille + 1, j*Taille + 1, Taille - 2, Taille - 2);
			}
		}
	}
}
function Lire(i, j)
{
	if(i >= 0 && i < Largeur && j >= 0 && j < Hauteur)
	{
		if(Tableau[i][j] == 2)
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}
	else
	{
		return 0;
	}
}
function Feu()
{
	New = [];
	for(var i = 0; i < Largeur; i++)
	{
		var Pro = []
		for(var j = 0; j < Hauteur; j++)
		{
			if(Tableau[i][j] == 1)
			{
				if(Lire(i, j + 1) + Lire(i, j - 1) + Lire(i + 1, j) + Lire(i - 1, j) == 0)
				{
					Pro.push(1);
				}
				else
				{
					Pro.push(2);
				}
			}
			else if(Tableau[i][j] == 2 || Tableau[i][j] == 3)
			{
				Pro.push(3);
			}
			else
			{
				Pro.push(0);
			}
		}
		New.push(Pro);
	}
	return New;
}
function Animer()
{
	var Pro = Feu(Tableau);
	var Num = 0;
	for(var i = 0; i < Largeur; i++)
	{
		for(var j = 0; j < Hauteur; j++)
		{
			if(Pro[i][j] == 2)
			{
				Num++;
			}
		}
	}
	Tableau = Pro;
	Dessiner();
	if(Num == 0)
	{
		clearInterval(Interval);
	}
}
function Start()
{
	clearInterval(Interval);
	Tableau = [];
	Largeur = ~~(document.getElementById("Largeur").value);
	Hauteur = ~~(document.getElementById("Hauteur").value);
	Taille = ~~(document.getElementById("Taille").value);
	document.querySelector("canvas").width = Largeur*Taille;
	document.querySelector("canvas").height = Hauteur*Taille;
	var Occupation = 0;
	for(var i = 0; i < Largeur; i++)
	{
		var Table = [];
		for(var j = 0; j < Hauteur; j++)
		{
			if(Math.random()*100 > ~~(document.getElementById("Arbre").value))
			{
				Table.push(0);
			}
			else if(j == Hauteur - 1)
			{
				Table.push(2);
				Occupation++;
			}
			else
			{
				Table.push(1);
				Occupation++;
			}
		}
		Tableau.push(Table);
	}
	Dessiner();
	Interval = setInterval(Animer, ~~(document.getElementById("Vitesse").value));
}
Add = function()
{
	Context = document.querySelector("canvas").getContext("2d");
	document.querySelector("input[type=button]").addEventListener("click", Start, false);
	document.getElementById("Vitesse").addEventListener("change", function(){clearInterval(Interval); Interval = setInterval(Animer, ~~(document.getElementById("Vitesse").value))}, false);
	Start();
}