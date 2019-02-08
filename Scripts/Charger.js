window.onload = function()
{
	/*document.querySelector("header > h1").style.top = "-100px";
	document.querySelector("#Menu").style.width = "0";
	document.querySelector("#Menu").style.overflow = "hidden";
	setTimeout(function()
	{

		document.querySelector("header > h1").style.transition = "500ms";
		document.querySelector("header > h1").style.webkitTransition = "500ms";
		document.querySelector("header > h1").style.transitionTimingFunction = "ease";
		document.querySelector("header > h1").style.webkitTransitionTimingFunction = "ease";
		document.querySelector("header > h1").style.top = "0";
	}, 50);
	setTimeout(function()
	{
		document.querySelector("#Menu").style.transition = "600ms";
		document.querySelector("#Menu").style.webkitTransition = "600ms";
		document.querySelector("#Menu").style.transitionTimingFunction = "ease";
		document.querySelector("#Menu").style.webkitTransitionTimingFunction = "ease";
		document.querySelector("#Menu").style.width = "100%";
	}, 400);
	setTimeout(function()
	{
		document.querySelector("#Menu").style.overflow = "visible";
	}, 1000);*/
	for(var i = 0; i < document.querySelectorAll(".Commentaires > span").length; i++)
	{
		document.querySelectorAll(".Commentaires > span")[i].addEventListener("click", function()
		{
			if(this.parentNode.querySelector("div").style.height == "0px" || this.parentNode.querySelector("div").style.height === "")
			{
				SetHeight(this.parentNode.querySelector("div"));
			}
			else
			{
				this.parentNode.querySelector("div").style.height = "0px";
			}
		}, false);
		document.querySelectorAll(".Commentaires > span + div > p:last-child > span:first-child")[i].addEventListener("keyup", function()
		{
			SetHeight(this.parentNode.parentNode);
		}, false);
		document.querySelectorAll(".Commentaires > span + div > p:last-child > span:first-child")[i].addEventListener("focus", function()
		{
			if(this.innerHTML == "Pour ajouter un commentaire : éditez-moi !")
			{
				this.innerHTML = "";
				this.style.color = "black";
			}
		}, false);
		document.querySelectorAll(".Commentaires > span + div > p:last-child > span:first-child")[i].addEventListener("blur", function()
		{
			if(this.innerHTML == "" || this.innerHTML == "<br xmlns=\"http://www.w3.org/1999/xhtml\" />")
			{
				this.style.color = "grey";
				this.innerHTML = "Pour ajouter un commentaire : éditez-moi !";
			}
		}, false);
		document.querySelectorAll(".Infos > span")[i].addEventListener("click", function()
		{
			if(this.style.textDecoration != "line-through")
			{
				if(this.innerHTML == "En savoir plus")
				{
					this.innerHTML = "En savoir moins";
					this.parentNode.parentNode.querySelector("p").style.display = "none";
					this.parentNode.parentNode.querySelector(".Plus").style.display = "block";
				}
				else
				{
					this.innerHTML = "En savoir plus";
					this.parentNode.parentNode.querySelector(".Plus").style.display = "none";
					this.parentNode.parentNode.querySelector("p").style.display = "block";
				}
			}
		}, false);
		document.querySelectorAll(".Infos > a")[i].addEventListener("click", function(event)
		{
			if(this.style.textDecoration == "line-through")
			{
				event.preventDefault();
				return false;
			}
		}, false);
		document.querySelectorAll(".Commentaires > span + div input")[i].addEventListener("click", function()
		{
			var Noeud = this.parentNode.parentNode;
			xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
				{
					console.log(xhr.responseText);
					if(xhr.responseText == 1)
					{
						var Mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
						var Pe = document.createElement("p");
						Pe.innerHTML = Noeud.querySelector("span").innerHTML;
						var Time = document.createElement("time");
						var D = new Date();
						Time.setAttribute("datetime", D.getFullYear() + "-" + (D.getMonth() + 1) + "-" + D.getDate());
						Time.innerHTML = D.getDate() + " " + Mois[D.getMonth()] +  " " + D.getFullYear();
						Pe.appendChild(Time);
						Noeud.parentNode.insertBefore(Pe, Noeud);
						Noeud.querySelector("span").innerHTML = "";
						var Nb = ~~(Noeud.parentNode.parentNode.querySelector("span").innerHTML.split(" ")[0]) + 1;
						if(Nb == 1)
						{
							Noeud.parentNode.parentNode.querySelector("span").innerHTML = Nb + " Commentaire";
						}
						else
						{
							Noeud.parentNode.parentNode.querySelector("span").innerHTML = Nb + " Commentaires";
						}
						SetHeight(Noeud.parentNode);
					}
				}
			};
			xhr.open("POST", "Send.php");
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("Ref=" + ~~(this.parentNode.parentNode.querySelector("span").getAttribute("data-ref")) + "&Message=" + encodeURIComponent(this.parentNode.parentNode.querySelector("span").innerHTML.replace(/ xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\"/g, '')));
		}, false);
	}
}
function SetHeight(CurrentNode)
{
	var Taille = 10;
	for(var i = 0; i < CurrentNode.querySelectorAll("p").length; i++)
	{
		Taille += CurrentNode.querySelectorAll("p")[i].offsetHeight + 10;
	}
	CurrentNode.style.height = Taille + "px";
}