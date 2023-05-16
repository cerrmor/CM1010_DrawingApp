function ShapeDrawTool(){
    //set an icon and a name for the object
	this.icon = "assets/toolIcons/shapeDraw.jpg";
	this.name = "shapeTool";
    
    //sets the starting fill to solid
    this.hollow = false;
    
    //define the initial value of the x,y and drawing status
	var startMouseX = -1;
	var startMouseY = -1;
    var endMouseX = -1;
    var endMouseY = -1;
    var self = this;
    
    var show = true;
    var c = select("#content");

    
	this.draw = function(){
        //helper function to show the eraser tools if they have been hidden by another tool
        hide(show);
        // get the value from the shape selector
        var option = select('#shape').value();
        if(mouseIsPressed && mousePressOnCanvas(c) && !useEraser)
        {
            //check if they startMouseX and startMouseY are -1. set them to the mousePressed position
            //for X and Y if they are. and update drawing status to true, store the position of the to be drawn value in loadPixel
            if(startMouseX == -1)
            {
                startMouseX = mouseX;
                startMouseY = mouseY;
                loadPixels();
            }
         //when release, load the final position with updatePixels and draw line
            else
            {
                endMouseX = mouseX;
                endMouseY = mouseY;
                updatePixels();
                
                //calls the specific shape code required
                if(option == "rectangle")
                {
                    this.rectangle();
                }
                else if(option == "circle")
                {
                    this.circle();
                }
                else if(option == "triangle")
                {
                    this.triangle();
                }
            }
        }
        //resets the starting point 
        else if(!useEraser)
        {
			startMouseX = -1;
			startMouseY = -1;
            loadPixels();
		}
        //allows the eraser tool to act independantly from the shape tool
        else if(useEraser)
        {
            updatePixels();
            erase(c);
        }
	};
    
    // the functions that get called to draw the shapes
    this.triangle = function()
    {
        var e = dist(startMouseX,startMouseY,endMouseX,endMouseY);
        triangle(endMouseX - e, endMouseY , startMouseX, startMouseY, endMouseX, endMouseY);
    }
    
    this.circle = function()
    {  
        push();
        ellipseMode(CORNERS);
        ellipse(startMouseX, startMouseY, endMouseX , endMouseY);
        pop();
    }
    
    this.rectangle = function()
    {
        rect(startMouseX, startMouseY, endMouseX - startMouseX , endMouseY - startMouseY);
    };
    
    //clears the section button when the rect tool is unselected
    this.unselectTool = function() {
        
		//clear options
		select(".options").html("");
	};
    
    //populates the selections tool defining the shape that is drawn
    this.populateOptions = function()
    {   
        //creates a button that lets colour fill of the object to be selected
        select(".options").html("<p>Tool Options</p><button id='fill'>Solid Fill</button><select id='shape'><option value='rectangle'>Rectangle</option><option value='circle'>Circle</option><option value='triangle'>Triangle</option></select>");
        
        //controls the click of the colour fill button
        select("#fill").mouseClicked(function(){
            //allows the button name to change upon click
            var button = select("#" + this.elt.id);
            
            //set the fill of the shape to solid
            if(self.hollow == false)
            {
                button.html('No Fill');
                self.hollow = true;
                
                //allows the fill colour to change when the button is clicked or a new colour is clicked
                colourP.hollow = true;
                //updates the fill when the button is clicked
                colourP.updateFill();
            }
            
            //sets the fill of the shape to just a boarder
            else if(self.hollow == true)
            {
                button.html('Solid Fill');
                self.hollow = false;
                
                //allows the fill colour to change when the button is clicked or a new colour is clicked
                colourP.hollow = false;
                //updates the fill when the button is clicked
                colourP.updateFill();
            }
        });
    };
}
