const logOutput = require('../logOutput');

test('Can correctly parse JSON settings', () => {

  const tests = [
    {
      input: {"OutputFeature":"J"},
      expected: 'JSON output on',
    },
    {
      input: {"OutputFeature":"j"},
      expected: 'JSON output off',
    },
  ]

  tests.map((t) => {
    const msg = logOutput(t.input);
    expect(msg).toContain(t.expected);
  })

});

