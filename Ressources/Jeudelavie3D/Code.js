var Context;
var Taille;
var Nombre;
var Pourcentage;
var Angles = [60*Math.PI/180, 60*Math.PI/180];
var Milieu;
var Size;
var Run = true;
var Tableau;
var Timeout;
var X;
var Y;
var Change = false;
var Faces = [[0, 1, 2, 3], [0, 7, 4, 3], [0, 7, 6, 1], [7, 4, 5, 6], [1, 2, 5, 6], [2, 3, 4, 5]];
var Arretes = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [1, 6], [2, 5], [3, 0], [7, 4]];
function Draw(Sommets, Table)
{
	Context.beginPath();
		Context.moveTo(Sommets[Table[0]][0], Sommets[Table[0]][1]);
		for(var i = 1; i < 4; i++)
		{
			Context.lineTo(Sommets[Table[i]][0], Sommets[Table[i]][1]);
		}
		Context.fill();
	Context.closePath();
}
function Dessine(Sommets, Trait)
{
	Context.beginPath();
		Context.moveTo(Sommets[Trait[0]][0], Sommets[Trait[0]][1]);
		Context.lineTo(Sommets[Trait[1]][0], Sommets[Trait[1]][1]);
		Context.stroke();
	Context.closePath();
}
var Cube = function(Coordonnées, Milieu, Set)
{
	this.Mem = Coordonnées;
	this.Centre = Coordonnées;
	this.Milieu = Milieu;
	this.On = Set;
	this.Dessiner = function(Offset, Sommet, Faces)
	{
		var Sommets = [];
		for(var i = 0; i < Offset.length; i++)
		{
			Sommets.push([this.Centre[0] + Offset[i][0], this.Centre[1] + Offset[i][1]])
		}
		if(this.On == 1)
		{
			Context.fillStyle = "rgba(0, 255, 255, 0.6)";
			for(var i = 0; i < 6; i++)
			{
				var Bol = true;
				for(var j = 0; j < 4; j++)
				{
					if(Faces[i][j] == Sommet)
					{
						Bol = false;
					}
				}
				if(!Bol)
				{
					Draw(Sommets, Faces[i]);
				}
			}
			for(var i = 0; i < 12; i++)
			{
				var Bol = true;
				for(var j = 0; j < 12; j++)
				{
					if(Arretes[i][j] == Sommet)
					{
						Bol = false;
					}
				}
				if(!Bol)
				{
					Dessine(Sommets, Arretes[i]);
				}
			}
			for(var i = 0; i < 6; i++)
			{
				var Bol = true;
				for(var j = 0; j < 4; j++)
				{
					if(Faces[i][j] == Sommet)
					{
						Bol = false;
					}
				}
				if(Bol)
				{
					Draw(Sommets, Faces[i]);
				}
			}
			for(var i = 0; i < 12; i++)
			{
				var Bol = true;
				for(var j = 0; j < 12; j++)
				{
					if(Arretes[i][j] == Sommet)
					{
						Bol = false;
					}
				}
				if(Bol)
				{
					Dessine(Sommets, Arretes[i]);
				}
			}
		}
	}
	this.Rotation = function()
	{
		this.Centre = [Math.cos(Angles[0])*(this.Mem[0] - this.Milieu) - Math.sin(Angles[0])*(this.Mem[1] - this.Milieu) + this.Milieu, Math.sin(Angles[0])*(this.Mem[0] - this.Milieu) + Math.cos(Angles[0])*(this.Mem[1] - this.Milieu) + this.Milieu, this.Mem[2]];
		this.Centre = [this.Centre[0], Math.cos(Angles[1])*(this.Centre[1] - this.Milieu) - Math.sin(Angles[1])*(this.Centre[2] - this.Milieu) + this.Milieu, Math.sin(Angles[1])*(this.Centre[1] - this.Milieu) + Math.cos(Angles[1])*(this.Centre[2] - this.Milieu) + this.Milieu];
	}
}
function Modulo(a, b, Table)
{
	var Reste = a%b
	if(Reste < 0 && b > 0)
	{
		Reste += b;
	}
	return Table[Reste];
	/*if(a > 0 && a < b)
	{
		return Table[a%b];
	}
	else
	{
		return 0;
	}*/
}
function Aleatoire()
{
	Nombre = ~~(document.getElementById("Number").value);
	Taille = ~~(document.getElementById("Size").value);
	Size = Nombre*Taille*Math.sqrt(3);
	Milieu = Size/2;
	var Cache = Milieu - Taille*(Nombre - 1)/2;
	document.querySelector("canvas").height = Size;
	document.querySelector("canvas").width = Size;
	Tableau = [];
	for(var i = 0; i < Nombre; i++)
	{
		for(var j = 0; j < Nombre; j++)
		{
			for(var k = 0; k < Nombre; k++)
			{	
				var Set = 0;
				if(Math.random()*100 > 100 - ~~(document.getElementById("Alea").value))
				{
					Set = 1;
				}
				Tableau.push(new Cube([Cache + Taille*i, Cache + Taille*j, Cache + Taille*k], Milieu, Set));
			}
		}
	}
	Update();
	Run = true;
	Timeout = setInterval(Step, ~~(document.getElementById("Speed").value));
}
function Step()
{
	var Copie = [];
	for(var k = 0; k < Tableau.length; k++)
	{
		Copie.push(Tableau[k].On);
	}
	for(var i = 0; i < Tableau.length; i++)
	{
		var Somme = 0;
		for(var c = -Nombre*Nombre; c <= Nombre*Nombre; c += Nombre*Nombre)
		{
			for(var b = -Nombre; b <= Nombre; b += Nombre)
			{
				for(var a = -1; a <= 1; a++)
				{
					Somme += Modulo(i + a + b + c, Nombre*Nombre*Nombre, Copie)
				}
			}
		}
		Somme -= Tableau[i].On;
		if(Tableau[i].On == 1)
		{
			if(Somme != 2 && Somme != 3)
			{
				Tableau[i].On = 0;
			}
		}
		else
		{
			if(Somme == 3)
			{
				Tableau[i].On = 1;
			}
		}
	}
	Update();
}
function Update()
{
	Context.clearRect(0, 0, Size, Size);
	for(var i = 0; i < Tableau.length; i++)
	{
		Tableau[i].Rotation();
	}
	var Difference = function(Un, Deux)
	{
		return [(Tableau[Un].Centre[0] - Tableau[Deux].Centre[0])/(Nombre - 1)/2*Pourcentage/100, (Tableau[Un].Centre[1] - Tableau[Deux].Centre[1])/(Nombre - 1)/2*Pourcentage/100]
	}
	var Parametre = [Difference(0, Nombre - 1), Difference(Nombre - 1, Nombre*Nombre - 1), Difference(Nombre*Nombre - 1, Nombre*Nombre*Nombre - 1)];
	var Offset = [
	[Parametre[0][0] + Parametre[1][0] + Parametre[2][0], Parametre[0][1] + Parametre[1][1] + Parametre[2][1]],
	[Parametre[0][0] + Parametre[1][0] - Parametre[2][0], Parametre[0][1] + Parametre[1][1] - Parametre[2][1]],
	[Parametre[0][0] - Parametre[1][0] - Parametre[2][0], Parametre[0][1] - Parametre[1][1] - Parametre[2][1]],
	[Parametre[0][0] - Parametre[1][0] + Parametre[2][0], Parametre[0][1] - Parametre[1][1] + Parametre[2][1]],
	[ - Parametre[0][0] - Parametre[1][0] + Parametre[2][0], - Parametre[0][1] - Parametre[1][1] + Parametre[2][1]],
	[ - Parametre[0][0] - Parametre[1][0] - Parametre[2][0], - Parametre[0][1] - Parametre[1][1] - Parametre[2][1]],
	[ - Parametre[0][0] + Parametre[1][0] - Parametre[2][0], - Parametre[0][1] + Parametre[1][1] - Parametre[2][1]],
	[ - Parametre[0][0] + Parametre[1][0] + Parametre[2][0], - Parametre[0][1] + Parametre[1][1] + Parametre[2][1]]]
	var Values = [Tableau[0], Tableau[Nombre - 1], Tableau[Nombre*Nombre - 1], Tableau[Nombre*Nombre*Nombre - 1], Tableau[Nombre*(Nombre*(Nombre - 1) + 1) - 1], Tableau[Nombre*Nombre*(Nombre - 1)], Tableau[Nombre*(Nombre*Nombre - 1)], Tableau[Nombre*(Nombre - 1)]];
	var M = [Values[0].Centre[2], 0];
	for(var i = 1; i < Values.length; i++)
	{
		if(M[0] > Values[i].Centre[2])
		{
			M = [Values[i].Centre[2], i];
		}
	}
	var Equivalence = [0, 7, 4, 5, 6, 1, 2, 3];
	var Copie = [];
	for(var i = 0; i < Tableau.length; i++)
	{
		Copie.push(Tableau[i]);
	}
	Copie.sort(function(a, b){return a.Centre[2] - b.Centre[2];});
	for(var i = 0; i < Copie.length; i++)
	{
		Copie[i].Dessiner(Offset, Equivalence[M[1]], Faces);
	}
}
var Mem;
function SourisDown(e)
{
	Mem = [Angles[0], Angles[1]];
	X = e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft) - document.querySelector("canvas").offsetLeft;
	Y = e.clientY + (document.body.scrollTop || document.documentElement.scrollTop) - document.querySelector("canvas").offsetTop;
	Change = true;
}
function SourisMove(e)
{
	if(Change)
	{
		Angles = [Mem[0] + (X - (e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft) - document.querySelector("canvas").offsetLeft))*Math.PI/360, Mem[1] + (Y - (e.clientY + (document.body.scrollTop || document.documentElement.scrollTop) - document.querySelector("canvas").offsetTop))*Math.PI/360];
		Update();
	}
}
function SourisUp(e)
{
	Change = false;
}
Add = function()
{
	document.querySelector("canvas").addEventListener("mousedown", SourisDown, false);
	document.querySelector("canvas").addEventListener("mousemove", SourisMove, false);
	document.querySelector("canvas").addEventListener("mouseup", SourisUp, false);
	document.getElementById("Speed").addEventListener("change", function()
	{
		if(Run)
		{
			clearInterval(Timeout);
			Run = true;
			Timeout = setInterval(Step, ~~(document.getElementById("Speed").value));
		}
	}, false);
	document.querySelector("input[type=button]").addEventListener("click", function()
	{
		clearInterval(Timeout);
		Aleatoire();
	}, false);
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
				Timeout = setInterval(Step, ~~(document.getElementById("Speed").value));
			}
		}
	}, false);
	Context = document.querySelector("canvas").getContext("2d");
	document.getElementById("Percent").addEventListener("change", function()
	{
		Pourcentage = ~~(document.getElementById("Percent").value);
		Update();
	}, false);
	Taille = ~~(document.getElementById("Size").value);
	Nombre = ~~(document.getElementById("Number").value);
	Size = Nombre*Taille*Math.sqrt(3);
	Pourcentage = ~~(document.getElementById("Percent").value);
	document.querySelector("canvas").height = Size;
	document.querySelector("canvas").width = Size;
	Milieu = Size/2;
	var Cache = Milieu - Taille*(Nombre - 1)/2;
	/*for(var i = 0; i < Nombre; i++)
	{
		for(var j = 0; j < Nombre; j++)
		{
			for(var k = 0; k < Nombre; k++)
			{	
				Tableau.push(new Cube([Cache + Taille*i, Cache + Taille*j, Cache + Taille*k], Milieu));
			}
		}
	}
	Update();*/
	/*setInterval(function()
	{
		Angles = [(Angles[0] + 0.5*Math.PI/180)%(2*Math.PI), (Angles[1] + 0.5*Math.PI/180)%(2*Math.PI)];
		document.getElementById("Percent").value = Angles[0]*180/Math.PI;
		document.querySelectorAll("input[type=range]")[1].value = Angles[1]*180/Math.PI;
		Update();
	}, 20);*/
	Aleatoire();
}