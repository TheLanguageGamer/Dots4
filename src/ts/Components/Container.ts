class Container {
	
	layout : Layout;
	children : Component[];

	constructor() {
		this.layout = new Layout(0, 0, 0, 0, 1, 1, 0, 0);
	}

	render(ctx : CanvasRenderingContext2D, cp : ContentProvider) {
		
	}
}