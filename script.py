import sys
import os
import shutil
import inspect

def fillTemplate(name, enginePath):

	header = """<!doctype html>
<html>
	<head>
	<style>
		html, body {
		    height: 100%;
		}
		a {
			color: #195190;
			text-decoration: none;
		}

		a:hover {
			text-decoration: underline;
		}

		a:active {
			color: black;
		}

		a:visited {
			color: #00AAA0;
		}
		#parentContainer {
			height: 100%;
		}
		#info {
			width: 160px;
			font-family: monospace;
			padding: 5px;
			/*background-color: #e1fcf4;*/
			height: 100%;
		}
		#container {
			position: absolute;
			top: 0px;
			right: 0px;
			background-color: white;
		}
		#title {
			font-size: 24px;
			font-weight: 800;
			margin-top: 0px;
		}
	</style>
	</head>
	<body style="margin:0px">
		<div id="container"></div>
		<div id="debug"></div>
"""
	footer = """	</body>
</html>"""

	body = ""

	engineSrc = enginePath + "/src/ts"
	for subdir, dirs, files in os.walk(engineSrc):
		for file in files:
			#print(subdir, file, os.path.join(subdir, file))
			if not file.endswith(".ts"):
				continue
			if file.endswith("main.ts"):
				continue
			fullpath = os.path.join(subdir, file)
			path = os.path.join("build/Dots4/src/ts/", os.path.relpath(fullpath, engineSrc))
			path = path[:-3] + ".js"
			body += "		<script src=\"" + path + "\"></script>\n"

	body += "		<script src=\"build/src/ts/main.js\"></script>\n"

	return header + body + footer

def create(name):
	pathname = os.path.dirname(sys.argv[0])
	enginePath = os.path.abspath(pathname)
	index = fillTemplate(name, enginePath)
	os.mkdir(name)
	os.chdir(name)
	os.mkdir("src")
	os.mkdir("src/ts")
	os.system('echo "# ' + name +'" >> README.md')

	with open("index.html", "w") as f:
		f.write(index)

	with open("src/ts/main.ts", "w") as f:
		with open(os.path.join(enginePath, "template/main.ts"), "r") as g:
			f.write(g.read())

	with open("tsconfig.json", "w") as f:
		with open(os.path.join(enginePath, "template/tsconfig.json"), "r") as g:
			f.write(g.read())

	os.system("git init")
	os.system("git submodule add https://github.com/TheLanguageGamer/Dots4.git")

def main():
	print(str(sys.argv))
	if len(sys.argv) > 2 and sys.argv[1] == "create":
		create(sys.argv[2])
	else:
		print(
"""Usage:
	create [name]""")

if __name__ == '__main__':
	main()