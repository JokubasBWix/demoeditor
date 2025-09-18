import { Extension } from '@tiptap/core'
import { Node } from '@tiptap/core'

const JokeNode = Node.create({
  name: 'joke',
  
  group: 'block',
  
  content: 'inline*',
  
  parseHTML() {
    return [
      { tag: 'joke' },
    ]
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['joke', HTMLAttributes, 0]
  },
})

export const JokesExtension = Extension.create({
  name: 'jokes',

  addExtensions() {
    return [JokeNode]
  },

  addKeyboardShortcuts() {
    return {
      'Mod-j': () => {
        fetch('https://api.chucknorris.io/jokes/random')
          .then(response => response.json())
          .then(data => {
            this.editor.commands.insertContent(`<joke>${data.value}</joke>`)
          })
          .catch(error => {
            console.error('Failed to fetch Chuck Norris joke:', error)
            this.editor.commands.insertContent('<joke>joke</joke>')
          })
        
        return true
      },
    }
  },
})