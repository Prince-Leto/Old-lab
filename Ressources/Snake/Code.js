var Context, Objet, Interval, Taille, Largeur, Hauteur, Murs, Last, Direction, Grand, Historique, Compteur, Loose;
var Run = true;
function Modulo(a, b)
{
	var Reste = a%b
	if(Reste < 0 && b > 0)
	{
		Reste += b;
	}
	return Reste;
}
function Initialiser()
{
	clearInterval(Interval);
	Loose = false;
	Compteur = 0;
	document.querySelector("#Navigate > div > span").innerHTML = "Item(s) ramassé(s) : " + Compteur;
	Last = 0;
	Direction = 0;
	Historique = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];
	Grand = 0;
	Taille = ~~(document.querySelector("#Taille").value);
	Largeur = ~~(document.querySelector("#Largeur").value);
	Hauteur = ~~(document.querySelector("#Hauteur").value);
	document.querySelector("canvas").width = Largeur*Taille;
	document.querySelector("canvas").height = Hauteur*Taille;
	Context.fillStyle = "white";
	Context.fillRect(0, 0, Largeur*Taille, Hauteur*Taille);
	Context.fillStyle = "black";
	Murs = [];
	var Choix = ~~(document.querySelector("#Choix").value);
	if(Choix == 1)
	{
		for(var i = 0; i < Largeur; i++)
		{
			Murs.push([i, 0]);
			Context.fillRect(i*Taille, 0, Taille, Taille);
			Murs.push([i, Hauteur - 1]);
			Context.fillRect(i*Taille, (Hauteur - 1)*Taille, Taille, Taille);
		}
		for(var i = 0; i < Hauteur; i++)
		{
			Murs.push([0, i]);
			Context.fillRect(0, i*Taille, Taille, Taille);
			Murs.push([Largeur - 1, i]);
			Context.fillRect((Largeur - 1)*Taille, i*Taille, Taille, Taille);
		}
	}
	else if(Choix == 2)
	{
		var MiddleL = ~~(Largeur/2);
		var MiddleH = ~~(Hauteur/2);
		for(var i = 3; i < Largeur - 3; i++)
		{
			Murs.push([i, MiddleH]);
			Context.fillRect(i*Taille, MiddleH*Taille, Taille, Taille);
		}
		for(var i = 3; i < Hauteur - 3; i++)
		{
			Murs.push([MiddleL, i]);
			Context.fillRect(MiddleL*Taille, i*Taille, Taille, Taille);
		}
	}
	else if(Choix == 3)
	{
		var TiersL = ~~(Largeur/3);
		var TiersH = ~~(Hauteur/3);
		for(var i = TiersL; i <= 2*TiersL; i++)
		{
			for(var j = TiersH; j <= 2*TiersH; j++)
			{
				Murs.push([i, j])
				Context.fillRect(i*Taille, j*Taille, Taille, Taille);
			}
		}
	}
	var Boucler = true;
	var Size = Historique.length;
	var Length = Murs.length;
	while(Boucler)
	{
		Boucler = false;
		Objet = [~~(Math.random()*Largeur), ~~(Math.random()*Hauteur)];
		for(var i = 0; i < Size; i++)
		{
			if(Objet[0] == Historique[i][0] && Objet[1] == Historique[i][1])
			{
				Boucler = true;
			}
		}
		for(var i = 0; i < Length; i++)
		{
			if(Objet[0] == Murs[i][0] && Objet[1] == Murs[i][1])
			{
				Boucler = true;
			}
		}
	}
	Context.fillStyle = "rgba(" + ~~(Math.random()*200) + ", " + ~~(Math.random()*200) + ", " + ~~(Math.random()*200) + ", 1)";
	Context.fillRect(Objet[0]*Taille, Objet[1]*Taille, Taille, Taille);
	Context.fillStyle = "green";
	for(var i = 0; i < Historique.length; i++)
	{
		Context.fillRect(Historique[i][0]*Taille, Historique[i][1]*Taille, Taille, Taille);
	}
	Run = true;
	Interval = setInterval(Iterer, ~~(document.querySelector("#Speed").value));
}
Add = function()
{
	document.querySelector("#Speed").addEventListener("change", function(){if(Run){clearInterval(Interval); Interval = setInterval(Iterer, ~~(document.querySelector("#Speed").value));}}, false);
	document.querySelector("input[type=button]").addEventListener("click", Initialiser, false);
	document.addEventListener("keydown", function(event)
	{
		if(event.keyCode == 39 && Last != 2)
		{
			Direction = 0
		}
		else if(event.keyCode == 40 && Last != 3)
		{
			Direction = 1;
		}
		else if(event.keyCode == 37 && Last != 0)
		{
			Direction = 2;
		}
		else if(event.keyCode == 38 && Last != 1)
		{
			Direction = 3;
		}
		else if(event.keyCode == 80)
		{
			if(!Loose)
			{
				if(Run)
				{
					clearInterval(Interval)
					Run = false;
				}
				else
				{
					Run = true;
					Interval = setInterval(Iterer, ~~(document.querySelector("#Speed").value));
				}
			}
		}
	}, false);
	Context = document.querySelector("canvas").getContext("2d");
	Initialiser();
}
function Iterer()
{
	Last = Direction;
	Context.fillStyle = "white";
	Context.fillRect(Historique[0][0]*Taille, Historique[0][1]*Taille, Taille, Taille);
	Context.fillStyle = "green";
	if(!Grand)
	{
		Historique.shift();
	}
	else
	{
		Grand = false;
	}
	if(Direction == 0)
	{
		Historique.push([Modulo(Historique[Historique.length - 1][0] + 1, Largeur), Historique[Historique.length - 1][1]]);
	}
	else if(Direction == 1)
	{
		Historique.push([Historique[Historique.length - 1][0], Modulo(Historique[Historique.length - 1][1] + 1, Hauteur)]);
	}
	else if(Direction == 2)
	{
		Historique.push([Modulo(Historique[Historique.length - 1][0] - 1, Largeur), Historique[Historique.length - 1][1]]);
	}
	else if(Direction == 3)
	{
		Historique.push([Historique[Historique.length - 1][0], Modulo(Historique[Historique.length - 1][1] - 1, Hauteur)]);
	}
	Context.fillRect(Historique[Historique.length - 1][0]*Taille, Historique[Historique.length - 1][1]*Taille, Taille, Taille);
	if(Historique[Historique.length - 1][0] == Objet[0] && Historique[Historique.length - 1][1] == Objet[1])
	{
		document.querySelector("#Navigate > div > span").innerHTML = "Item(s) ramassé(s) : " + ++Compteur;
		var Boucler = true;
		var Size = Historique.length;
		var Length = Murs.length;
		while(Boucler)
		{
			Boucler = false;
			Objet = [~~(Math.random()*Largeur), ~~(Math.random()*Hauteur)];
			for(var i = 0; i < Size; i++)
			{
				if(Objet[0] == Historique[i][0] && Objet[1] == Historique[i][1])
				{
					Boucler = true;
				}
			}
			for(var i = 0; i < Length; i++)
			{
				if(Objet[0] == Murs[i][0] && Objet[1] == Murs[i][1])
				{
					Boucler = true;
				}
			}
		}
		Context.fillStyle = "rgba(" + ~~(Math.random()*255) + ", " + ~~(Math.random()*255) + ", " + ~~(Math.random()*255) + ", 1)";
		Context.fillRect(Objet[0]*Taille, Objet[1]*Taille, Taille, Taille);
		Context.fillStyle = "green";
		Grand = true;
	}
	var Size = Historique.length - 1;
	for(var i = 0; i < Size; i++)
	{
		if(Historique[Size][0] == Historique[i][0] && Historique[Size][1] == Historique[i][1])
		{
			clearInterval(Interval);
			Context.fillStyle = "rgba(0, 0, 0, 0.2)";
			Context.fillRect(0, 0, Largeur*Taille, Hauteur*Taille);
			Run = false;
			Loose = true;
		}
	}
	var Length = Murs.length;
	for(var i = 0; i < Length; i++)
	{
		if(Historique[Size][0] == Murs[i][0] && Historique[Size][1] == Murs[i][1])
		{
			clearInterval(Interval);
			Context.fillStyle = "rgba(0, 0, 0, 0.2)";
			Context.fillRect(0, 0, Largeur*Taille, Hauteur*Taille);
			Run = false;
			Loose = true;
		}
	}
}