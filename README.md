## Clause Parser

A clause is some text interspersed with `placeholders`. __placeholders_, which will get 
their values when the clause is created. 

Tags are specified with the following syntax:

```text
[<name>: <source> { <field-path> <operator> <value> }]
```

The complete grammar can be found in [grammar.pegjs](src/clause/parser/grammar.pegjs)
Here's some sample clauses with placeholders:

```text
The weather at 
    [city: city{name = "Bengaluru", country.name = "India"}] is 
    [temp: city{temperature > 0}]°[unit: temperatureUnit{unit != ""}]```

## How's it built?

- [x] [PegJS](https://pegjs.org) for parsing
- [x] MobX, React and Styled-Components for the demo

## Demo 

View the [demo](https://clauser.netlify.com/)
