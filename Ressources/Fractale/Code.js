	function DivisionR(a, b)
	{
		return[Math.floor(a/b), Math.floor((a/b-Math.floor(a/b))*b)];
	}
	function Lancer(Taille, Precision, Abscisse, Abscisse2, Ordonnee, Ordonnee2, Complexe, Complexe2)
	{
		var Context = document.querySelector("canvas").getContext("2d");
		document.querySelector("canvas").width = Taille;
		document.querySelector("canvas").height = Math.floor(Taille*(Ordonnee2 - Ordonnee)/(Abscisse2 - Abscisse));
		var Travailleur = new Worker('Ressources/Fractale/Worker.js');
		var Tableau = document.querySelector("textarea").value.split("//");
		for(var i = 0; i < Tableau.length; i++)
		{
			Tableau[i] = Tableau[i].split(",");
			for(var j = 0; j < Tableau[i].length; j++)
			{
				Tableau[i][j] = ~~(Tableau[i][j]);
			}
		}
		var Decoupage = Precision/(Tableau.length - 2);
		var i = 0;
		var Pixel = Context.createImageData(Taille, 1);
		Travailleur.onmessage = function(event)
		{
			/*if(event.data == "Done")
			{
				document.querySelector("p").style.display = "none";
			}*/
			if(event.data != "Done") // else
			{
				if(i == 0)
				{
					Pixel = Context.createImageData(Taille, 1);
				}
				var Interstice = DivisionR(event.data[1], Decoupage);
				if(event.data[1] == Precision)
				{
					Pixel.data[4*i] = Tableau[Tableau.length - 1][0];
					Pixel.data[4*i + 1] = Tableau[Tableau.length - 1][1];
					Pixel.data[4*i + 2] = Tableau[Tableau.length - 1][2];
					Pixel.data[4*i + 3] = Tableau[Tableau.length - 1][3];
				}
				else
				{
					Pixel.data[4*i] = (Tableau[Interstice[0] + 1][0]-Tableau[Interstice[0]][0])/Decoupage*Interstice[1] + Tableau[Interstice[0]][0];
					Pixel.data[4*i + 1] = (Tableau[Interstice[0] + 1][1]-Tableau[Interstice[0]][1])/Decoupage*Interstice[1] + Tableau[Interstice[0]][1];
					Pixel.data[4*i + 2] = (Tableau[Interstice[0] + 1][2]-Tableau[Interstice[0]][2])/Decoupage*Interstice[1] + Tableau[Interstice[0]][2];
					Pixel.data[4*i + 3] = (Tableau[Interstice[0] + 1][3]-Tableau[Interstice[0]][3])/Decoupage*Interstice[1] + Tableau[Interstice[0]][3];
				}
				if(++i == Taille)
				{
					Context.putImageData(Pixel, 0, event.data[0]);
					i = 0;
				}
			}
		};
		if(isNaN(Complexe))
		{
			Complexe = "x";
		}
		if(isNaN(Complexe2))
		{
			Complexe2 = "y";
		}
		Travailleur.postMessage([[Taille, Math.floor(Taille*(Ordonnee2 - Ordonnee)/(Abscisse2 - Abscisse))], Precision, Abscisse, Abscisse2, Ordonnee, Ordonnee2, Complexe, Complexe2]);
	}
	Add = function()
	{
		document.querySelector("input[type=button]").addEventListener("click", Start, false);
		document.querySelectorAll("input[type=button]")[1].addEventListener("click", function(){window.open(document.querySelector("canvas").toDataURL(), "_blank", null);}, false);
		Start();
	}
	function Start()
	{
		//document.querySelector("p").style.display = "block";
		Lancer(~~(document.getElementById("Taille").value), ~~(document.getElementById("Precision").value),
		parseFloat(document.getElementById("Abscisse").value), parseFloat(document.getElementById("Abscisse2").value),
		parseFloat(document.getElementById("Ordonnee").value), parseFloat(document.getElementById("Ordonnee2").value),
		parseFloat(document.getElementById("Complexe").value), parseFloat(document.getElementById("Complexe2").value))
	}