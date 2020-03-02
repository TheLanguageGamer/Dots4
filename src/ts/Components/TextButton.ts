class TextButton {
	
	layout : Layout;
	children? : Component[];
	text : string = "";
	private font : string = "12px monospace";
	private fontSize : number = 12;
	fillStyle : string = Constants.Colors.Blue.NCS;
	disabledFillStyle : string = Constants.Colors.Grey;
	disabled : boolean = false;
	controller : ButtonController;

	constructor(
		layout : Layout,
		controller : ButtonController,
		text? : string) {

		if (text) {
			this.text = text;
		}
		this.setFontSize(this.fontSize);
		this.layout = layout;
		this.controller = controller;
	}

	disable() {
		this.disabled = true;
	}

	enable() {
		this.disabled = false;
	}

	onClick(e : MouseEvent) {
		if (!this.disabled) {
			this.controller.onClick(e);
			return InputResponse.Sunk;
		}
		return InputResponse.Ignored;
	}

	setFontSize(fontSize : number) {
		this.fontSize = fontSize;
		this.font = fontSize.toString() + "px monospace";
	}

	render(ctx : CanvasRenderingContext2D, cp : ContentProvider) {
		if (!this.layout.visible) {
			return;
		}
		ctx.beginPath();
		ctx.lineWidth = 2.0;
		ctx.font = this.font;
		ctx.fillStyle = this.disabled ? this.disabledFillStyle : this.fillStyle;
		ctx.fillText(
			this.text,
			this.layout.computed.position.x,
			this.layout.computed.position.y + this.fontSize*0.75
		);
	}
}