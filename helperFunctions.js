
function HelperFunctions() {

    //local veriable for controling the eraser step.
    var step = 0;
	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object
    
	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
        background(255, 255, 255);
        
        //needed for the colouring book to reset the bool value
        
        
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});
    
    //event handler for creating an eraser function
    //controls the state of the canvas erasing/not erasing
    select("#eraser").mouseClicked(function() {
        var button = select("#" + this.elt.id);
        
        
        if(step == 0)
        {
            step += 1;
            useEraser = true;
            button.html('Erasing');
            //updates the delected colour to white
            colourP.updateFill();
            //changes the colour of the selector button to red to indicate danger
            document.getElementById("eraser").style.backgroundColor = 'red';
            
        }
        else if(step == 1)
        {
            step -= 1;
            button.html('Drawing');
            useEraser = false;
            //updates the colour to the selected colour 
            colourP.updateFill();
            //changes the colour of the selector button to green to indicate safety
            document.getElementById("eraser").style.backgroundColor = '#4CAF50';
        }
    });

    
}

function hide(show)
{
    //unhides the eraser tool
    if(show)
    {
        document.getElementById('eraser').style.visibility='visible';
        document.getElementById('eraserSize').style.visibility='visible';
    }
    //hides the eraser tool
    else
    {
        document.getElementById('eraser').style.visibility='hidden';
        document.getElementById('eraserSize').style.visibility='hidden';
    }
}

//a function for handling how the eraser tool preforms
function erase (c)
{
    var size = select("#eraserSize").value();
    
    if(useEraser && !mouseIsPressed)
    {
        //controls the size of the circle displayed showing the size of the eraser
        push();
        noFill();
        strokeWeight(2);
        stroke(83,158,189);
        if(size == 15)
        {
            ellipse(mouseX, mouseY, 15);
        }
        else if(size == 25)
        {
            ellipse(mouseX, mouseY, 25);
        }
        else if(size == 35)
        {
            ellipse(mouseX, mouseY, 35);
        }
        else if(size == 65)
        {
            ellipse(mouseX, mouseY, 65);
        }
        pop();
    }
    
    //draws the eraser on the screen erasing the image.
    if(mouseIsPressed && mousePressOnCanvas(c))
    {
        strokeWeight(size);
        line(mouseX,mouseY, pmouseX,pmouseY);
        loadPixels();        
    }
}

//event handler to determin if the mouse click was on the canvas or not
function mousePressOnCanvas(canvas)
{
    if(mouseX > 0 && 
       mouseX < (canvas.width) && 
       mouseY > 0 &&
       mouseY < (canvas.height))
    {
        return true;
    }
    return false;
};

