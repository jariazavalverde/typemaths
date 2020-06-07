// Usage: deno run --allow-read --allow-write doc.ts

const tm_regex:RegExp = /\/\*\*((?:[^*]|\*[^*]|\*\*[^/])*)\*\*\/((?:[^/]|\/[^*]|\/\*[^*])*)/gm;
const header_regex:RegExp = /@([a-z]+)([^@]*)/gm;
const tex_regex:RegExp = /\$((?:[^$\\]|\\\$|\\)*)\$/gm;

// Parses a TypeMaths file and generates the Markdown files.
function render_file(path:string, output:string): void {
	const encoder = new TextEncoder();
	const decoder = new TextDecoder("utf-8");
	Deno.readFile(path).then((data:Uint8Array) => {
		const text = decoder.decode(data);
		const content = render_text(text);
		Deno.writeFile(output, encoder.encode(content));
		console.log(path, "ok!");
	});
}

// Generates the Markdown text from a TypeMaths text.
function render_text(text:string): string {
	let md = "";
	const blocks = parse_text(text);
	for(let i = 0; i < blocks.length; i++) {
		if(blocks[i].header.hasOwnProperty("nodoc"))
			continue;
		if(blocks[i].header.name) {
			if(i === 0 && blocks[i].header.type === "module")
				md += "\n# " + blocks[i].header.name + "\n";
			else
				md += "\n### " + blocks[i].header.name + "\n";
		}
		if(blocks[i].header.introduction)
			md += blocks[i].header.introduction + "\n\n";
		if(blocks[i].header.description)
			md += blocks[i].header.description + "\n";
		md += "```typescript\n";
		md += blocks[i].body;
		md += "\n```\n";
		if(i === 0 && blocks[i].header.type === "module") {
			if(blocks[i].header.example) {
				md += "```typescript\n";
				md += blocks[i].header.example;
				md += "\n```\n";
			}
		}
	}
	return md;
}

function parse_text(text:string): Array<any> {
	var match:RegExpExecArray|null;
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
	let match:RegExpExecArray|null;
	let result:any = {};
	let lines = text.split("\n").map(x => x.replace("*", "").trim());
	let clean_text = lines.join("\n");
	const decoder = new TextDecoder("utf-8");
	while((match = header_regex.exec(clean_text)) !== null) {
		result[match[1]] = match[2].trim();
		if(match[1] === "introduction" || match[1] === "description")
			result[match[1]] = result[match[1]].replace(tex_regex, function(_match:any, content:string) {
				let formula = encodeURIComponent(content);
				let title = content.replace(/\n/g, "");
				return "![$" + title + "$](http://latex.codecogs.com/png.latex?" + formula + ") ";
			});
		if(match[1] === "introduction")
			result[match[1]] = "> " + result[match[1]].replace(/\n/g, "\n> ");
		if(match[1] === "example")
			result[match[1]] = decoder.decode(Deno.readFileSync("../examples/" + result[match[1]]));
	}
	return result;
}

// Do it!
render_file("../src/types.ts", "../doc/types.md");
render_file("../src/generators.ts", "../doc/generators.md");
render_file("../src/combinators.ts", "../doc/combinators.md");
// Numerical analysis
render_file("../src/numerical_analysis.ts", "../doc/numerical_analysis.md");
render_file("../src/numerical_analysis/root_finding.ts", "../doc/numerical_analysis/root_finding.md");
// Calculus
render_file("../src/calculus.ts", "../doc/calculus.md");
render_file("../src/calculus/differential.ts", "../doc/calculus/differential.md");