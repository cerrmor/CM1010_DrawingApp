function ColouringBookTool()
{
    this.icon = "assets/toolIcons/colouringBook.jpg";
    this.name = "colouringBook";
    var drawing = false;
    var loaded = false;
    var boy;
    var vamp;
    var picture = null;
    var rotation = false;
    var show = false;
    var c = select("#content");
    this.deg = 0;
    this.rightTurn = false;
    this.leftTurn = false;
    var self = this;
    this.draw = function()
    {
        //helperfunction to hide the eraser tool
        hide(show);
        //runs once to load the colouring book images
        if(!loaded)
        {
            boy = loadImage('./assets/colouringBook/boyWithTurtle.jpg');
            vamp = loadImage('./assets/colouringBook/TrickOrTreat.jpg');
            loaded = true;
        }
        
        updatePixels();
        
        //draws the instructions to the screen if no image has been dropped 
        if(!drawing)
        {
            //for clarity of use hides the rotate buttons untill an image file has been added
            document.getElementById('rotateLeft').style.visibility='hidden';
            document.getElementById('rotateRight').style.visibility='hidden';
            push();
            stroke(255);
            fill(0);
            textSize(24);
            textAlign(CENTER);
            text('Drag an image file onto the canvas.', width / 2, height / 2);
            text('Or click on an available options', width / 2, (height / 2) + 30);
            pop();
        }
        else
        {
            //hide instructions
        }
    };
    
    this.gotFile = function(file)
    {
        //checkes if file type == image
        if (file.type === 'image')
        {
            updatePixels();
            rotation= true;
            drawing = true;
            
            //for clarity of use shows the rotate buttons after a image has been added to the canvas
            document.getElementById('rotateLeft').style.visibility='visible';
            document.getElementById('rotateRight').style.visibility='visible';
            var ctx = c.drawingContext;
            // Create an image DOM element but don't show it
            var img = createImg(file.data).hide();
            picture = img;
            //draws the image to the canvas scaled to avoid image distortion
            self.drawImageScaled(img,c.height,c.width);            
            loadPixels();
        }
            
        else 
        {
            // if not an image file prompts user to put an image file
            drawing = true;
            push();
            stroke(255);
            fill(0);
            textSize(24);
            textAlign(CENTER);
            text('Sorry that is not an image file', width / 2, height / 2);
            text('Please drag an image file onto the canvas', width / 2, (height / 2) + 30);
            pop();
        }
    };
    
    this.drawImageScaled = function(img,height,width)
    {
        //adjust the the image size to avoid image distortion when drawing to the canvas or rotating
        var aspectRatio = height*(img.width/img.height);
        var ratio = img.width/img.height;
        var centerShiftX = ((width - img.width)*ratio)/2;
        var centerShiftY = ((height - img.height)*ratio)/2;
        image(img, 0, 0, aspectRatio, height);
    };
    
    //allows a user added image to be rotated if it was not facing the right direction when added.
    this.rotateImage = function()
    {
        updatePixels();
        push();
        if(this.rightTurn)
        {
            this.deg = this.deg + 90;
        }
        else if(this.leftTurn)
        {
            this.deg = this.deg - 90;
        }
        background(255, 255, 255);
        translate(c.width/2 -(c.width/2 - c.height/2), c.height/2);
        rotate(radians(this.deg));
        imageMode(CENTER);
        this.drawImageScaled(picture,c.height,c.width);
        pop();
        loadPixels();
        this.rightTurn = false;
        this.leftTurn = false;
    };
    
    this.unselectTool = function() {
		//updates the canvas to hide the instructions when a different tool is selected
        updatePixels();
        //clear options
		select(".options").html("");
        
	};
    
    this.populateOptions = function()
    {   
        
        //calls the function got file to check if the file dragged on the canvas was an image. if image == true draws the file to the canvas
        select("#content").drop(this.gotFile);
        //places a reset button in the options section to reset the process, a rotate button for fixing the orintation, and populates the built in image choices
        select(".options").html("<p>Tool Options</p><button id = 'reset'>Reset</button><button id='rotateLeft'>90 ↪</button><button id='rotateRight'>↩ 90</button><div class='dropdown'><img id='boy' src='assets/colouringBook/boyWithTurtle.jpg' width='50' height='50'><div class='dropdown-content'><img src='assets/colouringBook/boyWithTurtle.jpg' width='300' height='200'></div></div><div class='dropdown'> <img id='trick' src='assets/colouringBook/TrickOrTreat.jpg' width='50' height='50'><div class='dropdown-content'><img src='assets/colouringBook/TrickOrTreat.jpg' width='300' height='200'></div></div>");
        
        //resets the instructions for adding an image to the canvas
        select("#reset").mouseClicked(function()
        {
            updatePixels();
            background(255, 255, 255);
            loadPixels();
            self.deg = 0;
            drawing= false;
        });
        
        document.getElementById('boy').onclick = function()
        {
            updatePixels();
            //mouse click function for drawing the colouring book image to the canvas
            background(255, 255, 255);
            self.drawImageScaled(boy,c.height,c.width);
            drawing = true;
            loadPixels();
        };
        document.getElementById('trick').onclick = function()
        {
            updatePixels();
            //mouse click function for drawing the colouring book image to the canvas
            background(255, 255, 255);
            self.drawImageScaled(vamp,c.height,c.width);
            drawing = true;
            loadPixels();
        };
        
        //mouseclick function for rotating the user added image to the right   
        select("#rotateRight").mouseClicked(function()
        {
            if(rotation)
            {
                self.rightTurn = true;
                self.rotateImage();
                drawing = true;
            }
        });
        
        //mouseClick function for rotating the user added image to the left
        select("#rotateLeft").mouseClicked(function()
        {
            if(rotation)
            {
                self.leftTurn = true;
                self.rotateImage();
                drawing = true;
            }
        });
           
    };
}