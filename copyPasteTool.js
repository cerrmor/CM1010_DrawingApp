function CopyPasteTool()
{
    this.icon = "assets/toolIcons/scissors.jpg";
    this.name = "copyPasteTool";
        
    var selectMode = 1;
    var selectedArea = {x: 0, y: 0, w: 100, h: 100};
    var selectButton;
    var selectedPixels;
    
    var self = this;
    var selecting = false;
    //boolean value for hiding the eraser tool
    var show = false;
    var c = select("#content");
    
    this.draw = function()
    {
        //helper function that hides the eraser tool buttons
        hide(show);
        
        if(mouseIsPressed && mousePressOnCanvas(c))
        {
            //starts the selecting process for cut and copy
            if(selectMode == 1)
            {
                //sets the mouseX and mouseY starting point for the selected area
                if(!selecting)
                {
                    loadPixels();
                    this.mousePressed();
                    selecting = true;
                }
                //sets the rectangle for the selected area
                else if(selecting )
                {
                    this.mouseDragged();
                    updatePixels();// updates the drawing with what was stored in the buffer
                    
                    //draws the selecting rectangle to the canvas

                    noStroke();
                    fill(255,0,0,100);
                    rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);

                }
            }
            //starts the pasting process
            else if(selectMode == 2)
            {
                this.mousePressed();
            }
            
        }
        else if(!mouseIsPressed && selectMode == 2 && mousePressOnCanvas)
        {
            //allows the user to see where they are placing the copied image for better posistioning 
            updatePixels();//updates the drawing so the image following the mouse doesnt stay
            image(selectedPixels, mouseX, mouseY);
        }
        else
        {
            //restores the selected colour 
            stroke(colourP.selectedColour);
            colourP.updateFill();
        }
    };
    
    this.mousePressed = function()
    {
        //start point of rectangle
        if(selectMode == 1)
        {
            selectedArea.x = mouseX;
            selectedArea.y = mouseY;
        }
        //paste's the image to the canvas
        else if(selectMode == 2)
        {
            image(selectedPixels, mouseX, mouseY);
            loadPixels();
        }
    };

    this.mouseDragged = function()
    {
        //sets the rectangle in the cut copy state
        if(selectMode == 1)
        {
            var w = mouseX - selectedArea.x;
            var h = mouseY - selectedArea.y;

            selectedArea.w = w;
            selectedArea.h = h;
            updatePixels();// updates the drawing with what was stored in the buffer
            
            //draws the red selecting rectangle to the screen
            noStroke();
            fill(255,0,0,100);
            rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);

        }
    };
    
    //clears the section button when the tool is unselected
    this.unselectTool = function() {
        
        //restores the tool to the first state upon unselecting the tool
        updatePixels();
        selectedArea = {x: 0, y: 0, w: 100, h: 100};
        selectMode = 1;
        selecting = false;
        
		//clear options
		select(".options").html("");
	};
    
    //populates the button for selecting cut/copy or paste
    this.populateOptions = function()
    {
        select(".options").html("<p>Tool Options</p><button id = 'scissor'>Cut</button>")
        selectButton = select('#scissor');
        select('#scissor').mouseClicked(function(){

            if(selectMode == 1)
            {
                //advances the selector posistion
                selectMode += 1;
                selectButton.html("end paste");

                //refresh the screen
                updatePixels();

                //get the selected area
                if(selectedArea.w > 1)
                {
                    //if the selected area is to the right and up
                    if(selectedArea.h < 1)
                    {
                        var y = selectedArea.y + selectedArea.h;
                        var h = selectedArea.h * (-1);
                        selectedPixels = get(selectedArea.x, y, selectedArea.w, h);
                    }
                    //if the selected area is to the right and down
                    else
                    {
                        selectedPixels = get(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                    }
                }
                else if(selectedArea.w < 1)
                {
                    //if the selected area is to the left and up
                    if(selectedArea.h < 1)
                    {
                        var x = selectedArea.x + selectedArea.w;
                        var y = selectedArea.y + selectedArea.h;
                        var w = selectedArea.w * (-1);
                        var h = selectedArea.h * (-1);
                        selectedPixels = get(x, y, w, h);
                    }
                    //if the selected area is to the left and down
                    else
                    {
                        var x = selectedArea.x + selectedArea.w;                        
                        var w = selectedArea.w * (-1);
                        selectedPixels = get(x, selectedArea.y, w, selectedArea.h);
                    }
                }

                //draw a rectangle over the area that has been selected cutting the previous image
                fill(255);
                noStroke();
                rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                loadPixels();
            }
            else if(selectMode == 2)
            {
                //restores the selecting mode to the first posistion to begin selecting again.
                selectMode = 1;
                loadPixels();
                selectedArea = {x: 0, y: 0, w: 100, h: 100};
                selectButton.html("Cut");
                selecting = false;
            }
        });
    };
}