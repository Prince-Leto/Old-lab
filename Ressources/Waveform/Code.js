var Largeur;
var Hauteur;
var ID;
var Lecture = false;
var Taille, Taille2, Min, Max, Mo, Context, D, Angle;
window.requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(Callback, Element)
	{
		window.setTimeout(Callback, 1000/60);
	};
})();
function Reload()
{
	ID.src = "Ressources/Waveform/" + document.querySelector("select").options[document.querySelector("select").selectedIndex].value + ".mp3";
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
		{
			eval(xhr.responseText);
			Taille = Data.length;
			Taille2 = Data2.length;
			Max = Data[0];
			Min = Data[0];
			Mo = Data[0];
			Max2 = Data2[0];
			Min2 = Data2[0];
			Mo2 = Data2[0];
			for(var i = 1; i < Taille; i++)
			{
				if(Max < Data[i])
				{
					Max = Data[i];
				}
				if(Min > Data[i])
				{
					Min = Data[i];
				}
				Mo += Data[i];
			}
			Mo /= Taille;
			for(var i = 1; i < Taille2; i++)
			{
				if(Max2 < Data2[i])
				{
					Max2 = Data2[i];
				}
				if(Min2 > Data2[i])
				{
					Min2 = Data2[i];
				}
				Mo2 += Data2[i];
			}
			Mo2 /= Taille2;
			D3();
		}
	};
	xhr.open("GET", "Ressources/Waveform/" + document.querySelector("select").options[document.querySelector("select").selectedIndex].value + ".js");
	xhr.send();
}
Add = function()
{
	Context = document.querySelector("canvas").getContext("2d");
	document.querySelector("select").addEventListener("change", Reload, false);
	document.querySelector("input[type=range]").addEventListener("change", function(){if(!Lecture){D3();}}, false);
	document.querySelector("#Amplitude").addEventListener("change", function(){if(!Lecture){D3();}}, false);
	document.querySelector("#All").addEventListener("change", function(){if(!Lecture){D3();}}, false);
	document.querySelector("#Disp").addEventListener("change", function(){if(!Lecture){D3();}}, false);
	Set();
	ID = document.querySelector("audio");
	ID.addEventListener("playing", function()
	{
		Lecture = true;
		D3();
	}, false);
	ID.addEventListener("pause", function()
	{
		Lecture = false;
	}, false);
	Reload();
}
function Set()
{
	Largeur = ~~(document.querySelector("#Largeur").value);
	Hauteur = ~~(document.querySelector("#Hauteur").value);
	document.querySelector("canvas").width = Largeur + 20;
	document.querySelector("canvas").height = Hauteur + 20;
}
function D3()
{
	Context.clearRect(0, 0, Largeur + 20, Hauteur + 20);
	var C = document.querySelector("input[type=color]").value;
	var Angle = [parseFloat(document.querySelectorAll("input[type=range]")[1].value)*2*Math.PI/180, parseFloat(document.querySelector("input[type=range]").value)*2*Math.PI/180];
	D = ID.duration;
	if(document.querySelector("#All").checked)
	{
		var T = ID.currentTime;
		var l = ~~(T/D*(Taille2 - 1));
		var Copie = [];
		for(var i = 0; i < Taille2; i++)
		{
			var Ab = (i - Taille2/2)*Largeur/Taille2;
			var Value = (Data2[i] - Mo2)/(Max2 - Mo2)*Hauteur/2;
			Copie.push([[Ab, 0, 0],  Value]);
		}
		for(var i = 0; i < Taille2; i++)
		{
			var Pro = Copie[i][0][0];
			Copie[i][0][0] = Math.cos(Angle[0])*(Copie[i][0][0]) - Math.sin(Angle[0])*(Copie[i][0][1]);
			Copie[i][0][1] = Math.sin(Angle[0])*(Pro) + Math.cos(Angle[0])*(Copie[i][0][1]);
			Pro = Copie[i][0][0];
			Copie[i][0][0] = Math.cos(Angle[1])*(Copie[i][0][0]) - Math.sin(Angle[1])*(Copie[i][0][2]);
			Copie[i][0][2] = Math.sin(Angle[1])*(Pro) + Math.cos(Angle[1])*(Copie[i][0][2]);
		}
		Context.fillStyle = "grey";
		if(Angle[1] !== 0)
		{
			for(var i = Taille2 - 1; i >= l; i--)
			{
				Context.save();
				Context.scale(Angle[1]/(45*Math.PI*2/180), 1);
				Context.beginPath();
					Context.arc((Copie[i][0][0] + Largeur/2 + 10)/(Angle[1]/(45*Math.PI*2/180)), Copie[i][0][1] + Hauteur/2 + 10, Math.abs(Copie[i][1]), 0, 2*Math.PI);
				Context.closePath();
				Context.restore();
				Context.fill();
				Context.stroke();
			}
		}
		else
		{
			for(var i = Taille2 - 1; i >= l; i--)
			{
				Context.beginPath();
					Context.moveTo(Copie[i][0][0] + Largeur/2 + 10, Copie[i][0][1] + Hauteur/2 - Math.abs(Copie[i][1]) + 10);
					Context.lineTo(Copie[i][0][0] + Largeur/2 + 10, Copie[i][0][1] + Hauteur/2 + Math.abs(Copie[i][1]) + 10);
				Context.closePath();
				Context.stroke();
			}
		}
		var C = document.querySelector("input[type=color]").value;
		Context.fillStyle = "rgba(" + (parseInt(C[1], 16)*16 + parseInt(C[2], 16)) + ", " + (parseInt(C[3], 16)*16 + parseInt(C[4], 16)) + ",  " + (parseInt(C[5], 16)*16 + parseInt(C[6], 16)) + ", " + ~~(document.querySelector("#Alpha").value)/255 + ")";
		var m;
		if(document.querySelector("#Disp").checked)
		{
			m = Math.max(0, l - 1);
		}
		else
		{
			m = 0;
		}
		if(Angle[1] != 0)
		{
			for(var i = l - 1; i >= m; i--)
			{
				Context.save();
				Context.scale((Angle[1])/(45*Math.PI*2/180), 1);
				Context.beginPath();
					Context.arc((Copie[i][0][0] + Largeur/2 + 10)/(Angle[1]/(45*Math.PI*2/180)), Copie[i][0][1] + Hauteur/2 + 10, Math.abs(Copie[i][1]), 0, 2*Math.PI);
				Context.closePath();
				Context.restore();
				Context.fill();
				Context.stroke();
			}
		}
		else
		{
			Context.strokeStyle = "rgba(" + (parseInt(C[1], 16)*16 + parseInt(C[2], 16)) + ", " + (parseInt(C[3], 16)*16 + parseInt(C[4], 16)) + ",  " + (parseInt(C[5], 16)*16 + parseInt(C[6], 16)) + ", " + ~~(document.querySelector("#Alpha").value)/255 + ")";
			for(var i = l - 1; i >= m; i--)
			{
				Context.beginPath();
					Context.moveTo(Copie[i][0][0] + Largeur/2 + 10, Copie[i][0][1] + Hauteur/2 - Math.abs(Copie[i][1]) + 10);
					Context.lineTo(Copie[i][0][0] + Largeur/2 + 10, Copie[i][0][1] + Hauteur/2 + Math.abs(Copie[i][1]) + 10);
				Context.closePath();
				Context.stroke();
			}
			Context.strokeStyle = "black";
		}
	}
	else
	{
		var T = ID.currentTime;
		var p = T/D*(Taille - 1);
		var l = Math.round(p);
		var Amplitude = ~~(document.querySelector("#Amplitude").value);

		var k;
		if(l > Amplitude)
		{
			k = l - Amplitude;
		}
		else
		{
			k = 0;
		}
		var j;
		var Copie = [];
		for(var i = k; i < l + Amplitude; i++)
		{
			var Ab = (i - p)*Largeur/Amplitude/2;
			var Value = (Data[i] - Mo)/(Max - Mo)*Hauteur/2;
			Copie.push([[Ab, 0, 0],  Value]);
		}
		for(var i = 0; i < Copie.length; i++)
		{
			var Pro = Copie[i][0][0];
			Copie[i][0][0] = Math.cos(Angle[0])*(Copie[i][0][0]) - Math.sin(Angle[0])*(Copie[i][0][1]);
			Copie[i][0][1] = Math.sin(Angle[0])*(Pro) + Math.cos(Angle[0])*(Copie[i][0][1]);
			Pro = Copie[i][0][0];
			Copie[i][0][0] = Math.cos(Angle[1])*(Copie[i][0][0]) - Math.sin(Angle[1])*(Copie[i][0][2]);
			Copie[i][0][2] = Math.sin(Angle[1])*(Pro) + Math.cos(Angle[1])*(Copie[i][0][2]);
		}
		if(l > Amplitude)
		{
			k = Amplitude;
		}
		else
		{
			k = l;
		}
		var De = Angle[1]/(45*Math.PI*2/180);
		var De2 = 1;
		Context.fillStyle = "grey";
		if(Angle[1] !== 0)
		{
			for(var i = Copie.length - 1; i >= k; i--)
			{
				Context.save();
				Context.scale(De, De2);
				Context.beginPath();
					Context.arc((Copie[i][0][0] + Largeur/2 + 10)/(Angle[1]/(45*Math.PI*2/180)), Copie[i][0][1] + Hauteur/2 + 10, Math.abs(Copie[i][1]), 0, 2*Math.PI);
				Context.closePath();
				Context.restore();
				Context.fill();
				Context.stroke();
			}
		}
		else
		{
			for(var i = Copie.length - 1; i >= k; i--)
			{
				Context.beginPath();
					Context.moveTo(Copie[i][0][0] + Largeur/2 + 10, Copie[i][0][1] + Hauteur/2 - Math.abs(Copie[i][1]) + 10);
					Context.lineTo(Copie[i][0][0] + Largeur/2 + 10, Copie[i][0][1] + Hauteur/2 + Math.abs(Copie[i][1]) + 10);
				Context.closePath();
				Context.stroke();
			}
		}
		Context.fillStyle = "rgba(" + (parseInt(C[1], 16)*16 + parseInt(C[2], 16)) + ", " + (parseInt(C[3], 16)*16 + parseInt(C[4], 16)) + ",  " + (parseInt(C[5], 16)*16 + parseInt(C[6], 16)) + ", " + ~~(document.querySelector("#Alpha").value)/255 + ")";
		var m;
		if(document.querySelector("#Disp").checked)
		{
			if(k > 1)
			{
				m = k - 1;
			}
			else
			{
				m = 0;
			}
		}
		else
		{
			m = 0;
		}
		if(Angle[1] !== 0)
		{
			for(var i = k - 1; i >= m; i--)
			{
				Context.save();
				Context.scale(De, De2);
				Context.beginPath();
					Context.arc((Copie[i][0][0] + Largeur/2 + 10)/(Angle[1]/(45*Math.PI*2/180)), Copie[i][0][1] + Hauteur/2 + 10, Math.abs(Copie[i][1]), 0, 2*Math.PI);
				Context.closePath();
				Context.restore();
				Context.fill();
				Context.stroke();
			}
		}
		else
		{
			Context.strokeStyle = "rgba(" + (parseInt(C[1], 16)*16 + parseInt(C[2], 16)) + ", " + (parseInt(C[3], 16)*16 + parseInt(C[4], 16)) + ",  " + (parseInt(C[5], 16)*16 + parseInt(C[6], 16)) + ", " + ~~(document.querySelector("#Alpha").value)/255 + ")";
			for(var i = k - 1; i >= m; i--)
			{
				Context.beginPath();
					Context.moveTo(Copie[i][0][0] + Largeur/2 + 10, Copie[i][0][1] + Hauteur/2 - Math.abs(Copie[i][1]) + 10);
					Context.lineTo(Copie[i][0][0] + Largeur/2 + 10, Copie[i][0][1] + Hauteur/2 + Math.abs(Copie[i][1]) + 10);
				Context.closePath();
				Context.stroke();
			}
			Context.strokeStyle = "black";
		}
	}
	if(Lecture)
	{
		requestAnimFrame(D3);
	}
}