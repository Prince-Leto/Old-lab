	var Table;
	var Taille;
	var Context;
	var Nombre;
	var Bombe;
	var First;
	function Reset()
	{
		First = true;
		Taille = ~~(document.getElementById("Size").value);
		Nombre = [~~(document.getElementById("Width").value), ~~(document.getElementById("Height").value)];
		document.querySelector("canvas").width = Nombre[0]*Taille;
		document.querySelector("canvas").height = Nombre[1]*Taille;
		Context.strokeStyle = "rgba(0, 0, 0, 1)";
		Context.fillStyle = "rgba(0, 0, 0, 1)";
		Context.beginPath();
			for(var i = 0; i <= Nombre[0]; i++)
			{
				Context.moveTo(Taille*i, 0);
				Context.lineTo(Taille*i, Nombre[1]*Taille);
			}
			for(var i = 0; i <= Nombre[1]; i++)
			{
				Context.moveTo(0, Taille*i);
				Context.lineTo(Nombre[0]*Taille, Taille*i);
			}
			Context.stroke();
		Context.closePath();
		for(var i = 0; i < Nombre[0]; i++)
		{
			for(var j = 0; j < Nombre[1]; j++)
			{
				Context.fillRect(i*Taille + 1, j*Taille + 1, Taille - 2, Taille - 2)
			}
		}
	}
	function Initialiser(x, y)
	{
		Table = [];
		Bombe = 0;
		for(var i = 0; i < Nombre[0]; i++)
		{
			var Pro = []
			for(var j = 0; j < Nombre[1]; j++)
			{
				if(Math.random()*100 > ~~(document.getElementById("Chance").value) || i == x && j == y)
				{
					Pro.push([0, 0]);
				}
				else
				{
					Pro.push([false, 0]);
					Bombe++;
				}			}
			Table.push(Pro);
		}
		var Calcul = function(i, j)
		{
			if(i >= 0 && i < Nombre[0] && j >= 0 && j < Nombre[1])
			{
				if(Table[i][j][0] === false)
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
		for(var i = 0; i < Nombre[0]; i++)
		{
			for(var j = 0; j < Nombre[1]; j++)
			{
				if(Table[i][j][0] !== false)
				{
					var Somme = Calcul(i-1, j-1) + Calcul(i, j-1) + Calcul(i+1, j-1) + Calcul(i-1, j) + Calcul(i+1, j) + Calcul(i-1, j+1) + Calcul(i, j+1) + Calcul(i+1, j+1);
					Table[i][j][0] = Somme;
				}
				//Context.fillRect(i*Taille + 1, j*Taille + 1, Taille - 2, Taille - 2)
			}
		}
	}
	function Cliquer(event)
	{
		var x;
		var y;
		var canvas = document.querySelector("canvas");
		if(event.x != undefined && event.y != undefined)
		{
			x = event.x;
			y = event.y;
		}
		else
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
		x = (x - x%Taille)/Taille;
		y = (y - y%Taille)/Taille;
		if(First)
		{
			Initialiser(x, y);
			First = false;
		}
		if(event.which == 3)
		{
			if(Table[x][y][1] != 1)
			{
				if(Table[x][y][1] == 0)
				{
					Table[x][y][1] = 2;
					Context.lineWidth = Taille/10;
					Context.lineCap = "butt";
					Context.strokeStyle = "rgba(255, 255, 255, 1)";
					Context.beginPath();
						Context.moveTo(x*Taille + 1 + Taille/20, y*Taille + 1 + Taille/20);
						Context.lineTo((x + 1)*Taille - 1 - Taille/20, (y + 1)*Taille - 1 - Taille/20);
						Context.moveTo(x*Taille + 1 + Taille/20, (y + 1)*Taille - 1 -  Taille/20);
						Context.lineTo((x + 1)*Taille - 1 -  Taille/20, y*Taille + 1 +  Taille/20);
						Context.stroke();
					Context.closePath();
				}
				else
				{
					Table[x][y][1] = 0;
					Context.fillStyle = "rgba(0, 0, 0, 1)";
					Context.fillRect(x*Taille + 1, y*Taille + 1, Taille - 2, Taille - 2);
				}
			}
		}
		else
		{
			if(Table[x][y][0] === false)
			{
				alert("Perdu !");
				Reset();
			}
			else if(Table[x][y][0] == 0 && Table[x][y][1] != 1)
			{
				//Context.clearRect(x*Taille + 1, y*Taille + 1, Taille - 2, Taille - 2);
				Context.fillStyle = "rgba(255, 255, 255, 1)";
				Context.fillRect(x*Taille + 1, y*Taille + 1, Taille - 2, Taille - 2);
				Table[x][y][1] = 1;
				var Calcul = function(i, j)
				{
					if(i >= 0 && i < Nombre[0] && j >= 0 && j < Nombre[1])
					{
						return Table[i][j];
					}
					else
					{
						return [false, 0];
					}
				}
				var Set = function(a, b)
				{
					var Value = Calcul(a, b);
					if(Value[0] !== false && Value[1] != 1)
					{
						Table[a][b][1] = 1;
						//Context.clearRect(a*Taille + 1, b*Taille + 1, Taille - 2, Taille - 2);
						Context.fillStyle = "rgba(255, 255, 255, 1)";
						Context.fillRect(a*Taille + 1, b*Taille + 1, Taille - 2, Taille - 2);
						if(Value[0] == 0)
						{
							ToDo.push([a, b]);
						}
						else
						{
							Context.fillStyle = "#AAAAAA";
							Context.font = Taille - 1 + "px Helvetica";
							Context.textAlign = "start";
							Context.textBaseline = "bottom";
							Context.fillText(Value[0], (a + 0.2)*Taille + 1, (b + 1)*Taille + 1, Taille - 2);
							//Context.drawImage(Images[Value[0] - 1], 0, 0, 30, 30, a*Taille + 1, b*Taille + 1, Taille - 2, Taille - 2);
						}
					}
				}
				var ToDo = [[x, y]];
				while(ToDo.length != 0)
				{
					Set(ToDo[0][0] - 1, ToDo[0][1] - 1);
					Set(ToDo[0][0], ToDo[0][1] - 1);
					Set(ToDo[0][0] + 1, ToDo[0][1] - 1);
					Set(ToDo[0][0] - 1, ToDo[0][1]);
					Set(ToDo[0][0] + 1, ToDo[0][1]);
					Set(ToDo[0][0] - 1, ToDo[0][1] + 1);
					Set(ToDo[0][0], ToDo[0][1] + 1);
					Set(ToDo[0][0] + 1, ToDo[0][1] + 1);
					ToDo.shift();
				}
			}
			else if(Table[x][y][1] != 1)
			{
				Table[x][y][1] = 1;
				//Context.clearRect(x*Taille + 1, y*Taille + 1, Taille - 2, Taille - 2);
				Context.fillStyle = "rgba(255, 255, 255, 1)";
				Context.fillRect(x*Taille + 1, y*Taille + 1, Taille - 2, Taille - 2);
				Context.fillStyle = "#AAAAAA";
				Context.font = Taille - 1 + "px Helvetica";
				Context.textAlign = "start";
				Context.textBaseline = "bottom";
				Context.fillText(Table[x][y][0], (x + 0.2)*Taille + 1, (y + 1)*Taille + 1, Taille - 2);
			}
			var Total = 0;
			for(var i = 0; i < Nombre[0]; i++)
			{
				for(var j = 0; j < Nombre[1]; j++)
				{
					if(Table[i][j][0] !== false && Table[i][j][1] == 1)
					{
						Total++;
					}
				}
			}
			if(Total == Nombre[0]*Nombre[1]-Bombe)
			{
				alert("Gagné !");
			}
		}
	}
	Add = function()
	{
		document.querySelector("canvas").addEventListener("mousedown", function(event){Cliquer(event)}, false);
		document.querySelector("canvas").oncontextmenu = function(){return false;};
		Context = document.querySelector("canvas").getContext("2d");
		Reset();
	}