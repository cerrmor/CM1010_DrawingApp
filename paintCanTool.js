function PaintCanTool()
{
    this.icon = "assets/toolIcons/paintCan.jpg";
    this.name = "paintCan";
    var c = select("#content");
    var startX = -1;
    var startY = -1;
    var newColour;
    //corrects the pixel density of the screen for high density pixels screens some slight resolution loss.
    var d = pixelDensity(1);
    this.draw = function()
    {
        loadPixels();
        startX = ceil(mouseX);
        startY = ceil(mouseY);
        if(mousePressOnCanvas(c) && mouseIsPressed)  
        {
            newColour = colourP.selectedColour;
            
            this.fillShape(startX, startY, newColour);
        }
    };
    
    //a function for finding the location of the pixel on the screen
    this.pixelPosistion = function(x,y)
    {
        var location = (x + y * c.width) * 4;
        return location;
    }
    
    //a function to check if the current location matches the start color
    this.colorMatch = function(pos, startColor)
    {
        return(
            pixels[pos] === startColor.r &&
            pixels[pos + 1] === startColor.g &&
            pixels[pos + 2] === startColor.b &&
            pixels[pos + 3] === startColor.a
        );
    }
    
    //a function to change the colors of the pixel to the new color
    this.colorChange = function(pos, newColor)
    {
        pixels[pos] = red(newColor);
        pixels[pos + 1] = green(newColor);
        pixels[pos + 2] = blue(newColor);
        pixels[pos + 3] = 255;
    }
    
    this.fillShape = function(startX, startY, newColor)
    {
        //finds the posistion of the mouse click
        var startLocation = this.pixelPosistion(startX, startY);
        
        //stores the initial pixel color to be used for comparison 
        var startColor = {
            r: pixels[startLocation],
            g: pixels[startLocation + 1],
            b: pixels[startLocation + 2],
            a: pixels[startLocation + 3]
        };
        
        //stores a stack of pixels that need to be changed.
        var pixelsToChange = [[startX, startY]];
        
        //runs untill out of work or all the pixels that needed to be changed are.
        for(var i = 0; i < pixelsToChange.length; i++)
        {
            //pulls the last array item in the stack to begin working
            var currentLoc = pixelsToChange.pop();
            
            // will only ever be dealing with an array of length 2 so can set static variables. 
            var x = currentLoc[0];
            var y = currentLoc[1];
            
            //crrent pixel being worked 
            var currentPixel = this.pixelPosistion(x,y);
            //checks to see if the top of the canvas or element has been reached
            while ((y-- >= 0) && this.colorMatch(currentPixel, startColor))
            {
               currentPixel -= c.width * 4;
            }
            
            currentPixel += c.width * 4;
            
            y++;
            
            var leftSide = false;
            var rightSide = false;
            //changes the colour of the pixels from top to bottom
            while((y++ < c.height - 1) && this.colorMatch(currentPixel, startColor))
            {
                this.colorChange(currentPixel, newColor);
                //checks to see if the left side of the canvas or element has been reached
                if(x > 0)
                {
                    if(this.colorMatch(currentPixel - 4, startColor))
                    {
                        if(!leftSide)
                        {
                            pixelsToChange.push([x - 1, y]);
                            leftSide = true;
                        }
                    }
                    else if(leftSide)
                    {
                        leftSide = false;
                    }
                }
                //checks to see if the right side of the canvas or element has been reached
                if(x < c.width - 1)
                {
                    if(this.colorMatch(currentPixel + 4, startColor))
                    {
                        if(!rightSide)
                        {
                            pixelsToChange.push([x + 1, y]);
                            rightSide = true;
                        }
                    }
                    else if(rightSide)
                    {
                        rightSide = false;
                    }
                }
                currentPixel += 4;
            }
        }
        
        updatePixels();
    };
}