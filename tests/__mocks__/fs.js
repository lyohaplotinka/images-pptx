/* eslint-disable */

const fs = jest.genMockFromModule('fs')

fs.promises = {
  __test: null,
  lstat: test => 'test',
  mkdtemp: path => Promise.resolve(`${path}test`),
  readdir: path => {
    return Promise.resolve(['test.html', 'test.jpg', 'test.png', 'test.pdf', 'testnoext'])
  },
  writeFile: function(path, data, options) {
    fs.promises.__test = {
      path,
      data,
    }
  },
  mkdir: path => Promise.resolve()
}

module.exports = fs
