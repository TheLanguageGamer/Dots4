
class Main {
	game : Game;

	constructor(container : HTMLElement) {
		this.game = new Game(container, {});

		let rectLayout3 = new Layout(
			0, 0, 620, 20,
			0, 0, 300, 25
		);
		let rect3 = new Rectangle(rectLayout3);

		let textLayout3 = new Layout(
			0, 0, 5, 5,
			1, 1, -10, -10
		);
		let textInput3 = new TextInput(textLayout3, {}, "Hey how's it going");
		textInput3.fillStyle = Constants.Colors.Black;
		textInput3.setFontSize(14);
		rect3.children = [];
		rect3.children.push(textInput3);
		this.game.components.push(rect3);

		this.game.doLayout();
	}
}

let $container = document.getElementById('container')!;
let main = new Main(
	$container,
);
main.game.start();