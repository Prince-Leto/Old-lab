var Context;
var Largeur;
var Hauteur;
var Timeout;
var Mem;
var Indice;
var Func = [Boulanger, Photomaton, Quad];
var FuncR = [BoulangerR, PhotomatonR, QuadR];
function Boulanger()
{
	var Dat = Context.getImageData(0, 0, Largeur, Hauteur).data;
	var Ne = Context.createImageData(Largeur, Hauteur);
	for(var i = 0; i < Largeur*Hauteur; i++)
	{
		var x = i%Largeur;
		var y = (i - x)/Largeur;
		if(y%2 == 0)
		{
			x *= 2;
			y /= 2;
		}
		else
		{
			x = 2*x + 1;
			y = (y - 1)/2;
		}
		if(x > Largeur - 1)
		{
			x = 2*Largeur - 1 - x;
			y = Hauteur - 1 - y;
		}
		var Pro = (x + Largeur*y)*4;
		Ne.data[Pro] = Dat[4*i];
		Ne.data[Pro + 1] = Dat[4*i + 1];
		Ne.data[Pro + 2] = Dat[4*i + 2];
		Ne.data[Pro + 3] = Dat[4*i + 3];
	}
	Context.putImageData(Ne, 0, 0);
}
function BoulangerR()
{
	var Dat = Context.getImageData(0, 0, Largeur, Hauteur).data;
	var Ne = Context.createImageData(Largeur, Hauteur);
	for(var i = 0; i < Largeur*Hauteur; i++)
	{
		var x = i%Largeur;
		var y = (i - x)/Largeur;
		if(y >= Hauteur/2)
		{
			x = 2*Largeur - 1 - x;
			y = Hauteur - 1 - y;
		}
		if(x%2 == 0)
		{
			x = x/2;
			y *= 2;
		}
		else
		{
			x = (x - 1)/2;
			y = 2*y + 1;
		}
		var Pro = (x + Largeur*y)*4;
		Ne.data[Pro] = Dat[4*i];
		Ne.data[Pro + 1] = Dat[4*i + 1];
		Ne.data[Pro + 2] = Dat[4*i + 2];
		Ne.data[Pro + 3] = Dat[4*i + 3];
	}
	Context.putImageData(Ne, 0, 0);
}
function Photomaton()
{
	var Dat = Context.getImageData(0, 0, Largeur, Hauteur).data;
	var Ne = Context.createImageData(Largeur, Hauteur);
	for(var i = 0; i < Largeur*Hauteur; i++)
	{
		var x = i%Largeur;
		var y = (i - x)/Largeur;
		x = x/2 + ((Largeur + Largeur%2)/2 - 1/2)*(x%2);
		y = y/2 + ((Hauteur + Hauteur%2)/2 - 1/2)*(y%2);
		var Pro = (x + Largeur*y)*4;
		Ne.data[Pro] = Dat[4*i];
		Ne.data[Pro + 1] = Dat[4*i + 1];
		Ne.data[Pro + 2] = Dat[4*i + 2];
		Ne.data[Pro + 3] = Dat[4*i + 3];
	}
	Context.putImageData(Ne, 0, 0);
}
function PhotomatonR()
{
	var Dat = Context.getImageData(0, 0, Largeur, Hauteur).data;
	var Ne = Context.createImageData(Largeur, Hauteur);
	for(var i = 0; i < Largeur*Hauteur; i++)
	{
		var x = i%Largeur;
		var y = (i - x)/Largeur;
		if(x < Largeur/2 && y < Hauteur/2)
		{
			x = 2*x;
			y = 2*y;
		}
		else if(x >= Largeur/2 && y < Hauteur/2)
		{
			x = 2*x - (Largeur + Largeur%2 - 1);
			y = 2*y;
		}
		else if(x < Largeur/2 && y >= Hauteur/2)
		{
			x = 2*x;
			y = 2*y - (Hauteur + Hauteur%2 - 1);
		}
		else
		{
			x = 2*x - (Largeur + Largeur%2 - 1);
			y = 2*y - (Hauteur + Hauteur%2 - 1);
		}
		var Pro = (x + Largeur*y)*4;
		Ne.data[Pro] = Dat[4*i];
		Ne.data[Pro + 1] = Dat[4*i + 1];
		Ne.data[Pro + 2] = Dat[4*i + 2];
		Ne.data[Pro + 3] = Dat[4*i + 3];
	}
	Context.putImageData(Ne, 0, 0);
}
function Modulo(a, b)
	{
		var Reste = a%b
		if(Reste < 0 && b > 0)
		{
			Reste += b;
		}
		return Reste;
	}
function Quad()
{
	var Dat = Context.getImageData(0, 0, Largeur, Hauteur).data;
	var Ne = Context.createImageData(Largeur, Hauteur);
	for(var i = 0; i < Largeur*Hauteur; i++)
	{
		var x = i%Largeur;
		var y = (i - x)/Largeur;
		y = Modulo(y - x, Hauteur);
		var Pro = (x + Largeur*y)*4;
		Ne.data[Pro] = Dat[4*i];
		Ne.data[Pro + 1] = Dat[4*i + 1];
		Ne.data[Pro + 2] = Dat[4*i + 2];
		Ne.data[Pro + 3] = Dat[4*i + 3];
	}
	Context.putImageData(Ne, 0, 0);
}
function QuadR()
{
	var Dat = Context.getImageData(0, 0, Largeur, Hauteur).data;
	var Ne = Context.createImageData(Largeur, Hauteur);
	for(var i = 0; i < Largeur*Hauteur; i++)
	{
		var x = i%Largeur;
		var y = (i - x)/Largeur;
		y = Modulo(y + x, Hauteur);
		var Pro = (x + Largeur*y)*4;
		Ne.data[Pro] = Dat[4*i];
		Ne.data[Pro + 1] = Dat[4*i + 1];
		Ne.data[Pro + 2] = Dat[4*i + 2];
		Ne.data[Pro + 3] = Dat[4*i + 3];
	}
	Context.putImageData(Ne, 0, 0);
}
function Lire(Titre)
{
	Indice = document.querySelector("select").selectedIndex;
	var Im = new Image();
	Im.src = Titre;
	Im.addEventListener("load", function()
	{
		Largeur = Im.width;
		Hauteur = Im.height;
		document.querySelector("canvas").width = Largeur;
		document.querySelector("canvas").height = Hauteur;
		Context.drawImage(Im, 0, 0);
		Mem = Context.getImageData(0, 0, Largeur, Hauteur);
		clearInterval(Timeout);
		Timeout = setInterval(Func[Indice], ~~(document.getElementById("Vitesse").value));
	}, false);
}
Add = function()
{
	Context = document.querySelector("canvas").getContext("2d");
	document.querySelector("input[type=file]").addEventListener("change", function()
	{
		var Reader = new FileReader();
		Reader.onload = function()
		{
			var Im = new Image();
			Im.src = Reader.result;
			Im.addEventListener("load", function()
			{
				Largeur = Im.width;
				Hauteur = Im.height;
				document.querySelector("canvas").width = Largeur;
				document.querySelector("canvas").height = Hauteur;
				Context.drawImage(Im, 0, 0);
				Mem = Context.getImageData(0, 0, Largeur, Hauteur);
				clearInterval(Timeout);
				if(document.getElementById("Lecture").src.indexOf("Ressources/Deformation/PlayerPause.png", 0) != -1)
				{
					Timeout = setInterval(Func[Indice], ~~(document.getElementById("Vitesse").value));
				}
			}, false);
		}
		Reader.readAsDataURL(document.querySelector("input[type=file]").files[0]);
	}, false);
	document.getElementById("Vitesse").addEventListener("change", function()
	{
		if(document.getElementById("Lecture").src.indexOf("Ressources/Deformation/PlayerPause.png", 0) != -1)
		{
			clearInterval(Timeout);
			Timeout = setInterval(Func[Indice], ~~(document.querySelector("input[type=range]").value));
		}
	}, false);
	document.querySelector("select").addEventListener("change", function()
	{
		Indice = document.querySelector("select").selectedIndex;
		clearInterval(Timeout);
		Context.putImageData(Mem, 0, 0);
		if(document.getElementById("Lecture").src.indexOf("Ressources/Deformation/PlayerPause.png", 0) != -1)
		{
			Timeout = setInterval(Func[Indice], ~~(document.getElementById("Vitesse").value));
		}
	}, false);
	document.getElementById("Start").addEventListener("click", function(){Context.putImageData(Mem, 0, 0);}, false);
	document.getElementById("Precedent").addEventListener("click", function(){FuncR[Indice]();}, false);
	document.getElementById("Lecture").addEventListener("click", function()
	{
		if(document.getElementById("Lecture").src.indexOf("Ressources/Deformation/PlayerPause.png", 0) != -1)
		{
			document.getElementById("Lecture").src = "Ressources/Deformation/PlayerPlay.png";
			clearInterval(Timeout);
		}
		else
		{
			document.getElementById("Lecture").src = "Ressources/Deformation/PlayerPause.png";
			Func[Indice]();
			Timeout = setInterval(Func[Indice], ~~(document.getElementById("Vitesse").value));
		}
	}, false);
	document.getElementById("Suivant").addEventListener("click", function(){Func[Indice]();}, false);
	Lire("Ressources/Deformation/Lena.png");
}