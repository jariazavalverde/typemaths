const tm_regex:RegExp = /\/\*\*((?:[^*]|\*[^*]|\*\*[^/])*)\*\*\/((?:[^/]|\/[^*]|\/\*[^*])*)/gm;
const header_regex:RegExp = /@([a-z]+)([^@]*)/gm;
const tex_regex:RegExp = /\$((?:[^$\\]|\\\$|\\)*)\$/gm;

// Parses a TypeMaths file and generates the Markdown files.
function render_file(path:string, output:string): void {
	const fs = require("fs");
	fs.readFile(path, "utf8", function(err, data) {
		if(err)
			return console.log(err);
		const content = render_text(data);
		fs.writeFile(output, content, function (err) {
			if(err)
				return console.log(err);
		  });
	});
}

// Generates the Markdown text from a TypeMaths text.
function render_text(text:string): string {
	let md = "";
	const blocks = parse_text(text);
	for(let i = 0; i < blocks.length; i++) {
		if(blocks[i].header.hasOwnProperty("nodoc"))
			continue;
		if(blocks[i].header.name)
			md += "\n### " + blocks[i].header.name + "\n";
		if(blocks[i].header.description)
			md += blocks[i].header.description + "\n";
		md += "```typescript\n";
		md += blocks[i].body;
		md += "\n```\n";
	}
	return md;
}

function parse_text(text:string): Array<any> {
	var match:RegExpExecArray;
	var result:Array<any> = [];
	while((match = tm_regex.exec(text)) !== null) {
		let header:any = parse_header(match[1]);
		result.push({
			header: header,
			body: match[2].trim()
		});
	}
	return result;
}

function parse_header(text:string): any {
	let match:RegExpExecArray;
	let result:any = {};
	let lines = text.split("\n").map(x => x.replace("*", "").trim());
	let clean_text = lines.join("\n");
	while((match = header_regex.exec(clean_text)) !== null) {
		result[match[1]] = match[2].trim();
		if(match[1] === "description")
		result[match[1]] = result[match[1]].replace(tex_regex, function(_match, content) {
			let formula = encodeURIComponent(content);
			let title = content.replace(/\n/g, "");
			return "![$" + title + "$](http://latex.codecogs.com/png.latex?" + formula + ") ";
		});
	}
	return result;
}

// Do it!
render_file("modules/numerical_analysis.ts", "../doc/numerical_analysis.md");