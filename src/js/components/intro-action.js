var quotes = [
	"Let's do it to it! Let's get this party started!",
	"You wanna get nuts?? Let's get nuts!!",
	"Here's a nice piece of shit.",
	"I had a dream last night that a hamburger was eating me!"
];
var quote = quotes[Math.floor(Math.random() * quotes.length)];

var checkExist = setInterval(function() {
   if (document.getElementsByClassName('intro__heading--compact')[0]) {
      document.getElementsByClassName('intro__heading--compact')[0].innerHTML = quote;
      clearInterval(checkExist);
   }
}, 100); 


