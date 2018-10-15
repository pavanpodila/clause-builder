{
	let counter = 0;
	function id() {
    	return `id-${counter++}`;
    }
}

Clause =
	ClauseItem*

ClauseItem
    = Tag
	/ Text

Tag "tag"
	= "[" name:Identifier ":" type:Identifier "]" { return { name, type, id: id() } }
    / "[" name:Identifier "]" { return { name, id: id() } }

Identifier "identifier"
	= _ text:([_a-z]i[a-z0-9_]i*) _ {
    	const [prefix, rest] = text;
        return prefix + rest.join('');
    }

Text "text"
	= text:$[^\[\]\\]i+ { return text; }
    / "\\" text:[\[\]\\] { return text }

_ "whitespace"
	= [ \t]*
