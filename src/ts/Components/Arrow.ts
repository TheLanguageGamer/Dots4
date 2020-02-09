class Arrow {
	layout : Layout;
	children? : Component[];

	from : Pos = {x : 0, y : 0};
	to : Pos = {x : 0, y : 0};
	lineWidth : number = 3;
	headMargin : number = 6;
	color : string = Constants.Colors.Black;
	arced : boolean = false;

	constructor() {
		this.layout = new Layout(0, 0, 0, 0, 0, 0, 0, 0);
	}

	private renderArced(ctx : CanvasRenderingContext2D, cp : ContentProvider) {

		var headlen = Math.floor(this.lineWidth/2);

		let computedFromX = this.layout.computed.position.x + this.from.x;
		let computedFromY = this.layout.computed.position.y + this.from.y;
		let computedToX = this.layout.computed.position.x + this.to.x;
		let computedToY = this.layout.computed.position.y + this.to.y;

		var angle = Math.atan2(
			computedToY-computedFromY,
			computedToX-computedFromX
		) + Math.PI/2;

		var to = {
			x : computedToX,// - this.headMargin*Math.cos(angle),
			y : computedToY,// - this.headMargin*Math.sin(angle),
		};

		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.lineWidth;
		ctx.fillStyle = this.color;
		ctx.setLineDash([]);

		ctx.beginPath();
		ctx.arc(computedFromX, computedFromY, this.lineWidth*0.5, 0, 2 * Math.PI);
		ctx.moveTo(computedFromX, computedFromY);
		//ctx.lineTo(to.x, to.y);
		ctx.arc(
			computedFromX + (computedToX - computedFromX) / 2,
			computedFromY + (computedToY - computedFromY) / 2,
			calculateDistance(this.from, this.to) / 2,
			1 * Math.PI,
			1.95 * Math.PI
		);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(to.x, to.y);
		ctx.lineTo(
			to.x-headlen*Math.cos(angle-Math.PI/7),
			to.y-headlen*Math.sin(angle-Math.PI/7)
		);

		ctx.lineTo(
			to.x-headlen*Math.cos(angle+Math.PI/7),
			to.y-headlen*Math.sin(angle+Math.PI/7)
		);

		ctx.lineTo(to.x, to.y);
		ctx.lineTo(
			to.x-headlen*Math.cos(angle-Math.PI/7),
			to.y-headlen*Math.sin(angle-Math.PI/7)
		);

		ctx.stroke();
		ctx.fill();
	}

	private renderStraight(ctx : CanvasRenderingContext2D, cp : ContentProvider) {

		var headlen = Math.floor(this.lineWidth/2);

		let computedFromX = this.layout.computed.position.x + this.from.x;
		let computedFromY = this.layout.computed.position.y + this.from.y;
		let computedToX = this.layout.computed.position.x + this.to.x;
		let computedToY = this.layout.computed.position.y + this.to.y;

		var angle = Math.atan2(
			computedToY-computedFromY,
			computedToX-computedFromX
		);

		var to = {
			x : computedToX - this.headMargin*Math.cos(angle),
			y : computedToY - this.headMargin*Math.sin(angle),
		};

		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.lineWidth;
		ctx.fillStyle = this.color;
		ctx.setLineDash([]);

		ctx.beginPath();
		ctx.arc(computedFromX, computedFromY, this.lineWidth*0.5, 0, 2 * Math.PI);
		ctx.moveTo(computedFromX, computedFromY);
		ctx.lineTo(to.x, to.y);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(to.x, to.y);
		ctx.lineTo(
			to.x-headlen*Math.cos(angle-Math.PI/7),
			to.y-headlen*Math.sin(angle-Math.PI/7)
		);

		ctx.lineTo(
			to.x-headlen*Math.cos(angle+Math.PI/7),
			to.y-headlen*Math.sin(angle+Math.PI/7)
		);

		ctx.lineTo(to.x, to.y);
		ctx.lineTo(
			to.x-headlen*Math.cos(angle-Math.PI/7),
			to.y-headlen*Math.sin(angle-Math.PI/7)
		);

		ctx.stroke();
		ctx.fill();
	}

	render(ctx : CanvasRenderingContext2D, cp : ContentProvider) {

		if (this.arced) {
			this.renderArced(ctx, cp);
		} else {
			this.renderStraight(ctx, cp);
		}
	}
 }


