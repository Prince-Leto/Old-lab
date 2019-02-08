function Listen()
{
	var Input = document.createElement("input");
	Input.type = "number";
	Input.value = ~~(this.innerHTML);
	this.parentNode.insertBefore(Input, this);
	Input.focus();
	Input.addEventListener("blur", function()
	{
		var P = document.createElement("span");
		P.innerHTML = this.value;
		P.contentEditable = "true";
		P.addEventListener("focus", Listen, false);
		this.parentNode.insertBefore(P, this);
		this.parentNode.removeChild(this);
	}, false);
	this.parentNode.removeChild(this);
}

window.onload = function()
{
	var Position = document.querySelector("#Parametres + div").offsetTop + 1;
	window.addEventListener("scroll", function()
	{
		if(document.documentElement.scrollTop > Position || document.body.scrollTop > Position && document.querySelector("#Visible").checked)
		{
			document.querySelector("#Parametres + div").style.position = "fixed";
			document.querySelector("#Parametres + div").style.top = "0";
			document.querySelector("#Parametres + div").style.border = "none";
		}
		else if(document.documentElement.scrollLeft > 0 || document.body.scrollLeft > 0 && document.querySelector("#Visible").checked)
		{
			document.querySelector("#Parametres + div").style.position = "fixed";
			document.querySelector("#Parametres + div").style.top = 40 - document.documentElement.scrollTop - document.body.scrollTop + "px";
			document.querySelector("#Parametres + div").style.borderTop = "1px solid black";
		}
		else
		{
			document.querySelector("#Parametres + div").style.position = "absolute";
			document.querySelector("#Parametres + div").style.top = "40px";
			document.querySelector("#Parametres + div").style.borderTop = "1px solid black";
		}
	}, false);
	document.querySelector("input[type=checkbox]").addEventListener("change", function()
	{
		if(this.checked)
		{
			document.querySelector("#Parametres + div").style.display = "block";
		}
		else
		{
			document.querySelector("#Parametres + div").style.display = "none";
		}
	}, false);
	document.querySelector("#Parametres").addEventListener("mouseover", function()
	{
		document.querySelector("#Parametres + div").style.display = "block";
	}, false);
	document.querySelector("#Parametres + div").addEventListener("mouseover", function()
	{
		document.querySelector("#Parametres + div").style.display = "block";
	}, false);
	document.querySelector("#Parametres").addEventListener("mouseout", function()
	{
		if(!this.parentNode.querySelector("input[type=checkbox]").checked)
		{
			document.querySelector("#Parametres + div").style.display = "none";
		}
	}, false);
	document.querySelector("#Parametres + div").addEventListener("mouseout", function()
	{
		if(!this.querySelector("input[type=checkbox]").checked)
		{
			document.querySelector("#Parametres + div").style.display = "none";	
		}
	}, false);
	document.querySelector("#Documentation").addEventListener("mouseover", function()
	{
		document.querySelector("#Parametres + div").style.display = "none";
		document.querySelector("#Documentation + div").style.display = "block";
	}, false);
	document.querySelector("#Documentation + div").addEventListener("mouseover", function()
	{
		document.querySelector("#Parametres + div").style.display = "none";
		document.querySelector("#Documentation + div").style.display = "block";
	}, false);
	document.querySelector("#Documentation").addEventListener("mouseout", function()
	{
		document.querySelector("#Documentation + div").style.display = "none";
		if(document.querySelector("#Parametres + div").querySelector("input[type=checkbox]").checked)
		{	
			document.querySelector("#Parametres + div").style.display = "block";
		}
	}, false);
	document.querySelector("#Documentation + div").addEventListener("mouseout", function()
	{
		document.querySelector("#Documentation + div").style.display = "none";
		if(document.querySelector("#Parametres + div").querySelector("input[type=checkbox]").checked)
		{	
			document.querySelector("#Parametres + div").style.display = "block";
		}
	}, false);
	Add();
}