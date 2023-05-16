function ToolTips()
{
    this.icon = "assets/toolIcons/Info.png";
    this.name = "instructions";
    
    var show = true;
    var display = true;
    var clear = 0;
    var slide = 0;
    var c = select("#content");
    
    this.draw = function()
    {
        hide(show);
        //displays the instructions by defalt at startup.
        if(display)
        {
            updatePixels();//updates the canvas
            push();
            noStroke();
            background(255);
            textSize(18);
            fill(0);
            
            //populates the screen with information about the program
            
            if(slide == 0)
            {
                var clearSave = '⬆ The clear button will give you a blank canvas to draw on, the save image button will save the current drawing to a jpg file'

                var strokeW = '⬆ This will allow you to adjust the size of the painting tool'

                var drawingState = '⬆ Clicking this button will activate or deactivate an eraser tool allowing you edit your drawing. You can adjust the size of the eraser with the dropdown menu to the right. Initial colour will always be white but can be changed';

                var toolC = '⬅ These are your drawing tools. Free Draw, Line, Spray Paint, Mirror Draw, Image Stamp, Shapes, Editable Shape, open image/colouring book, and cut/copy/paste';

                var colourPal = 'Click on a colour square to select a colour ⬇'

                var toolO = 'If the tool has modification choices they will appear here ⬇'

                text(clearSave, 130,10,200,200);       
                text(strokeW, 370,10,200,200);
                text(drawingState, 600,10,200,250);
                text(toolC, 10,200,150,250);
                text(colourPal, 10,c.height - 50,200,250);
                text(toolO, 250,c.height - 50,300,250);
            }
            else if(slide == 1)
            {
                var tTip1 = '- Image rotation buttons in colouring book tool only work for user added images';
                
                var tTip2 = '- You can click and drag to select the area to copy in the copy past tool right away. However, once you click, the starting corner of the selected area is set and you can only adjust the size of the area until the process is completed';
                
                var tTip3 = '- While pasting with the copy paste tool or stamping with the stamp tool if you drag the mouse you can get an interesting effect and build on the fly drawing tools';
                
                var tTip4 = '- When dragging an image onto the canvas in the colouring book tool, if the image does not appear you may need to drag the image a second time';
                
                var tTip5 = '- To use the auto fill paint bucket you must click and hold the right mouse button untill the section is filled. CAUTION This Tool Is Unstable & May Hange The Program';
                
                text(tTip1,10,10,c.width - 30,30);
                text(tTip2,10,45,c.width - 30,100);
                text(tTip3,10,125,c.width - 30,100);
                text(tTip4,10,183,c.width - 30,100);
                text(tTip5,10,238,c.width - 30,100);
            }
            pop();
        }
        else
        {
            slide = 0;
            updatePixels()
        }
        
        //clears the initial drawing of the canvas only. so that the text is not drawn to the screen. 
        if(clear == 0)
        {
            background(255);
            loadPixels();
            clear += 1;
        }
    };
    
    //clears the tool options upon unselection of the tool
    this.unselectTool = function() {
		//updates the canvas to hide the instructions when a different tool is selected
        updatePixels();
        
        display = false;
        //clear options
		select(".options").html("");
    }
    
    //populates the tool options of the tool
    this.populateOptions = function()
    {
        //creates the html buttons 
        select(".options").html("<p>Tool Options</p><button id='info'>Hide Info</button><button id = 'previous'>⬅ Previous</button><button id = 'next'>Next ➡</button>");
        
        //click handler for what pressing the info button does
        select("#info").mouseClicked(function(){
            //allows the button name to change upon click
            var button = select("#" + this.elt.id);
            
            //set the fill of the shape to solid
            if(!display)
            {
                button.html('Hide info');
                display = true;
            }
            else if(display)
            {
                button.html('Display Info');
                display = false;
            }
        });
        
        //click handler for what the next and previous buttons do.
        select('#previous').mouseClicked(function(){
            if(slide == 0 && display)
            {
                slide = 1;
            }
            else if(slide == 1 && display)
            {
                slide = 0;
            }
        });
        
        select('#next').mouseClicked(function(){
            if(slide == 0 && display)
            {
                slide = 1;
            }
            else if(slide == 1 && display)
            {
                slide = 0;
            }
        });
    }
}