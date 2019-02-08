var Context;
var Func = [Flocon, Dragon, Triangle];
var Timeout;
function Iteration(Func, Tableau, Nombre)
{
	for(var i = 0; i < Nombre; i++)
	{
		Tableau = Func(Tableau);
	}
	return Tableau;
}
function Dessiner(Tableau)
{
	Context.beginPath();
	Context.moveTo(Tableau[0][0], Tableau[0][1]);
	for(var i = 1; i < Tableau.length; i++)
	{
		Context.lineTo(Tableau[i][0], Tableau[i][1]);
	}
	Context.stroke();
	Context.closePath();
}
function Animer(Tableau, Position)
{
	if(Position < Tableau.length - 1)
	{
		Context.beginPath();
		Context.moveTo(Tableau[Position][0], Tableau[Position][1]);
		Context.lineTo(Tableau[Position + 1][0], Tableau[Position + 1][1]);
		Context.stroke();
		Context.closePath();
		Timeout = setTimeout(Animer, ~~(document.getElementById("Speed").value), Tableau, ++Position);
	}
}
function Create(Tableau)
{
	var New = []
	for(var i = 0; i < Tableau.length - 1; i++)
	{
		New.push(Tableau[i]);
		New.push([(Tableau[i + 1][0] - Tableau[i][0])/3 + Tableau[i][0], (Tableau[i + 1][1] - Tableau[i][1])/3 + Tableau[i][1]]);
		var Alpha = Math.atan((Tableau[i + 1][1] - Tableau[i][1])/(Tableau[i + 1][0] - Tableau[i][0]));
		if(Tableau[i + 1][0] - Tableau[i][0] < 0)
		{
			Alpha += Math.PI;
		}
		Alpha += Math.PI/3;
		var Longueur = Math.sqrt(Math.pow((Tableau[i + 1][0] - Tableau[i][0])/3, 2) + Math.pow((Tableau[i + 1][1] - Tableau[i][1])/3, 2));
		New.push([(Tableau[i + 1][0] - Tableau[i][0])/3 + Tableau[i][0] + Longueur*Math.cos(Alpha), (Tableau[i + 1][1] - Tableau[i][1])/3 + Tableau[i][1] + Longueur*Math.sin(Alpha)]);
		New.push([(Tableau[i + 1][0] - Tableau[i][0])/3*2 + Tableau[i][0], (Tableau[i + 1][1] - Tableau[i][1])/3*2 + Tableau[i][1]]);
	}
	New.push(Tableau[Tableau.length - 1]);
	return New;
}
function Plier(Liste)
{
	var No = Liste;
	for(var i = Liste.length - 1; i >= 0; i--)
	{
		No.push((Liste[i] + 1)%4);
	}
	return No;
}
function DessinerR(Liste, Position, Taille)
{
	Context.beginPath();
	Context.moveTo(Position[0], Position[1]);
	for(var i = 0; i < Liste.length; i++)
	{
		if(Liste[i] == 0)
		{
			Position[0] -= Taille;
		}
		else if(Liste[i] == 1)
		{
			Position[1] += Taille;
		}
		else if(Liste[i] == 2)
		{
			Position[0] += Taille;
		}
		else
		{
			Position[1] -= Taille;
		}
		Context.lineTo(Position[0], Position[1]);
	}
	Context.stroke();
	Context.closePath();
}
function AnimerR(Liste, Position, Etat, Taille)
{
	if(Etat < Liste.length)
	{
		Context.beginPath();
		Context.moveTo(Position[0], Position[1]);
		if(Liste[Etat] == 0)
		{
			Position[0] -= Taille;
		}
		else if(Liste[Etat] == 1)
		{
			Position[1] += Taille;
		}
		else if(Liste[Etat] == 2)
		{
			Position[0] += Taille;
		}
		else
		{
			Position[1] -= Taille;
		}
		Context.lineTo(Position[0], Position[1]);
		Context.stroke();
		Context.closePath();
		Timeout = setTimeout(AnimerR, ~~(document.getElementById("Speed").value), Liste, Position, ++Etat, Taille);
	}
}
function Simuler(Liste, Position, Taille)
{
	var Min = [0, 0];
	var Max = [0, 0];
	for(var i = 0; i < Liste.length; i++)
	{
		if(Liste[i] == 0)
		{
			Position[0] -= Taille;
		}
		else if(Liste[i] == 1)
		{
			Position[1] += Taille;
		}
		else if(Liste[i] == 2)
		{
			Position[0] += Taille;
		}
		else
		{
			Position[1] -= Taille;
		}
		Min[0] = Math.min(Min[0], Position[0]);
		Min[1] = Math.min(Min[1], Position[1]);
		Max[0] = Math.max(Max[0], Position[0]);
		Max[1] = Math.max(Max[1], Position[1]);
	}
	return [Min[0], Min[1], Max[0], Max[1]];
}
function Flocon()
{
	var Size = ~~(document.getElementById("Size").value);
	document.querySelector("canvas").width = Size + 20;
	document.querySelector("canvas").height = Size*Math.sqrt(3)/2 + Size/6*Math.sqrt(3) + 20;
	Context.fillStyle = "#FFFFFF";
	Context.fillRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);
	var Tableau = [[10, Size*Math.sqrt(3)/2 + 10], [Size + 10, Size*Math.sqrt(3)/2 + 10], [Size/2 + 10, 10], [10, Size*Math.sqrt(3)/2 + 10]];
	if(document.getElementById("Anim").checked)
	{
		Animer(Iteration(Create, Tableau, ~~(document.getElementById("Iter").value)), 0);
	}
	else
	{
		Dessiner(Iteration(Create, Tableau, ~~(document.getElementById("Iter").value)));
	}
}
function Dragon()
{
	var Liste = [0];
	var Taille = ~~(document.getElementById("Size").value);
	Liste = Iteration(Plier, Liste, ~~(document.getElementById("Iter").value));
	var Table = Simuler(Liste, [0, 0], Taille);
	document.querySelector("canvas").width = Table[2] - Table[0] + 20;
	document.querySelector("canvas").height = Table[3] - Table[1] + 20;
	Context.fillStyle = "#FFFFFF";
	Context.fillRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);
	if(document.getElementById("Anim").checked)
	{
		AnimerR(Liste, [-Table[0] + 10, -Table[1] + 10], 0, Taille);
	}
	else
	{
		DessinerR(Liste, [-Table[0] + 10, -Table[1] + 10], Taille);
	}
}
function Decouper(T, Etape)
{
	var Liste = [];
	for(var i = 0; i < T.length; i++)
	{
		Liste.push(T[i]);
		Liste.push([T[i][0] + Etape/2, T[i][1] + Etape*Math.sqrt(3)/2]);
		Liste.push([T[i][0] + Etape, T[i][1]]);
	}
	return Liste;
}
function DessinerT(Iteration, Triangle, Etape)
{
	for(var i = 0; i < Iteration; i++)
	{
		Etape = Etape/2;
		Triangle = Decouper(Triangle, Etape);
	}
	Context.fillStyle = "rgba(255, 0, 0, 0.8)";
	for(var i = 0; i < Triangle.length; i++)
	{
		Context.beginPath();
			Context.moveTo(Triangle[i][0], Triangle[i][1]);
			Context.lineTo(Triangle[i][0] + Etape/2, Triangle[i][1] + Etape*Math.sqrt(3)/2);
			Context.lineTo(Triangle[i][0] + Etape, Triangle[i][1]);
			Context.lineTo(Triangle[i][0], Triangle[i][1]);
			Context.fill();
		Context.closePath();
	}
}
function Triangle()
{
	var Size = ~~(document.getElementById("Size").value);
	document.querySelector("canvas").width = Size + 20;
	document.querySelector("canvas").height = Size*Math.sqrt(3)/2 + 20;
	Context.fillStyle = "#FFFFFF";
	Context.fillRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);
	DessinerT(~~(document.getElementById("Iter").value), [[Size + 10, Size*Math.sqrt(3)/2 + 10]], -Size);
}
Add = function()
{
	Context = document.querySelector("canvas").getContext("2d");
	document.querySelector("select").addEventListener("change", function()
	{
		var Val = ~~(document.querySelector("select").selectedIndex);
		if(Val == 0)
		{
			document.getElementById("Anim").disabled = false;
			document.getElementById("Size").value = 300;
			document.getElementById("Iter").value = 5;
		}
		else if(Val == 1)
		{
			document.getElementById("Anim").disabled = false;
			document.getElementById("Size").value = 10;
			document.getElementById("Iter").value = 12;
		}
		else if(Val == 2)
		{
			document.getElementById("Anim").disabled = true;
			document.getElementById("Anim").checked = false;
			document.getElementById("Size").value = 300;
			document.getElementById("Iter").value = 6;
		}
	}, false);
	document.querySelector("input[type=button]").addEventListener("click", function(){clearTimeout(Timeout); Func[~~(document.querySelector("select").selectedIndex)]()}, false);
	Func[0]();
}	