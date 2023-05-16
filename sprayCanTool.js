function SprayCanTool(){
	
	this.name = "sprayCanTool";
	this.icon = "assets/toolIcons/sprayCan.jpg";

    var show = true;
    var c = select("#content");
    
	var points = 13;
	var spread = 10;

	this.draw = function(){
        //helper function to show the eraser tools if they have been hidden by another tool.
        hide(show);
        
        //draws the spray texture of the spray can to the screen
		if(mouseIsPressed && !useEraser && mousePressOnCanvas(c)){
			for(var i = 0; i < points; i++){
				point(random(mouseX-spread, mouseX + spread), random(mouseY-spread, mouseY+spread));
			}
            loadPixels();
		}
        
        //allows the eraser tool to function independantly from the spray can
        else if(useEraser)
        {
            updatePixels();
            erase(c);
        }
	};
}