{
	let counter = 0;
	function id() {
    	return `id-${counter++}`;
    }

    function stripDelimiters(first, list) {
	    const rest = list.length > 0 ? list.map(x => x[2]) : undefined;
    	return rest ? [first].concat(rest) : [first];
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
    	return stripDelimiters(pred, next);
      }

Predicate "predicate"
	= prop:$PropertyPath _ op:Operator _ value:Value {
    	return { field: prop.trim(), operator: op, value   }
      }

PropertyPath "property-path"
	= Identifier ("." Identifier)*

Operator "operator"
	= "in" / "!in" / "=" / "!=" / "<" / ">" / "<=" / ">="

Value "value"
	= SingleLiteral
    / ArrayLiteral

ArrayLiteral
	= "[" _ values:CommaSeparatedValues _ "]" { return values }

CommaSeparatedValues
	= first:SingleLiteral _ rest:("," _ SingleLiteral)* {
        return stripDelimiters(first, rest);
      }

SingleLiteral = BooleanLiteral / StringLiteral / NumberLiteral

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
