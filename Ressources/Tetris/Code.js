var Context;
var Timeout;
var Position = [];
var Lignes = 0;
var Run = false;
var Taille = Math.floor((window.innerHeight - 200)/20);
var Image0 = new Image();
Image0.src = "Ressources/Tetris/Images/Gris.png";
var Image1 = new Image();
Image1.src = "Ressources/Tetris/Images/Bleu Marine.png";
var Image2 = new Image();
Image2.src = "Ressources/Tetris/Images/Bleu Clair.png";
var Image3 = new Image();
Image3.src = "Ressources/Tetris/Images/Jaune.png";
var Image4 = new Image();
Image4.src = "Ressources/Tetris/Images/Vert.png";
var Image5 = new Image();
Image5.src = "Ressources/Tetris/Images/Rouge.png";
var Image6 = new Image();
Image6.src = "Ressources/Tetris/Images/Rose-Violet.png";
function Couleur(Value)
{
	if(Value == 0)
	{
		return Image0;
		//return "rgba(92, 92, 92, 255)";
	}
	else if(Value == 1)
	{
		return Image1;
		//return "rgba(0, 18, 148, 255)";
	}
	else if(Value == 2)
	{
		return Image2;
		//return "rgba(71, 154, 181, 255)";
	}
	else if(Value == 3)
	{
		return Image3;
		//return "rgba(210, 212, 0, 255)";
	}
	else if(Value == 4)
	{
		return Image4;
		//return "rgba(324, 0, 0, 255)";
	}
	else if(Value == 5)
	{
		return Image5;
		//return "rgba(40, 169, 30, 255)";
	}
	else if(Value == 6)
	{
		return Image6;
		//return "rgba(182, 15, 218, 255)";
	}
}
function Random()
{
	var M = Math.floor(7*Math.random());
	if(M == 0)
	{
		// Carré
		return [[0, 0, 1, 1], [4, 5, 4, 5], 0];
	}
	else if(M == 1)
	{
		// S
		return [[1, 1, 0, 0], [4, 5, 5, 6], 1];
	}
	else if(M == 2)
	{
		// Z
		return [[0, 0, 1, 1], [4, 5, 5, 6], 2];
	}
	else if(M == 3)
	{
		// Baton
		return [[0, 0, 0, 0], [3, 4, 5, 6], 3];
	}
	else if(M == 4)
	{
		// Triangle
		return [[0, 0, 0, 1], [4, 6, 5, 5], 4];
	}
	else if(M == 5)
	{
		// J
		return [[0, 0, 0, 1], [4, 6, 5, 6], 5];
	}
	else if(M == 6)
	{
		// L
		return [[1, 0, 0, 0], [4, 4, 5, 6], 6];
	}
}
var Fonction = Random();
var Hauteur = Fonction[0];
var Largeur = Fonction[1];
var Type = Fonction[2];
Add = function()
{
	document.querySelector("canvas").height = Taille*20 + 2;
	document.querySelector("canvas").width = Taille*10 + 2;
	Context = document.querySelector("canvas").getContext("2d");
	document.addEventListener("keydown", function(event){Gestion(event)}, false);
	document.querySelector("input[type=button]").addEventListener("click", Initialisation, false);
	Initialisation();
}
function Initialisation()
{
	clearTimeout(Timeout);
	Context.fillStyle = "white";
	Context.fillRect(0, 0, Taille*10 + 2, Taille*20 + 2);
	//Context.clearRect(0, 0, Taille*10 + 2, Taille*20 + 2);
	Context.beginPath();
		Context.moveTo(0, 0);
		Context.lineTo(0, Taille*20 + 2);
		Context.lineTo(Taille*10 + 2, Taille*20 + 2);
		Context.lineTo(Taille*10 + 2, 0);
		Context.lineTo(0, 0);
		Context.stroke();
	Context.closePath();
	Position = [];
	for(var i = 0; i < 20; i++)
	{
		var Table = [];
		for(var j = 0; j < 10; j++)
		{
			Table.push([0, 0]);
		}
		Position.push(Table);
	}
	for(var l = 0; l < 4; l++)
	{
		Context.drawImage(Couleur(Type), 0, 0, 30, 30, Taille*Largeur[l] + 1, Taille*Hauteur[l] + 1, Taille, Taille);
		//Context.fillStyle = Couleur(Type);
		//Context.fillRect(Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
	}
	Run = true;
	Lignes = 0;
	document.getElementById("Lines").innerHTML = Lignes;
	document.getElementById("Level").innerHTML = 1;
	Timeout = setTimeout(Progression, 800/Math.exp(2)*Math.exp(-0.3*Math.floor(Lignes/10)+2));
}
function Progression()
{
	if(!Progress())
	{
		Timeout = setTimeout(Progression, 800/Math.exp(2)*Math.exp(-0.3*Math.floor(Lignes/10)+2));
		Run = true;
	}
}
function Progress()
{
	var Bool = false;
	var Return = false;
	for(var l = 0; l < 4; l++)
	{
		if(!Bool && (Hauteur[l] == 19 || Position[Hauteur[l]+1][Largeur[l]][0] == 1))
		{
			Bool = true;
		}
	}
	if(Bool)
	{
		for(var l = 0; l < 4; l++)
		{
			Position[Hauteur[l]][Largeur[l]] = [1, Type];
		}
		for(var i = 0; i < 20; i++)
		{
			var Compte = 0;
			for(var j = 0; j < 10; j++)
			{
				if(Position[i][j][0] == 1)
				{
					Compte++;
				}
			}
			if(Compte == 10)
			{
				//document.getElementById("Audio").play();
				Lignes++;
				var Table = [];
				for(var k = 0; k < 10; k++)
				{
					Table.push([0, 0]);
				}
				Table = [Table];
				for(var k = 0; k < 20; k++)
				{
					if(i != k)
					{
						Table.push(Position[k]);
					}
				}
				Position = Table;
				Context.fillStyle = "white";
				Context.fillRect(1, 1, Taille*10, Taille*20);
				//Context.clearRect(1, 1, Taille*10, Taille*20);
				for(var k = 0; k < 20; k++)
				{
					for(var j = 0; j < 10; j++)
					{
						if(Position[k][j][0] == 1)
						{
							Context.drawImage(Couleur(Position[k][j][1]), 0, 0, 30, 30, Taille*j + 1, Taille*k + 1, Taille, Taille);
							//Context.fillStyle = Couleur(Position[k][j][1]);
							//Context.fillRect(Taille*j+1, Taille*k+1, Taille, Taille);
						}
					}
				}
				document.getElementById("Lines").innerHTML = Lignes;
				document.getElementById("Level").innerHTML = Math.floor(Lignes/10) + 1;
			}
		}
		var Bool = false;
		for(var l = 0; l < 4; l++)
		{
			if(!Bool && Hauteur[l] == 0)
			{
				Bool = true;
			}
		}
		if(Bool)
		{
			for(var l = 0; l < 4; l++)
			{
				Context.drawImage(Couleur(Type), 0, 0, 30, 30, Taille*Largeur[l] + 1, Taille*Hauteur[l] + 1, Taille, Taille);
				//Context.fillStyle = Couleur(Type);
				//Context.fillRect(Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
			}
			clearTimeout(Timeout);
			alert("Perdu !");
			Return = true;
		}
		if(!Return)
		{
			Fonction = Random();
			Hauteur = Fonction[0];
			Largeur = Fonction[1];
			Type = Fonction[2];
			for(var l = 0; l < 4; l++)
			{
				Context.drawImage(Couleur(Type), 0, 0, 30, 30, Taille*Largeur[l] + 1, Taille*Hauteur[l] + 1, Taille, Taille);
				//Context.fillStyle = Couleur(Type);
				//Context.fillRect(Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
			}
		}
	}
	else
	{
		for(var l = 0; l < 4; l++)
		{
			Context.fillStyle = "white";
			Context.fillRect(Taille*Largeur[l] + 1, Taille*Hauteur[l] + 1, Taille, Taille)
			//Context.clearRect(Taille*Largeur[l] + 1, Taille*Hauteur[l] + 1, Taille, Taille);
		}
		for(var l = 0; l < 4; l++)
		{
			Context.drawImage(Couleur(Type), 0, 0, 30, 30, Taille*Largeur[l]+1, Taille*++Hauteur[l]+1, Taille, Taille);
			//Context.fillStyle = Couleur(Type);
			//Context.fillRect(Taille*Largeur[l]+1, Taille*++Hauteur[l]+1, Taille, Taille);
		}
	}
	return Return;
}
function Gestion(Eve)
{
	if(Eve.keyCode == 39 || Eve.keyCode == 37)
	{
		var Phase;
		if(Eve.keyCode == 39)
		{
			Phase = 1;
		}
		else
		{
			Phase = -1;
		}
		var Bool = true;
		for(var l = 0; l < 4; l++)
		{
			if(!Bool || Largeur[l]+Phase < 0 || Largeur[l]+Phase >= 10 || Position[Hauteur[l]][Largeur[l]+Phase][0] == 1)
			{
				Bool = false;
			}
		}
		if(Bool)
		{
			for(var l = 0; l < 4; l++)
			{
				Context.fillStyle = "white";
				Context.fillRect(Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
				//Context.clearRect(Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
				Largeur[l] = Largeur[l]+Phase;
			}
			for(var l = 0; l < 4; l++)
			{
				Context.drawImage(Couleur(Type), 0, 0, 30, 30, Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
				//Context.fillStyle = Couleur(Type);
				//Context.fillRect(Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
			}
		}
	}
	else if(Eve.keyCode == 38)
	{
		var Bool = true;
		var HauteurPro = [];
		var LargeurPro = [];
		for(var l = 0; l < 4; l++)
		{
			//HauteurPro.push(Largeur[l] + Hauteur[2] - Largeur[2]);
			//LargeurPro.push(Hauteur[2] + Largeur[2] - Hauteur[l]);
			HauteurPro.push(Hauteur[2] + Largeur[2] - Largeur[l]);
			LargeurPro.push(Largeur[2] + Hauteur[l] - Hauteur[2]);
			if(!Bool || HauteurPro[l] < 0 || HauteurPro[l] >= 20 || LargeurPro[l] < 0 || LargeurPro[l] >= 10 || Position[HauteurPro[l]][LargeurPro[l]][0] == 1)
			{
				Bool = false;
			}
		}
		if(Bool)
		{
			for(var l = 0; l < 4; l++)
			{
				Context.fillSTyle = "white";
				Context.fillRect(Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
				//Context.clearRect(Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
			}
			Hauteur = HauteurPro;
			Largeur = LargeurPro;
			for(var l = 0; l < 4; l++)
			{
				Context.drawImage(Couleur(Type), 0, 0, 30, 30, Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
				//Context.fillStyle = Couleur(Type);
				//Context.fillRect(Taille*Largeur[l]+1, Taille*Hauteur[l]+1, Taille, Taille);
			}
		}
	}
	else if(Eve.keyCode == 40)
	{
		Progress();
	}
	else if(Eve.keyCode == 80)
	{
		if(Run)
		{
			Run = false;
			clearTimeout(Timeout);
		}
		else
		{
			Run = true;
			Progression();
		}
	}
}