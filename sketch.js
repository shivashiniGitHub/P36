var dog,dog1,happyDog,database,foodS,foodStock;

var foodS; 

var feedDog,addMilk

var feedP,addF;

var objFood;

function preload()
{
 dog1 = loadImage("images/dogImg.png");
 happyDog = loadImage("images/dogImg1.png");
 
}

function setup() {

  database = firebase.database();

	createCanvas(1000, 500);

  foodObject = new food();

  foodStock = database.ref('Food');
  foodStock.on("value",readstock);
  
  dog = createSprite(800,250,50,50);
  dog.addImage(dog1);
  dog.scale = 0.15;

  feedP = createButton("Feed the dog");
  feedP.position(700,95);
  feedP.mousePressed(feedDog)

  addF = createButton("Add Food");
  addF.position(800,95);
  addF.mousePressed(addFoods);

  
}


function draw() {  
  background("green")

  foodObject.display();

  fedTime = database.ref("FeedTime").on("value",function(data){
    lastFed = data.val();
  })

  fill("red");
  textSize(15);
  if(lastFed=12){
    text("Last Feed : "+ lastFed%12+ "PM",350,30);
  }else if (lastFed == 0){
    text("Last Fed : 12 AM",350,30);
  }else {
    text("Last Fed : "+ lastFed + "AM",350,30);
  }

  drawSprites();
  }

function readstock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

function addFoods(){
 foodS++;
 database.ref('/').update({
   Food:foodS 
 })
}

function feedDog(){

  dog.addImage(happyDog);
  var foodStockValue = foodObject.getFoodStock();
  if(foodStockValue<=0){
    foodObject.updateFoodStock(foodObject*0);
  }else {
    foodObject.updateFoodStock(foodobject-1);
  }
  database.ref('/').update({
  Food: foodObject.getFoodStock(),
  FeedTime: hour()  
  })
}