var cards = [];
var colors = [];
var letters = ["א","ב","ג","ד","ה","ו","ז","ח"];
var font;
var firstCard;
var secondCard;
function preload()
{
    font = loadFont("a.ttf");
    textFont(font);
}
function setup()
{
    colors = [
        color(240,0,0),
        color(255,240,0),
        color(0,220,0),
        color(0,100,200),
        color(240,120,0),
        color(0,240,240),
        color(160,0,240),
        color(180,80,0)
    ];
    createCards(8);
    shuffle(cards, true);
    placeCards();
    createCanvas(400, 400);
    console.log(cards);
}
function draw()
{
    background(200);
    textSize(40);
    textAlign(CENTER, CENTER);
    cards.forEach(c => {
        drawCard(c);
    });
    if(cards.length==0)
    {
        textSize(60);
        textAlign(CENTER, CENTER);
        stroke(2);
        text("!ניצחון מוחץ", 200, 200);
    }
}
function mousePressed()
{
    cards.forEach(c => {
        if (!c.isopen &&isOnCard(c))
        {
            c.isopen=true;
            if(firstCard==undefined)
            {
                firstCard=c;
            }
            else if(secondCard==undefined)
            {
               secondCard=c;
               if(cards.length==2)
               {
                   cards=[];
               }
            }
            else
            {
                if (firstCard.type==secondCard.type)
                {
                    for(i=0; i<cards.length; i++)
                    {
                        if (cards[i].type==secondCard.type)
                        {
                            cards.splice(i, 1);
                            i--;
                        }
                    }
                }
                firstCard.isopen=false;
                secondCard.isopen=false;
                firstCard=undefined;
                secondCard=undefined;
                firstCard=c;
            }
        }
    });
}
function isOnCard(card)
{
    if(mouseX>=card.x && mouseY>=card.y &&
        mouseX<card.x+60 && mouseY<card.y+60)
        {
            return true;
        }
    return false;
}
function createCards(pairs)
{
    for(i=0; i<pairs; i++)
    {
        cards.push({type:i,isopen:false});
        cards.push({type:i,isopen:false});
    }
}
function placeCards()
{
    for(i=0; i<cards.length; i++)
    {
        var row = Math.floor(i/4);
        var col = i%4;
        cards[i].x = 35+90*col;
        if(cards.length==16)
            cards[i].y = 35+90*row;
        if(cards.length==12)
            cards[i].y = 80+90*row;
        if(cards.length==8)
            cards[i].y = 125+90*row;
    }
}
function drawCard(card)
{
    if (card.isopen)
    {
        fill(colors[card.type]);
        stroke(0);
        strokeWeight(2);
        rect(card.x, card.y, 60, 60, 5);
        fill(255);
        noStroke();
        text(letters[card.type], card.x+30,card.y+30);
    }
    else
    {
        fill(255);
        stroke(0);
        strokeWeight(2);
        rect(card.x, card.y, 60, 60, 5);
    }
}