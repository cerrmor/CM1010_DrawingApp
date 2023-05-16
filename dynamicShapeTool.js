function DynamicShapeTool()
{
    //set an icon and a name for the object
	this.icon = "assets/toolIcons/dynamicShape.jpg";
	this.name = "dynamicShape";
    this.editMode = false;
    this.currentShape = [];

    var selected = 1;
    var self = this;
    
    var show = true;
    var c = select("#content");

    this.draw = function()
    {
        //helperfunction that hides or shows the eraser tool 
        hide(show);
        
        updatePixels();
        //set the fill of the shape to no fill
        colourP.hollow = true;
        colourP.updateFill();
        if(mousePressOnCanvas(c) && mouseIsPressed && !useEraser)
        {
            if(!this.editMode)
            {
                //hides the eraser tool while drawing a dynamic shape
                show = false;
                //fills the array for drawing the line to the screen
                this.currentShape.push({
                    x: mouseX,
                    y: mouseY
                });
            }
            
            else
            {
                //allows the moving of the handles on the canvas
                for(var i = 0; i < this.currentShape.length; i++)
                {
                    if(dist(this.currentShape[i].x, this.currentShape[i].y, mouseX, mouseY) < 20)
                    {
                        this.currentShape[i].x = mouseX;
                        this.currentShape[i].y = mouseY;
                    }
                }
            }
        }
        //allows the eraser to act independantly from the dynamic shape tool.
        else if(useEraser)
        {
            erase(c);
        }
        push();
        ellipseMode(CENTER);
        beginShape();
        
        for(var i = 0; i < this.currentShape.length; i++)
        {
            //draws the line to the screen
            vertex(this.currentShape[i].x, this.currentShape[i].y);
            
            //draws the handles for editing the shape
            if(this.editMode)
            {
                //changes the size of the handle as the line thickness goes up
                strokeWeight(selected);
                fill('red');
                stroke(0);
                if(handleSize <= 15 && handleSize > 10)
                {
                    ellipse(this.currentShape[i].x, this.currentShape[i].y, 25);
                }
                else if(handleSize <= 10 && handleSize > 5)
                {
                    ellipse(this.currentShape[i].x, this.currentShape[i].y, 18);
                }
                else if(handleSize <= 5)
                {
                    ellipse(this.currentShape[i].x, this.currentShape[i].y, 12);
                }
                noFill();
                
                
            }
        }
        pop();
        endShape();
        
        //returns the fill of the canvas to normal
        colourP.hollow = false;
        colourP.updateFill();
    };
    
    //a function governing what happens when the shape is finished
    this.endShape = function()
    {
        //unhides the eraser tool when the dynamic shape has been finished
        show = true;
        this.editMode = false;
        this.populateOptions();
        this.draw();
        loadPixels();
        this.currentShape = [];
    }
    //clears the section button when the tool is unselected
    this.unselectTool = function() {
        //ends the shape when selecting a new tool
        self.endShape();
        
		//clear options
		select(".options").html("");
	};
    
    //populates the selections tool defining the shape that is drawn
    this.populateOptions = function()
    {   
        //creates a button for editing the shape and finishing the shape
        select(".options").html("<p>Tool Options</p><button id='editButton'>Edit Shape</button><button id = 'finishButton'>Finish Shape</button>");
        
        //controls the click of the edit button
        select("#editButton").mouseClicked(function(){
            //allows the button name to change upon click
            var button = select("#" + this.elt.id);
            
            //sets the mode to add more verticies
            if(self.editMode)
            {
                button.html('Edit Shape');
                self.editMode = false;
         
            }
            
            //sets the mode to edit shape 
            else
            {
                button.html('Continue Drawing');
                self.editMode = true;

        }});
            
        //controlls the end of one image and the begining of the next.
        select('#finishButton').mouseClicked(function(){
            self.endShape();
        });
        
        
    };

}