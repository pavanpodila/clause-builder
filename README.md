## Clause Parser

A clause is some text interspersed with `tags`. __Tags__ are placeholders, which will get their 
values when the clause is created. Tags are specified as __`[name: value]`__

Here's some sample clause with tags:

```text
The weather at [city: City] is [temp: Temperature][unit: TemperatureUnit]
```

## How's it built?

- [x] [PegJS](https://pegjs.org) for parsing
- [x] MobX, React and Styled-Components for the demo

## Demo 

View the [demo](https://clauser.netlify.com/)
