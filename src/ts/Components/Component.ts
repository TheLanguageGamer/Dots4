enum InputResponse {
	Ignored = 0,
	Sunk,
	Focused,
}

interface Component {
	render : (
		ctx : CanvasRenderingContext2D,
		cp : ContentProvider,
		timeMS : DOMHighResTimeStamp) => void;
	onClick? : (e : MouseEvent) => InputResponse;
	onMouseDown? : (e : MouseEvent) => boolean;
	onMouseUp? : (e : MouseEvent) => boolean;
	onMouseMove? : (e : MouseEvent) => boolean;
	onMouseOut? : (e : MouseEvent) => void;
	onKeyDown? : (e : KeyboardEvent) => boolean;
	didLayout? : () => void;
	clamp? : () => void;
	blur? : () => void;

	layout : Layout
	children? : Component[]
}