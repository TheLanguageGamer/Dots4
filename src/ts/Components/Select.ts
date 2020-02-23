interface Option {
	label : string,
	id : number,
}

interface SelectController {
	onSelectionChanged : (index : number, option : Option) => void;
}

class Select {
	
	layout : Layout;
	//children? : Component[];

	options : Option[];
	selectedIndex : number = 0;
	highlightColor : string = Constants.Colors.VeryLightGrey;
	backgroundColor : string = Constants.Colors.White;
	borderColor : string = Constants.Colors.Black;
	borderWidth : number = 2;
	private font : string = "14px monospace";
	private fontSize : number = 14;
	padding : number = 8;
	expanded : boolean = false;
	labelHeight : number = 5;
	controller : SelectController;

	constructor(
		layout : Layout,
		options : Option[],
		controller : SelectController) {

		this.layout = layout;
		this.options = options;
		this.controller = controller;
		console.assert(this.options.length > 0);
	}

	didLayout() {
		this.labelHeight = this.layout.computed.size.height;
		if (this.expanded) {
			this.layout.computed.size.height = this.labelHeight * (this.options.length + 1);
		}
	}

	setFontSize(fontSize : number) {
		this.fontSize = fontSize;
		this.font = fontSize.toString() + "px monospace";
	}

	drawTriangle(ctx : CanvasRenderingContext2D, isUp : boolean) {	
		//draw triangle
		let triangleWidth = 16;
		let heightOffset = isUp
			? this.labelHeight / 2 + triangleWidth / 4
			: this.labelHeight / 2 - triangleWidth / 4
		//	move to upper right
		ctx.moveTo(
			this.layout.computed.position.x
				+ this.layout.computed.size.width
				- triangleWidth
				- this.padding,
			this.layout.computed.position.y
				+ heightOffset
		);
		//	horizontal line
		ctx.lineTo(
			this.layout.computed.position.x
				+ this.layout.computed.size.width
				//- triangleWidth
				- this.padding,
			this.layout.computed.position.y
				+ heightOffset
		);
		//	bottom corner
		ctx.lineTo(
			this.layout.computed.position.x
				+ this.layout.computed.size.width
				- triangleWidth/2
				- this.padding,
			this.layout.computed.position.y
				+ heightOffset
				+ (isUp ? -triangleWidth / 2 : triangleWidth / 2)
		);
		//	back to start
		ctx.lineTo(
			this.layout.computed.position.x
				+ this.layout.computed.size.width
				- triangleWidth
				- this.padding - 1,
			this.layout.computed.position.y
				+ heightOffset
		);
	}

	render(ctx : CanvasRenderingContext2D, cp : ContentProvider) {
		if (!this.layout.visible) {
			return;
		}

		let labelCount = this.expanded ? this.options.length + 1 : 1;

		if (this.expanded) {
			
			ctx.beginPath();
			ctx.fillStyle = this.backgroundColor;
			ctx.rect(
				this.layout.computed.position.x,
				this.layout.computed.position.y,
				this.layout.computed.size.width,
				this.labelHeight * labelCount
			);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = this.highlightColor;
			ctx.rect(
				this.layout.computed.position.x,
				this.layout.computed.position.y
					+ this.labelHeight * (this.selectedIndex+1),
				this.layout.computed.size.width,
				this.labelHeight
			);
			ctx.fill();
		}

		ctx.beginPath();
		ctx.font = this.font;
		ctx.setLineDash([]);
		ctx.lineWidth = this.borderWidth;
		ctx.strokeStyle = this.borderColor;
		ctx.fillStyle = Constants.Colors.Black;
		
		ctx.rect(
			this.layout.computed.position.x,
			this.layout.computed.position.y,
			this.layout.computed.size.width,
			this.labelHeight * labelCount
		);

		for (let i = 0; i < labelCount; ++i) {
			if (i > 0) {
				ctx.moveTo(
					this.layout.computed.position.x,
					this.layout.computed.position.y + this.labelHeight * i
				);
				ctx.lineTo(
					this.layout.computed.position.x + this.layout.computed.size.width,
					this.layout.computed.position.y + this.labelHeight * i
				);
			}
			let index = i == 0 ? this.selectedIndex : i - 1;
			ctx.fillText(
				this.options[index].label,
				this.layout.computed.position.x + this.padding,
				this.layout.computed.position.y + this.padding
					+ this.labelHeight * i
					+ this.fontSize*0.75
			);
		}

		this.drawTriangle(ctx, this.expanded);

		ctx.stroke();
	}

	toggleExpansion() {
		this.expanded = !this.expanded;
		if (this.expanded) {
			this.layout.computed.size.height = this.labelHeight * (this.options.length + 1);
		} else {
			this.layout.computed.size.height = this.labelHeight;
		}
	}

	onMouseDown(e : MouseEvent) {
		return true;
	}

	onClick(e : MouseEvent) {
		console.log("click Select", e.offsetY);
		if (e.offsetY <= this.layout.computed.position.y + this.labelHeight) {
			this.toggleExpansion();
		} else {
			let offset = e.offsetY - this.layout.computed.position.y - this.labelHeight;
			this.selectedIndex = Math.floor(offset / this.labelHeight);
			this.controller.onSelectionChanged(
				this.selectedIndex,
				this.options[this.selectedIndex]
			);
			this.toggleExpansion();
		}
		return InputResponse.Focused;
	}

	blur() {
		if (this.expanded) {
			this.toggleExpansion();
		}
	}
}