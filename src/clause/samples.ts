export const samples = {
    simple: `The weather at [city: city{name = "Bengaluru", country.name = "India"}] is 
    [temp: city{temperature > 0}]°[unit: temperatureUnit{unit != ""}]`,
    copyright: `
Copyright [year: term{date > 0}] [copyright_holder: name{value != ""}]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,
    greeting: `

Hi!, my name is [person: user{name != ""}] from [city: user{place.city != ""}] of [country: user{place.country != ""}]. 
Let me be your guide as you explore popular destinations like:

1. [destination1: dest{user.dest1 != ""}]
2. [destination2: dest{user.dest2 != ""}]
3. [destination3: dest{user.dest3 != ""}]

Have fun exploring!

Yours Truly,
[person: contact{user.name != ""}]
    `,
};
