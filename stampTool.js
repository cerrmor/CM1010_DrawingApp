
function StampTool()
{
    this.icon = "assets/toolIcons/star.jpg";
    this.name = "Stamp";
    this.star = loadImage('./assets/stamps/star.png');
    this.crow = loadImage('./assets/stamps/crow.png');
    this.paintCan = loadImage('./assets/stamps/paintCan.png');
    this.stamp = 1;
    var show = false;
    var c = select("#content");       

    this.draw = function()
    {
        //helper function that hides the eraser tool options
        hide(show);
        
        //for updating the stamp image being used
        var stampImg = select('#stamp').value();
        
        //if the number of stamps is greater then one draws like spray can tool
        if(mouseIsPressed && select("#nStampSlider").value() >= 2 && mousePressOnCanvas(c))
        {
            var nStar = select("#nStampSlider").value();
            for(var i = 0; i < nStar; i++)
            {
                var starSize = select("#sizeOfStampControl").value()
                var starX = random((mouseX - starSize/2) - 10, (mouseX - starSize/2) + 10);
                var starY = random((mouseY - starSize/2) - 10, (mouseY - starSize/2) + 10);
                if(stampImg == 'star')
                {
                    image(this.star, starX, starY, starSize, starSize);
                }
                else if(stampImg == 'crow')
                {
                    image(this.crow, starX, starY, starSize, starSize);
                }
                else if(stampImg == 'paintCan')
                {
                    image(this.paintCan, starX, starY, starSize, starSize);
                }
            }
        }
        //if the number of stars is one allows for a single line or single star to be placed
        else if(mouseIsPressed && select("#nStampSlider").value() <= 1 && mousePressOnCanvas(c))
        {            
                var starSize = select("#sizeOfStampControl").value();
                var starX = mouseX - starSize/2;
                var starY = mouseY - starSize/2;
                if(stampImg == 'star')
                {
                    image(this.star, starX, starY, starSize, starSize);
                }
                else if(stampImg == 'crow')
                {
                    image(this.crow, starX, starY, starSize, starSize);
                }
                else if(stampImg == 'paintCan')
                {
                    image(this.paintCan, starX, starY, starSize, starSize);
                }
        }
    };
    
    //clears the tool option upon unselecting the tool
    this.unselectTool = function() {
		//clear options
		select(".options").html("");
	};
    
    this.populateOptions = function()
    {   
        //places the selector tools on the tool space
        select(".options").html(
            "<p>Tool Options</p><div class='slider'><input type='range' min='5' max='200' value='20' id='sizeOfStampControl'> <label  for='#sizeOfStampControl'>Size of Stamp</label></div> <div class = 'slider'><input type='range' min='1' max='20' value='1' id='nStampSlider'> <label for='#nStampSlider' id='nStampLabel'>Number of Stamps</label></div> <div class = 'selector'><select id = 'stamp'><option value = 'star' selected>Star</option><option value = 'crow'>Crow</option><option value ='paintCan'>Paint Can</option></select><label for='#stamp'>Select Stamp</label></div>");  
           
    };
    
}
