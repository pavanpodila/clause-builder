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
	= text:[ \t\r\na-z0-9?()\-"',:;~`!@#$%^&*_=+{}|<>.?/\\]i+ { return text.join(''); }

_ "whitespace"
	= [ \t]*
    
