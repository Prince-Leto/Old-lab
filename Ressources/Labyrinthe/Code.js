var Context, MursL, MursH, Taille, Hauteur, Largeur, Context, Start, Interval, Timeout, Mem;
function Gestion(event)
{
	if(Start)
	{
		if(event.keyCode > 36 && event.keyCode < 41)
		{
			if(event.keyCode == 40)
			{
				if(Start[1] < Hauteur - 1 && !MursL[Start[0]][Start[1]])
				{
					Start = [Start[0], Start[1] + 1];
				}
			}
			else if(event.keyCode == 38)
			{
				if(Start[1] > 0 && !MursL[Start[0]][Start[1] - 1])
				{
					Start = [Start[0], Start[1] - 1];
				}
			}
			else if(event.keyCode == 39)
			{
				if(Start[0] < Largeur - 1 && !MursH[Start[0]][Start[1]])
				{
					Start = [Start[0] + 1, Start[1]];
				}
			}
			else if(event.keyCode == 37)
			{
				if(Start[0] > 0 && !MursH[Start[0] - 1][Start[1]])
				{
					Start = [Start[0] - 1, Start[1]];
				}
			}
			if(Start[0] != Mem[0] || Start[1] != Mem[1])
			{
				var Data = Context.getImageData(Start[0]*Taille + 1 + Taille/2, Start[1]*Taille + 1 + Taille/2, 1, 1).data;
				Context.fillStyle = "rgba(" + Mem[2][0] + ", " + Mem[2][1] + ", " + Mem[2][2] + ", " + Mem[2][3]/255 + ")";
				Context.clearRect(Mem[0]*Taille + 1, Mem[1]*Taille + 1, Taille - 2, Taille - 2)
				Context.fillRect(Mem[0]*Taille + 1, Mem[1]*Taille + 1, Taille - 2, Taille - 2)
				Context.fillStyle = "rgba(255, 0, 0, 1)";
				Context.fillRect(Start[0]*Taille + 1, Start[1]*Taille + 1, Taille - 2, Taille - 2);
				Mem = [Start[0], Start[1], [Data[0], Data[1], Data[2], Data[3]]];
				if(Start[0] == Largeur - 1 && Start[1] == Hauteur - 1)
				{
					alert("Gagné !");
				}
			}
		}
	}
}
function Select(a, b, Visite)
{
	var Output = [];
	if(a != Largeur - 1 || b != Hauteur - 1)
	{
		if(a > 0 && !Visite[a - 1][b])
		{
			Output.push([a - 1, b]);
		}
		if(a < Largeur - 1 && !Visite[a + 1][b])
		{
			Output.push([a + 1, b]);
		}
		if(b > 0 && !Visite[a][b - 1])
		{
			Output.push([a, b - 1]);
		}
		if(b < Hauteur - 1 && !Visite[a][b + 1])
		{
			Output.push([a, b + 1]);
		}
	}
	return Output;
}
function Go(a, b, Visite)
{
	var Output = [];
	if(a < Largeur - 1 && !Visite[a + 1][b] && !MursH[a][b])
	{
		Output.push([a + 1, b]);
	}
	if(b < Hauteur - 1 && !Visite[a][b + 1] && !MursL[a][b])
	{
		Output.push([a, b + 1]);
	}
	if(a > 0 && !Visite[a - 1][b] && !MursH[a - 1][b])
	{
		Output.push([a - 1, b]);
	}
	if(b > 0 && !Visite[a][b - 1] && !MursL[a][b - 1])
	{
		Output.push([a, b - 1]);
	}
	return Output;
}
function Solve()
{
	clearInterval(Timeout);
	clearInterval(Interval);
	if(document.querySelector("#Solve").value == "Effacer")
	{
		Dessiner();
		document.querySelector("#Solve").value = "Résoudre";
		var Data = Context.getImageData(Mem[0]*Taille + 1 + Taille/2, Mem[1]*Taille + 1 + Taille/2, 1, 1).data;
		Context.fillStyle = "rgba(255, 0, 0, 1)";
		Context.fillRect(Start[0]*Taille + 1, Start[1]*Taille + 1, Taille - 2, Taille - 2);
		Mem = [Mem[0], Mem[1], [Data[0], Data[1], Data[2], Data[3]]];
	}
	else
	{
		var Position = [0, 0];
		var Visite = [];
		for(var i = 0; i < Largeur; i++)
		{
			var New = [];
			for(var j = 0; j < Hauteur; j++)
			{
				New.push(false);
			}
			Visite.push(New);
		}
		var Historique = [[0, 0]];
		Visite[0][0] = true;
		if(!document.querySelector("#Anim2").checked)
		{
			while(Position[0] != Largeur - 1 || Position[1] != Hauteur - 1)
			{
				var Aller = Go(Position[0], Position[1], Visite);
				if(Aller.length > 0)
				{
					Position = Aller[0];
					Visite[Position[0]][Position[1]] = true;
					Historique.push(Position);
				}
				else
				{
					Historique.pop();
					Position = Historique[Historique.length - 1];
				}
			}
			var Memory = Historique[0];
			Dessiner();
			Context.fillStyle = "rgba(0, 0, 255, 0.8)";
			for(var i = 0; i < Historique.length; i++)
			{
				Context.fillRect(Historique[i][0]*Taille + 1, Historique[i][1]*Taille + 1, Taille - 2, Taille - 2);
				if(i != 0)
				{
					if(Historique[i][0] - Memory[0] == 1)
					{
						Context.fillRect(Historique[i][0]*Taille - 1, Historique[i][1]*Taille + 1, 2, Taille - 2);
					}
					else if(Historique[i][0] - Memory[0] == -1)
					{
						Context.fillRect(Historique[i][0]*Taille - 1 + Taille, Historique[i][1]*Taille + 1, 2, Taille - 2);
					}
					else if(Historique[i][1] - Memory[1] == 1)
					{
						Context.fillRect(Historique[i][0]*Taille + 1, Historique[i][1]*Taille - 1, Taille - 2, 2);
					}
					else
					{
						Context.fillRect(Historique[i][0]*Taille + 1, Historique[i][1]*Taille - 1 + Taille, Taille - 2, 2);
					}
				}
				Memory = Historique[i];
			}
			document.querySelector("#Solve").value = "Effacer";
			var Data = Context.getImageData(Mem[0]*Taille + 1 + Taille/2, Mem[1]*Taille + 1 + Taille/2, 1, 1).data;
			Context.fillStyle = "rgba(255, 0, 0, 1)";
			Context.fillRect(Start[0]*Taille + 1, Start[1]*Taille + 1, Taille - 2, Taille - 2);
			Mem = [Mem[0], Mem[1], [Data[0], Data[1], Data[2], Data[3]]];
		}
		else
		{
			Dessiner();
			var Animate = function(Context)
			{
				var Aller = Go(Position[0], Position[1], Visite);
				if(Aller.length > 0)
				{
					Position = Aller[0];
					Visite[Position[0]][Position[1]] = true;
					Historique.push(Position);
				}
				else
				{
					Context.clearRect(Historique[Historique.length - 1][0]*Taille + 1, Historique[Historique.length - 1][1]*Taille + 1, Taille - 2, Taille - 2)
					Memory = Historique[Historique.length - 2];
					if(Historique[Historique.length - 1][0] - Memory[0] == 1)
					{
						Context.clearRect(Historique[Historique.length - 1][0]*Taille - 1, Historique[Historique.length - 1][1]*Taille + 1, 2, Taille - 2);
					}
					else if(Historique[Historique.length - 1][0] - Memory[0] == -1)
					{
						Context.clearRect(Historique[Historique.length - 1][0]*Taille - 1 + Taille, Historique[Historique.length - 1][1]*Taille + 1, 2, Taille - 2);
					}
					else if(Historique[Historique.length - 1][1] - Memory[1] == 1)
					{
						Context.clearRect(Historique[Historique.length - 1][0]*Taille + 1, Historique[Historique.length - 1][1]*Taille - 1, Taille - 2, 2);
					}
					else
					{
						Context.clearRect(Historique[Historique.length - 1][0]*Taille + 1, Historique[Historique.length - 1][1]*Taille - 1 + Taille, Taille - 2, 2);
					}
					Historique.pop();
					Position = Historique[Historique.length - 1];
				}
				Context.fillStyle = "rgba(0, 0, 255, 0.8)";
				Context.clearRect(Historique[Historique.length - 1][0]*Taille + 1, Historique[Historique.length - 1][1]*Taille + 1, Taille - 2, Taille - 2)
				Context.fillRect(Historique[Historique.length - 1][0]*Taille + 1, Historique[Historique.length - 1][1]*Taille + 1, Taille - 2, Taille - 2)
				Memory = Historique[Historique.length - 2];
				if(Historique[Historique.length - 1][0] - Memory[0] == 1)
				{
					Context.clearRect(Historique[Historique.length - 1][0]*Taille - 1, Historique[Historique.length - 1][1]*Taille + 1, 2, Taille - 2);
					Context.fillRect(Historique[Historique.length - 1][0]*Taille - 1, Historique[Historique.length - 1][1]*Taille + 1, 2, Taille - 2);
				}
				else if(Historique[Historique.length - 1][0] - Memory[0] == -1)
				{
					Context.clearRect(Historique[Historique.length - 1][0]*Taille - 1 + Taille, Historique[Historique.length - 1][1]*Taille + 1, 2, Taille - 2);
					Context.fillRect(Historique[Historique.length - 1][0]*Taille - 1 + Taille, Historique[Historique.length - 1][1]*Taille + 1, 2, Taille - 2);
				}
				else if(Historique[Historique.length - 1][1] - Memory[1] == 1)
				{
					Context.clearRect(Historique[Historique.length - 1][0]*Taille + 1, Historique[Historique.length - 1][1]*Taille - 1, Taille - 2, 2);
					Context.fillRect(Historique[Historique.length - 1][0]*Taille + 1, Historique[Historique.length - 1][1]*Taille - 1, Taille - 2, 2);
				}
				else
				{
					Context.clearRect(Historique[Historique.length - 1][0]*Taille + 1, Historique[Historique.length - 1][1]*Taille - 1 + Taille, Taille - 2, 2);
					Context.fillRect(Historique[Historique.length - 1][0]*Taille + 1, Historique[Historique.length - 1][1]*Taille - 1 + Taille, Taille - 2, 2);
				}
				if(Position[0] == Largeur - 1 && Position[1] == Hauteur - 1)
				{
					clearInterval(Interval);
					document.querySelector("#Solve").value = "Effacer";
					var Data = Context.getImageData(Mem[0]*Taille + 1 + Taille/2, Mem[1]*Taille + 1 + Taille/2, 1, 1).data;
					Context.fillStyle = "rgba(255, 0, 0, 1)";
					Context.fillRect(Start[0]*Taille + 1, Start[1]*Taille + 1, Taille - 2, Taille - 2);
					Mem = [Mem[0], Mem[1], [Data[0], Data[1], Data[2], Data[3]]];
				}
			}
			Interval = setInterval(function(){Animate(Context)}, ~~(document.querySelector("#Speed2").value));
		}
	}
}
function Animer(Possible, Historique, Visite) 
{
	document.querySelector("#Solve").disabled = true;
	Dessiner();
	var Animation = function()
	{
		if(Possible.length > 0)
		{
			var Choix = Possible[~~(Possible.length*Math.random())];
			if(Historique[0] == Choix[0])
			{
				MursL[Choix[0]][Math.min(Choix[1], Historique[1])] = false;
			}
			else
			{
				MursH[Math.min(Choix[0], Historique[0])][ Choix[1]] = false;
			}
			if(i != 0)
			{
				if(Choix[0] - Historique[0] == 1)
				{
					Context.clearRect(Choix[0]*Taille - 1, Choix[1]*Taille + 1, 2, Taille - 2);
				}
				else if(Choix[0] - Historique[0] == -1)
				{
					Context.clearRect(Choix[0]*Taille - 1 + Taille, Choix[1]*Taille + 1, 2, Taille - 2);
				}
				else if(Choix[1] - Historique[1] == 1)
				{
					Context.clearRect(Choix[0]*Taille + 1, Choix[1]*Taille - 1, Taille - 2, 2);
				}
				else
				{
					Context.clearRect(Choix[0]*Taille + 1, Choix[1]*Taille - 1 + Taille, Taille - 2, 2);
				}
			}
			Visite[Choix[0]][Choix[1]] = true;
			Historique = Choix;
		}
		else
		{
			var Choose = [];
			for(var i = 0; i < Largeur; i++)
			{
				for(var j = 0; j < Hauteur; j++)
				{
					if(Visite[i][j])
					{
						var Truc = Select(i, j, Visite);
						if(Truc.length > 0)
						{
							Choose.push([i, j]);
						}
					}
				}
			}
			if(Choose.length > 0)
			{
				var Alea = ~~(Math.random()*Choose.length);
				Historique = Choose[Alea];
			}
			else
			{
				clearInterval(Timeout);
				document.querySelector("#Solve").disabled = false;
				Context.fillStyle = "rgba(255, 0, 0, 1)";
				Context.fillRect(Start[0]*Taille + 1, Start[1]*Taille + 1, Taille - 2, Taille - 2);
			}
		}
		Possible = Select(Historique[0], Historique[1], Visite);
	}
	Timeout = setInterval(Animation, ~~(document.querySelector("#Speed").value));
}
function Create(Possible, Historique, Visite)
{
	Choose = [[0, 0]];
	while(Choose.length > 0)
	{
		if(Possible.length > 0)
		{
			var Choix = Possible[~~(Possible.length*Math.random())];
			if(Historique[0] == Choix[0])
			{
				MursL[Choix[0]][Math.min(Choix[1], Historique[1])] = false;
			}
			else
			{
				MursH[Math.min(Choix[0], Historique[0])][ Choix[1]] = false;
			}
			Visite[Choix[0]][Choix[1]] = true;
			Historique = Choix;
		}
		else
		{
			Choose = [];
			for(var i = 0; i < Largeur; i++)
			{
				for(var j = 0; j < Hauteur; j++)
				{
					if(Visite[i][j])
					{
						var Truc = Select(i, j, Visite);
						if(Truc.length > 0)
						{
							Choose.push([i, j]);
						}
					}
				}
			}
			if(Choose.length > 0)
			{
				var Alea = ~~(Math.random()*Choose.length);
				Historique = Choose[Alea];
			}
		}
		Possible = Select(Historique[0], Historique[1], Visite);
	}
	Dessiner();
	document.querySelector("#Solve").disabled = false;
	Context.fillStyle = "rgba(255, 0, 0, 1)";
	Context.fillRect(Start[0]*Taille + 1, Start[1]*Taille + 1, Taille - 2, Taille - 2);
}
function Generer()
{
	clearInterval(Timeout);
	clearInterval(Interval);
	document.querySelector("#Solve").value = "Résoudre";
	Start = [0, 0];
	Mem = [0, 0, [0, 255, 0, 255]];
	Taille = ~~(document.querySelector("#Taille").value);
	Largeur = ~~(document.querySelector("#Largeur").value);
	Hauteur = ~~(document.querySelector("#Hauteur").value);
	document.querySelector("canvas").width = Largeur*Taille;
	document.querySelector("canvas").height = Hauteur*Taille;
	MursL = [];
	for(var i = 0; i < Largeur; i++)
	{
		var New = [];
		for(var j = 0; j < Hauteur - 1; j++)
		{
			New.push(true);
		}
		MursL.push(New);
	}
	MursH = [];
	for(var i = 0; i < Largeur - 1; i++)
	{
		var New = [];
		for(var j = 0; j < Hauteur; j++)
		{
			New.push(true);
		}
		MursH.push(New);
	}
	var Historique = [0, 0];
	var Visite = [];
	for(var i = 0; i < Largeur; i++)
	{
		var New = [];
		for(var j = 0; j < Hauteur; j++)
		{
			New.push(false);
		}
		Visite.push(New);
	}
	Visite[0][0] = true;
	var Possible = Select(Historique[0], Historique[1], Visite);
	if(document.querySelector("#Anim").checked)
	{
		Animer(Possible, Historique, Visite);
	}
	else
	{
		Create(Possible, Historique, Visite);
	}
}
function Dessiner()
{
	Context.lineWidth = 2;
	Context.clearRect(0, 0, Largeur*Taille, Hauteur*Taille);
	for(var i = 0; i < Largeur; i++)
	{
		for(var j = 0; j < Hauteur - 1; j++)
		{
			if(MursL[i][j])
			{
				Context.beginPath();
					Context.moveTo(i*Taille, (j + 1)*Taille);
					Context.lineTo((i + 1)*Taille, (j + 1)*Taille);
					Context.stroke();
				Context.closePath();
			}
		}
	}
	for(var i = 0; i < Largeur - 1; i++)
	{
		for(var j = 0; j < Hauteur; j++)
		{
			if(MursH[i][j])
			{
				Context.beginPath();
					Context.moveTo((i + 1)*Taille, j*Taille);
					Context.lineTo((i + 1)*Taille, (j + 1)*Taille);
					Context.stroke();
				Context.closePath();
			}
		}
	}
	Context.fillStyle = "rgba(0, 255, 0, 1)";
	Context.fillRect(1, 1, Taille - 2, Taille - 2);
	Context.fillRect((Largeur - 1)*Taille + 1, (Hauteur - 1)*Taille + 1, Taille - 2, Taille - 2);
	Context.beginPath();
		Context.moveTo(0, 0);
		Context.lineTo(0, Hauteur*Taille);
		Context.moveTo(0, 0);
		Context.lineTo(Largeur*Taille, 0);
		Context.moveTo(Largeur*Taille, Hauteur*Taille);
		Context.lineTo(Largeur*Taille, 0);
		Context.moveTo(Largeur*Taille, Hauteur*Taille);
		Context.lineTo(0, Hauteur*Taille);
		Context.stroke();
	Context.closePath();
}
Add = function()
{
	document.addEventListener("keydown", function(event){Gestion(event)}, false);
	document.querySelector("#New").addEventListener("click", Generer, false);
	document.querySelector("#Solve").addEventListener("click", Solve, false);
	document.querySelector("#Convert").addEventListener("click", function()
	{
		window.open(document.querySelector("canvas").toDataURL());
	}, false);
	Context = document.querySelector("canvas").getContext("2d");
	Generer();
}