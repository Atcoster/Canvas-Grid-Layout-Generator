(function(){
	 var canvas;
	 var context;	
	 var blocks = []; // array of blocks
	 var rows =  3; //total grid rows
	 var cols = 3; // total grid columns
	 var fontSize;
	 var layout = "V-BL2R";

	 /** The side to start and end the grid by row(horizontal) or column(vertical)
      ** (options: V-TL2B, H-TL2R, V-BL2T, H-BL2R)
	  ** V = Vertical, H = Horizontal , L = Left, R = Right, T = Top and B = Bottom, 2 = to
	  **/
	 /**************************************************************************
	   		  V-TL2B          H-TL2R		  V-BL2T		  H-BL2R

			 [1][4][7] 	|  	 [1][2][3] 	|  	 [3][6][9] 	|  	 [7][8][9]
			 [2][5][8]	|	 [4][5][6]	| 	 [2][5][8]	| 	 [4][5][6]
			 [3][6][9]	| 	 [7][8][9]	| 	 [1][4][7]	| 	 [1][2][3]


			  V-BR2T          H-BR2L		  H-TR2L		  V-BL2R

			 [9][6][3] 	|  	 [9][8][7] 	|  	 [3][2][1] 	|  	 [7][4][1] 
			 [8][5][2]	|	 [6][5][4]	| 	 [6][5][4]	| 	 [8][5][2]
			 [7][4][1]	| 	 [3][2][1]	| 	 [9][8][7]	| 	 [9][6][3]

	 ***************************************************************************/


	 /**Create canvas
	 **(params) width, height
	 **/
	 var CreateCanvas = function(id, w, h){
	 	canvas = document.getElementById(id); // get the canvas element by id

	 	canvas.width = w;  //set width
	 	canvas.height = h; //set height

        //check if an get canvas context
		if(canvas.getContext) {
			context = canvas.getContext("2d");	// get the canvas context 2d
			CreateBlocks();
		}
	 }

	CreateCanvas('canvas', 800, 600);

	//create blocks
	function CreateBlocks(){
		var bw	= canvas.width / rows; // block with (width of canvas divided by rows total)
		var bh	= canvas.height / cols; // block height (height of canvas divided by collums total)

		fontSize = bh / 3;

		var id = 1;
		var block;

		switch(layout){
			case "V-TL2B":
				for (var r = 0; r < rows; r++) {
					for (var c = 0; c < cols; c++) {
						block = new Block(id, r * bw, c * bh,  bw, bh);
						blocks.push(block);
						id++;
					};
				}
			break;
			case "H-TL2R":
				for (var c = 0; c < cols; c++) {
					for (var r = 0; r < rows; r++) {				
						block = new Block(id, r * bw , c * bh,  bw, bh);
						blocks.push(block);
						id++;
					};
				}
			break;
			case "V-BL2T":
				for (var r = 0; r < rows; r++) {
					for (var c = cols; c > 0; c--) {				
						block = new Block(id, r * bw  , (c * bh) - bh,  bw, bh);
						blocks.push(block);
						id++;
					};
				}
			break;
			case "H-BL2R":
				for (var c = cols; c > 0; c--) {
					for (var r = 0; r < rows; r++) {
						block = new Block(id, r * bw  , (c * bh) - bh,  bw, bh);
						blocks.push(block);
						id++;
					};
				}
			break;						
			case "V-BR2T":
				for (var r = rows; r > 0; r--) {				
					for (var c = cols; c > 0; c--) {
						block = new Block(id, (r * bw) - bw , (c * bh) - bh,  bw, bh);
						blocks.push(block);
						id++;
					};
				}	
			break;
			case "H-BR2L":
				for (var c = cols; c > 0; c--) {
					for (var r = rows; r > 0; r--) {				
						block = new Block(id, (r * bw) - bw , (c * bh) - bh,  bw, bh);
						blocks.push(block);
						id++;
					};
				}
			break;
			case "H-TR2L":
				for (var c = 0; c < cols; c++) {
					for (var r = rows; r > 0; r--) {				
						block = new Block(id, (r * bw) - bw, c * bh,  bw, bh);
						blocks.push(block);
						id++;
					};
				}
			break;
			case "V-BL2R":
				for (var r = rows; r > 0; r--) {
					for (var c = 0; c < cols; c++) {								
						block = new Block(id, (r * bw) - bw , c * bh,  bw, bh);
						blocks.push(block);
						id++;
					};
				}
			break;
			default:
				case "V-TL2B":
			break;
		}
		

		CreateGrid();
	}

	//create the grid
	function CreateGrid(){
		context.font =  fontSize + "px Verdana";
		context.strokeStyle = "#ffffff";
		for (var i = 0; i < blocks.length; i++) {
			var b = blocks[i];			
			
			context.fillStyle = b.Color;//set block color			
			context.fillRect(b.PosX, b.PosY, b.Width, b.Height); //fill rectangle

			var txtPosX = b.PosX + (b.Width / 2 - (context.measureText(b.ID).width / 2)); //text position by width
			var txtPosY = b.PosY + (b.Height / 2 + (fontSize / 2)); // text position by font height
			context.strokeText(b.ID, txtPosX, txtPosY); //stroke the text 
		}

	}

	/**
	 *  Block
	** (param) int id of the block
	** (param) int posX of the block
	** (param) int posY of the block
	** (param) int width of the block
	** (param) int height of the block
	*/
	function Block(id, x, y, w, h){
		this.ID = id; // id of the block
		this.PosX = x; // position x of block
		this.PosY = y; // position y of block
		this.Width = w; // block width
		this.Height = h; // block height
		this.Color = getRandomColor(); // set block random color 
	}


	//get a generated random color
	function getRandomColor() {
	    var hexLetters = '0123456789ABCDEF';
	    var hlLength = hexLetters.length;
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += hexLetters[Math.floor(Math.random() * hlLength)];
	    }
	    return color;
	}

})(jQuery);
