
/**
 * Joins all string arguments in a camal case fashion
 * 
 * camal('hello', 'world')   -> 'helloWorld'
 * camal('va', 'va', 'voom') -> 'vaVaVoom'
 */
export const camal = (...parts: string[]) => {
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[1]
  return parts.slice(1).reduce((acc, part) => {
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`
  })
}

/**
 * Joins all string arguments in a snake case fashion
 * 
 * camal('hello', 'world')   -> 'hello_world'
 * camal('va', 'va', 'voom') -> 'va_va_voom'
 */
export const snake = (...parts: string[]) => {
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[1]
  return parts.slice(1).reduce((acc, part) => {
    return `${acc}_${part.toLowerCase()}`
  })
}

/**
 * template is used to replace data by name in template strings.
 * The default expression looks for {{name}} to identify names.
 * 
 * Ex. tempalte('Hello, {{name}}', { name: 'ray' })
 * Ex. template('Hello, <name>', { name: 'ray' }, /<(.+?)>/g)
 */
export const template = (str: string, data: object, regex = /\{\{(.+?)\}\}/g) => {
  const d = data as any
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    return acc.replace(match[0], d[match[1]])
  }, str)
}