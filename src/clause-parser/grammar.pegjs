Clause = 
	ClauseItem*
    
ClauseItem
    = Tag
	/ Text 

Tag "tag"
	= "[" name:Identifier ":" type:Identifier "]" { return {name, type} }
    / "[" name:Identifier "]" { return {name} }

Identifier "identifier"
	= _ text:([_a-z]i[a-z0-9_]i*) _ {
    	const [prefix, rest] = text;
        return prefix + rest.join('');
    }

Text "text"
	= text:[ \t\r\na-z0-9?()\-"',:;~`!@#$%^&*_=+{}|<>.?/\\]i+ { return text.join(''); }

_ "whitespace"
	= [ \t]*
    