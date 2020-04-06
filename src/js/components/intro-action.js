var quotes = [
	"Let's do it to it! Let's get this party started!",
	"You wanna get nuts?? Let's get nuts!!",
	"Here's a nice piece of shit."
];

var heading = document.getElementsByClassName('intro__heading')[0];

if (heading.innerHTML == '') {
	heading.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
}


