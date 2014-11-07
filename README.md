An app for learning about node.js, express, and using API's.  This will send out a Yo when a ChelseaFC game is starting. 

Scraps the Chelsea website for the next game time and date using cheerio.  Then checks for when the current time and date is within a minute of the start time and then sends out a Yo.  Finally it will go grab the next game time and proceed to wait for when the current time is within a minute of that date.  Rinse and repeat.  

Also, is a simple REST service for getting game schedule and next game. 
