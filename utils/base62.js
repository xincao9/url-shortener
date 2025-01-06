// Base62字符集
const Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

// 将整数转换为Base62字符串
const encode = (num) => {
  if (num === 0) return Chars[0]
  let encoded = ''
  while (num > 0) {
    encoded = Chars[num % 62] + encoded
    num = Math.floor(num / 62)
  }
  return encoded
}

// 将Base62字符串解码为整数
const decode = (str) => {
  let decoded = 0
  for (let i = 0; i < str.length; i++) {
    decoded = decoded * 62 + Chars.indexOf(str[i])
  }
  return decoded
}

module.exports = { encode, decode }
