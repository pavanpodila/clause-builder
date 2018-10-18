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

Text "text"
	= text:$[^\[\]\\]i+ { return text; }
    / "\\" text:[\[\]\\] { return text }

Tag "tag"
	= "[" _ name:Identifier _ ":" _ query:Query _ "]" { return { name, query, id: id() } }

Query "query"
	= source:Identifier _ "{" _ expr:Expression _"}" { return { source, expressions: expr } }

Expression "expression"
	= pred:Predicate _ next:("," _ innerPred:Predicate)* {
	    const rest = next.length > 0 ? next.map(x=>x[2]) : undefined;
    	return rest ? [pred].concat(rest) : [pred]
     }

Predicate "predicate"
	= prop:$PropertyPath _ op:Operator _ value:Value {
    	return { field: prop.trim(), operator: op, value   }
     }

PropertyPath "property-path"
	= Identifier ("." Identifier)*

Operator "operator"
	= "in" / "notIn" / "eq" / "neq" / "lt" / "gt" / "lte" / "gte"

Value "value"
	= Literal

Literal "literal"
	= BooleanLiteral
    / StringLiteral
    / NumberLiteral

BooleanLiteral "boolean value"
	= value:"true" { return Boolean(value) }
    / value:"false" { return Boolean(value) }

StringLiteral "string value"
	= '"' value:$[^"]* '"' { return value }

NumberLiteral "number value"
	= int:$[0-9]+ decimal:$("." [0-9]+)? { return parseFloat(int + decimal, 10) }

Identifier "identifier"
	= _ text:([_a-z]i[a-z0-9_]i*) _ {
    	const [prefix, rest] = text;
        return prefix + rest.join('');
    }

_ "whitespace"
	= [ \t\r\n]*
