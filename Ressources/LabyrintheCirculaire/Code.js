var Context;
var Taille;
var Ronds;
var MursRonds, MursRad, Visite, Start, Interval, Time, PP;
var Running1 = false;
var Running2 = false;
var Tolerance = Math.PI/3;
function Solve()
{
	var Position = [Ronds - 1, 0];
	var Historique = [[Position[0], Position[1]]];
	var Visited = [];
	for(var i = -1; i < Ronds - 1; i++)
	{
		var New = [];
		for(var j = 0; j < (i + 3) + i%2; j++)
		{
			New.push(false);
		}
		Visited.push(New);
	}
	Visited[Position[0]][Position[1]] = true;
	var Draw = function()
	{
		if(Position[0] == 0 && Position[1] == 0)
		{
			Running2 = false;
			clearInterval(Time);
			document.querySelector("#Soudre").value = "Effacer";
		}
		else
		{
			var Looked = Next(Position[0], Position[1], Visited).sort(Trier);
			if(Looked.length === 0)
			{
				Historique.pop();
				Position = Historique[Historique.length - 1];
			}
			else
			{
				Historique.push(Looked[0]);
				Position = Looked[0];
				Visited[Position[0]][Position[1]] = true;
			}
			MyD(Historique);
		}
	}
	Running2 = true;
	Time = setInterval(Draw, ~~(document.querySelector("#Speed2").value));
}
function Next(a, b, V)
{
	var	Look = Find(a, b, V);
	var Poss = [];
	var Murs;
	var LookLength = Look.length
	for(var i = 0; i < LookLength; i++)
	{
		if(Look[i][0] == a)
		{
			var Max = Math.max(Look[i][1], b);
			if(Math.min(Look[i][1], b) == 0 && Max == (Look[i][0] + 1) + (Look[i][0] + 1)%2)
			{
				Murs = [0, Look[i][0] - 1, 0];
			}
			else
			{
				Murs = [0, Look[i][0] - 1, Max];
			}
		}
		else
		{
			var Max, Min;
			if(a < Look[i][0])
			{
				Max = Look[i];
				Min = [a, b];
			}
			else
			{
				Max = [a, b];
				Min = Look[i];
			}
			if(Min[0]%2 == 0)
			{
				var Pioupiou = Max[1] + Min[1];
				if(Max[1] == 0 && Min[1] == Min[0] + 2)
				{
					Pioupiou = 2*Pioupiou + 1;
				}
				Murs = [1, Min[0], Pioupiou];
			}
			else
			{
				if(Min[1] == 0 && Max[1] == Max[0] + 2)
				{
					Murs = [1, Min[0], 2*(Max[0] + 1) + 1];
				}
				else
				{
					var Angle1 = Math.PI*2/(2*~~(Min[0]/2 + 1) + 1)*(Min[1] + 1) - Min[0]%2*Math.PI/(2*~~(Min[0]/2 + 1) + 1);
					var Angle2 = Math.PI*2/(2*~~(Max[0]/2 + 1) + 1)*(Max[1] + 1) - Max[0]%2*Math.PI/(2*~~(Max[0]/2 + 1) + 1);
					var Minus = Math.min(Angle1, Angle2);
					var Re = 0;
					var Compteur = 0;
					var Compte = [1, 1];
					while(Re < Minus)
					{
						var Un = (Math.PI*2)/(Min[0] + 4)*Compte[0];
						var Deux = (Math.PI*2/(Min[0] + 2))*Compte[1] - Math.PI/(Min[0] + 2);
						if(Un < Deux)
						{
							Re = Un;
							Compte[0]++;
						}
						else
						{
							Re = Deux;
							Compte[1]++;
						}
						Compteur++;
					}
					Murs = [1, Min[0], --Compteur];	
				}
			}
		}
		if(Murs[0] == 1 && !MursRonds[Murs[1]][Murs[2]])
		{
			Poss.push(Look[i]);
		}
		else if(Murs[0] == 0 && !MursRad[Murs[1]][Murs[2]])
		{
			Poss.push(Look[i]);
		}
	}
	return Poss;
}
function Trier(a, b)
{
	if(a[0] < b[0])
	{
		return -1;
	}
	else if(a[0] > b[0])
	{
		return 1;
	}
	else
	{
		return 0;
	}
}
function MyD(His)
{
	Dessiner();
	var HisLength = His.length
	for(var i = 0; i < HisLength; i++)
	{
		if(His[i][0] == 0)
		{
			Context.fillStyle = "rgba(0, 0, 255, 0.7)";
			Context.beginPath();
				Context.arc(Taille*Ronds + 5, Taille*Ronds + 5, Taille, 0, Math.PI*2);
				Context.fill();
			Context.closePath();
		}
		else
		{
			Context.lineWidth = Taille;
			Context.strokeStyle = "rgba(0, 0, 255, 0.7)";
			Context.beginPath();
				var Pro = (His[i][0] + 1)%2*Math.PI*2/(His[i][0] + 3)*(His[i][1] + 1/2) - (His[i][0] + 1)%2*Math.PI*2/(His[i][0] + 3)/2 + His[i][0]%2*Math.PI/(His[i][0] + 2)*His[i][1]*2 - His[i][0]%2*Math.PI/(His[i][0] + 2);
				var Pro2 = (His[i][0] + 1)%2*Math.PI*2/(His[i][0] + 3)*(His[i][1] + 3/2) - (His[i][0] + 1)%2*Math.PI*2/(His[i][0] + 3)/2 + His[i][0]%2*Math.PI/(His[i][0] + 2)*(His[i][1] + 1)*2 - His[i][0]%2*Math.PI/(His[i][0] + 2);
				Context.arc(Taille*Ronds + 5, Taille*Ronds + 5, Taille*(His[i][0] + 1/2), - Pro, - Pro2, true);
				Context.stroke();
			Context.closePath();
			Context.strokeStyle = "black";
			Context.lineWidth = 1;
		}
	}
}
function Solution()
{
	var Position = [Ronds - 1, 0];
	var Historique = [[Position[0], Position[1]]];
	var Visited = [];
	for(var i = -1; i < Ronds - 1; i++)
	{
		var New = [];
		var Calcul = (i + 3) + i%2
		for(var j = 0; j < Calcul; j++)
		{
			New.push(false);
		}
		Visited.push(New);
	}
	Visited[Position[0]][Position[1]] = true;
	var Continue = true;
	while(Continue)
	{
		if(Position[0] == 0 && Position[1] == 0)
		{
			Continue = false;
		}
		else
		{
			var Looked = Next(Position[0], Position[1], Visited).sort(Trier);
			if(Looked.length === 0)
			{
				Historique.pop();
				Position = Historique[Historique.length - 1];
			}
			else
			{
				Historique.push(Looked[0]);
				Position = Looked[0];
				Visited[Position[0]][Position[1]] = true;
			}
		}	
	}
	MyD(Historique);
	document.querySelector("#Soudre").value = "Effacer";
}
function Begin()
{
	Running1 = false;
	Running2 = false;
	clearInterval(Interval);
	clearInterval(Time);
	document.querySelector("#Soudre").value = "Résoudre";
	Taille = ~~(document.querySelector("#Rayon").value);
	Ronds = ~~(document.querySelector("#NbRonds").value);
	PP = [Ronds - 1, 0];
	Start = [PP[0], PP[1]];
	Set();
	MursRonds[Ronds - 1][0] = false;
	if(document.querySelector("#Anim").checked)
	{
		Dessiner();
		Running1 = true;
		Interval = setInterval(Construire, ~~(document.querySelector("#Speed").value));
	}
	else
	{
		Build();
		Dessiner();
	}
}
function Build()
{
	var Continue = true;
	while(Continue)
	{
		var Table = Find(Start[0], Start[1], Visite);
		if(Table.length !== 0)
		{
			var M = Table[~~(Math.random()*Table.length)];
			if(M[0] == Start[0])
			{
				var Max = Math.max(M[1], Start[1]);
				if(Math.min(M[1], Start[1]) == 0 && Max == (M[0] + 1) + (M[0] + 1)%2)
				{
					MursRad[M[0] - 1][0] = false;
					//Context.clear
				}
				else
				{
					MursRad[M[0] - 1][Max] = false;
				}
			}
			else
			{
				var Max, Min;
				if(Start[0] < M[0])
				{
					Max = M;
					Min = Start;
				}
				else
				{
					Max = Start;
					Min = M;
				}
				if(Min[0]%2 == 0)
				{
					var Pioupiou = Max[1] + Min[1];
					if(Max[1] == 0 && Min[1] == Min[0] + 2)
					{
						Pioupiou = 2*Pioupiou + 1;
					}
					MursRonds[Min[0]][Pioupiou] = false;
				}
				else
				{
					if(Min[1] == 0 && Max[1] == Max[0] + 2)
					{
						MursRonds[Min[0]][2*(Max[0] + 1) + 1] = false;
					}
					else
					{
						var Angle1 = Math.PI*2/(2*~~(Min[0]/2 + 1) + 1)*(Min[1] + 1) - Min[0]%2*Math.PI/(2*~~(Min[0]/2 + 1) + 1);
						var Angle2 = Math.PI*2/(2*~~(Max[0]/2 + 1) + 1)*(Max[1] + 1) - Max[0]%2*Math.PI/(2*~~(Max[0]/2 + 1) + 1);
						var Minus = Math.min(Angle1, Angle2);
						var Re = 0;
						var Compteur = 0;
						var Compte = [1, 1];
						while(Re < Minus)
						{
							var Un = (Math.PI*2)/(Min[0] + 4)*Compte[0];
							var Deux = (Math.PI*2/(Min[0] + 2))*Compte[1] - Math.PI/(Min[0] + 2);
							if(Un < Deux)
							{
								Re = Un;
								Compte[0]++;
							}
							else
							{
								Re = Deux;
								Compte[1]++;
							}
							Compteur++;
						}
						MursRonds[Min[0]][--Compteur] = false;	
					}
				}
			}
			Start = M;
			Visite[Start[0]][Start[1]] = true;
		}
		else
		{
			var NewGo = [];
			for(var i = 0; i < Ronds; i++)
			{
				var Calcul = (i + 3) + i%2
				for(var j = 0; j < Calcul; j++)
				{
					if(Visite[i][j] && Find(i, j, Visite).length !== 0)
					{
						NewGo.push([i, j]);
					}
				}
			}
			if(NewGo.length === 0)
			{
				var Continue = false;
			}
			else
			{
				Start = NewGo[~~(Math.random()*NewGo.length)];	
			}
		}
	}
	document.querySelector("#Soudre").disabled = false;
}
function Construire()
{
	document.querySelector("#Soudre").disabled = true;
	var Table = Find(Start[0], Start[1], Visite);
	if(Table.length !== 0)
	{
		var M = Table[~~(Math.random()*Table.length)];
		if(M[0] == Start[0])
		{
			var Max = Math.max(M[1], Start[1]);
			if(Math.min(M[1], Start[1]) == 0 && Max == (M[0] + 1) + (M[0] + 1)%2)
			{
				MursRad[M[0] - 1][0] = false;
				//Context.clear
			}
			else
			{
				MursRad[M[0] - 1][Max] = false;
			}
		}
		else
		{
			var Max, Min;
			if(Start[0] < M[0])
			{
				Max = M;
				Min = Start;
			}
			else
			{
				Max = Start;
				Min = M;
			}
			if(Min[0]%2 == 0)
			{
				var Pioupiou = Max[1] + Min[1];
				if(Max[1] == 0 && Min[1] == Min[0] + 2)
				{
					Pioupiou = 2*Pioupiou + 1;
				}
				MursRonds[Min[0]][Pioupiou] = false;
			}
			else
			{
				if(Min[1] == 0 && Max[1] == Max[0] + 2)
				{
					MursRonds[Min[0]][2*(Max[0] + 1) + 1] = false;
				}
				else
				{
					var Angle1 = Math.PI*2/(2*~~(Min[0]/2 + 1) + 1)*(Min[1] + 1) - Min[0]%2*Math.PI/(2*~~(Min[0]/2 + 1) + 1);
					var Angle2 = Math.PI*2/(2*~~(Max[0]/2 + 1) + 1)*(Max[1] + 1) - Max[0]%2*Math.PI/(2*~~(Max[0]/2 + 1) + 1);
					var Minus = Math.min(Angle1, Angle2);
					var Re = 0;
					var Compteur = 0;
					var Compte = [1, 1];
					while(Re < Minus)
					{
						var Un = (Math.PI*2)/(Min[0] + 4)*Compte[0];
						var Deux = (Math.PI*2/(Min[0] + 2))*Compte[1] - Math.PI/(Min[0] + 2);
						if(Un < Deux)
						{
							Re = Un;
							Compte[0]++;
						}
						else
						{
							Re = Deux;
							Compte[1]++;
						}
						Compteur++;
					}
					MursRonds[Min[0]][--Compteur] = false;	
				}
			}
		}
		Start = M;
		Visite[Start[0]][Start[1]] = true;
	}
	else
	{
		var NewGo = [];
		for(var i = 0; i < Ronds; i++)
		{
			var Calcul = (i + 3) + i%2;
			for(var j = 0; j < Calcul; j++)
			{
				if(Visite[i][j] && Find(i, j, Visite).length !== 0)
				{
					NewGo.push([i, j]);
				}
			}
		}
		if(NewGo.length === 0)
		{
			document.querySelector("#Soudre").disabled = false;
			Running1 = false;
			clearInterval(Interval);
			Dessiner();
		}
		else
		{
			Start = NewGo[~~(Math.random()*NewGo.length)];	
		}
	}
	Dessiner();
}
function Set()
{
	document.querySelector("canvas").width = Taille*Ronds*2 + 10;
	document.querySelector("canvas").height = Taille*Ronds*2 + 10;
	MursRad = [];
	for(var i = 0; i < Ronds - 1; i++)
	{
		var New = [];
		var Calcul = (i + 3) + i%2;
		for(var j = 0; j < Calcul; j++) // Math.pow(2, i) Rigolo !
		{
			New.push(true);
		}
		MursRad.push(New);
	}
	MursRonds = [[true, true, true]];
	for(var i = 1; i < Ronds; i++)
	{
		var New = [];
		var Calcul = 2*(i + 3);
		for(var j = 0; j < Calcul; j++)
		{
			New.push(true);
		}
		MursRonds.push(New);
	}
	Visite = [];
	for(var i = -1; i < Ronds - 1; i++)
	{
		var New = [];
		var Calcul = (i + 3) + i%2;
		for(var j = 0; j < Calcul; j++)
		{
			New.push(false);
		}
		Visite.push(New);
	}
	Visite[Start[0]][Start[1]] = true;
}
function Find(a, b, V)
{
	var Output = [];
	if(a != 0)
	{
		if(!V[a][Modulo(b + 1, a + 2 + (a + 1)%2)])
		{
			Output.push([a, Modulo(b + 1, a + 2 + (a + 1)%2)])
		}
		if(!V[a][Modulo(b - 1, a + 2 + (a + 1)%2)])
		{
			Output.push([a, Modulo(b - 1, a + 2 + (a + 1)%2)])
		}
		if(a%2 == 0)
		{
			if(a == 0)
			{
				for(var i = 0; i < 3; i++)
				{
					if(!V[a + 1][i])
					{
						Output.push([a + 1, i]);
					}
				}
			}
			else
			{
				var AnglesLimites = [(Math.PI*2)/((a + 3) + a%2)*b + a%2*(Math.PI*2)/((a + 3) + a%2)/2 + Tolerance/a, (Math.PI*2)/((a + 3) + a%2)*(b + 1) + a%2*(Math.PI*2)/((a + 3) + a%2)/2 - Tolerance/a];
				var Selection = [];
				for(var i = 0; i < a + 1; i++)
				{
					var Pro = (Math.PI*2)/((a + 1) + a%2)*i + (a + 1)%2*(Math.PI*2)/((a + 1) + a%2)/2;
					if(AnglesLimites[0] < Pro && AnglesLimites[1] > Pro)
					{
						Selection.push(i);
					}
				}
				if(Selection.length === 0)
				{
					var i = 0;
					while((Math.PI*2)/((a + 1) + a%2)*i + (a + 1)%2*(Math.PI*2)/((a + 1) + a%2)/2 < AnglesLimites[1])
					{
						i++;
					}
					if(!V[a - 1][Modulo(i, a + 1)])
					{
						Output.push([a - 1, Modulo(i, a + 1)]);
					}
				}
				else
				{
					var SelectionLength = Selection.length
					for(var i = 0; i < SelectionLength; i++)
					{
						if(!V[a - 1][Selection[i]])
						{
							Output.push([a - 1, Selection[i]]);
						}
					}
					if(!V[a - 1][Modulo(Selection[0] + 1, a + 1)])
					{
						Output.push([a - 1, Modulo(Selection[0] + 1, a + 1)]);
					}
				}
				if(a + 1 < Ronds)
				{
					if(!V[a + 1][b])
					{
						Output.push([a + 1, b]);
					}
					if(!V[a + 1][Modulo(b + 1, a + 3)])
					{
						Output.push([a + 1, Modulo(b + 1, a + 3)])	
					}
				}
			}
		}
		else
		{
			if(a == 1)
			{
				if(!V[0][0])
				{
					Output.push([0, 0]);
				}
			}
			else
			{
				if(!V[a - 1][Modulo(b - 1, a + 2)])
				{
					Output.push([a - 1, Modulo(b - 1, a + 2)]);
				}
				if(!V[a - 1][b])
				{
					Output.push([a - 1, Modulo(b, a + 2)])	
				}
			}
			if(a + 1 < Ronds)
			{
				var AnglesLimites = [(Math.PI*2)/((a + 1) + a%2)*(b - 1) + a%2*(Math.PI*2)/((a + 1) + a%2)/2 + Tolerance/a, (Math.PI*2)/((a + 1) + a%2)*b + a%2*(Math.PI*2)/((a + 1) + a%2)/2 - Tolerance/a];
				var Selection = [];
				var Calcul = (a + 3) + a%2
				for(var i = 0; i < Calcul; i++)
				{
					var Pro = (Math.PI*2)/((a + 3) + a%2)*i + (a + 1)%2*(Math.PI*2)/((a + 3) + a%2)/2;
					if(AnglesLimites[0]< Pro && AnglesLimites[1]> Pro)
					{
						Selection.push(i);
					}
				}
				if(Selection.length === 0)
				{
					var i = 0;
					while((Math.PI*2)/((a + 3) + a%2)*i + (a + 1)%2*(Math.PI*2)/((a + 3) + a%2)/2 < AnglesLimites[1])
					{
						i++;
					}
					if(!V[a + 1][Modulo(i - 1, a + 4)])
					{
						Output.push([a + 1, Modulo(i - 1, a + 4)]);
					}
				}
				else
				{
					if(!V[a + 1][Modulo(Selection[0] - 1, a + 4)])
					{
						Output.push([a + 1, Modulo(Selection[0] - 1, a + 4)]);
					}
					var SelectionLength = Selection.length
					for(var i = 0; i < SelectionLength; i++)
					{
						if(!V[a + 1][Modulo(Selection[i], a + 4)])
						{
							Output.push([a + 1, Modulo(Selection[i], a + 4)]);
						}
					}
				}
			}
		}
	}
	else
	{
		Output = [];
	}
	return Output;
}
function Modulo(a, b)
{
	var Out = a%b;
	if(a < 0 && b > 0)
	{
		Out += b;
	}
	return Out;
}
function Dessiner()
{
	Context.clearRect(0, 0, Taille*Ronds*2 + 10, Taille*Ronds*2 + 10);
	Context.lineWidth = Taille;
	Context.strokeStyle = "rgba(0, 255, 0, 1)";
	Context.beginPath();
		var Pro = (PP[0] + 1)%2*Math.PI*2/(PP[0] + 3)*(PP[1] + 1/2) - (PP[0] + 1)%2*Math.PI*2/(PP[0] + 3)/2 + PP[0]%2*Math.PI/(PP[0] + 2)*PP[1]*2 - PP[0]%2*Math.PI/(PP[0] + 2);
		var Pro2 = (PP[0] + 1)%2*Math.PI*2/(PP[0] + 3)*(PP[1] + 3/2) - (PP[0] + 1)%2*Math.PI*2/(PP[0] + 3)/2 + PP[0]%2*Math.PI/(PP[0] + 2)*(PP[1] + 1)*2 - PP[0]%2*Math.PI/(PP[0] + 2);
		Context.arc(Taille*Ronds + 5, Taille*Ronds + 5, Taille*(PP[0] + 1/2), - Pro, - Pro2, true);
		Context.stroke();
	Context.closePath();
	Context.strokeStyle = "black";
	Context.lineWidth = 1;
	Context.fillStyle = "rgba(0, 255, 0, 0.8)";
	Context.beginPath();
		Context.arc(Taille*Ronds + 5, Taille*Ronds + 5, Taille, 0, Math.PI*2);
		Context.fill();
	Context.closePath();
	for(var i = 0; i < Ronds - 1; i++)
	{
		var Calcul = (i + 3) + i%2
		for(var j = 0; j < Calcul; j++)
		{
			if(MursRad[i][j])
			{
				var Pro = (Math.PI*2)/((i + 3) + i%2)*j - (i + 1)%2*(Math.PI*2)/((i + 3) + i%2)/2;
				Context.beginPath();
					Context.moveTo(Taille*Ronds + 5 + Math.cos(Pro)*Taille*(i + 1), Taille*Ronds + 5 - Math.sin(Pro)*Taille*(i + 1));
					Context.lineTo(Taille*Ronds + 5 + Math.cos(Pro)*Taille*(i + 2), Taille*Ronds + 5 - Math.sin(Pro)*Taille*(i + 2));
					Context.stroke();
				Context.closePath();
			}
		}
}
	for(var i = 0; i < Ronds; i++)
	{
		var Mem = 0;
		var Compte = [1, 1];
		var Calcul = 2*(i + 3)
		for(var j = 0; j < Calcul; j++)
		{
			if(i%2 == 0)
			{
				if(i == 0)
				{
					if(MursRonds[i][j])
					{
						var Pro = 2*Math.PI/3;
						Context.beginPath();
							Context.arc(Taille*Ronds + 5, Taille*Ronds + 5, Taille*(i + 1), - Pro*j - 5*Math.PI/3, - Pro*(j + 1) - 5*Math.PI/3, true);
							Context.stroke();
						Context.closePath();
					}	
				}
				else
				{
					if(MursRonds[i][j])
					{
						var Pro = Math.PI/(i + 3);
						Context.beginPath();
							Context.arc(Taille*Ronds + 5, Taille*Ronds + 5, Taille*(i + 1), - Pro*j, - Pro*(j + 1), true);
							Context.stroke();
						Context.closePath();
					}
				}
			}
			else
			{
				var Re;
				var Un = (Math.PI*2)/(i + 4)*Compte[0];
				var Deux = (Math.PI*2/(i + 2))*Compte[1] - Math.PI/(i + 2);
				if(Un < Deux)
				{
					Re = Un;
					Compte[0]++;
				}
				else
				{
					Re = Deux;
					Compte[1]++;
				}
				if(MursRonds[i][j])
				{
					Context.beginPath();
						Context.arc(Taille*Ronds + 5, Taille*Ronds + 5, Taille*(i + 1), - Mem, - Re, true);
						Context.stroke();
					Context.closePath();
				}
				Mem = Re;
			}
		}
	}
}
function Deleguate()
{
	Running2 = false;
	clearInterval(Time);
	if(document.querySelector("#Soudre").value == "Effacer")
	{
		Dessiner();
		document.querySelector("#Soudre").value = "Résoudre";
	}
	else
	{
		if(document.querySelector("#Anim2").checked)
		{
			Solve();
		}
		else
		{
			Solution();
		}
	}
}
Add = function()
{
	Context = document.querySelector("canvas").getContext("2d");
	document.querySelector("#Ste").addEventListener("click", Begin, false);
	document.querySelector("#Convert").addEventListener("click", function()
	{
		window.open(document.querySelector("canvas").toDataURL());
	}, false);
	document.querySelector("#Soudre").addEventListener("click", Deleguate, false);
	document.querySelector("#Speed").addEventListener("change", function()
	{
		if(Running1)
		{
			clearInterval(Interval);
			Interval = setInterval(Construire, ~~(document.querySelector("#Speed").value));
		}
	}, false);
	Begin();
}