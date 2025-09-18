import { Extension } from '@tiptap/core'

export const JokesExtension = Extension.create({
  name: 'jokes',

  addKeyboardShortcuts() {
    return {
      'Mod-j': () => {
        fetch('https://api.chucknorris.io/jokes/random')
          .then(response => response.json())
          .then(data => {
            this.editor.commands.insertContent(`<p>${data.value}</p>`)
          })
          .catch(error => {
            console.error('Failed to fetch Chuck Norris joke:', error)
            this.editor.commands.insertContent('<p>joke</p>')
          })
        
        return true
      },
    }
  },
})