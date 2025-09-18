import { Extension } from '@tiptap/core'
import { Node } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Editor {
    replaceJoke: () => boolean
    insertJoke: () => void
  }
}

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

const fetchJoke = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random')
    const data = await response.json()
    return data.value
  } catch (error) {
    console.error('Failed to fetch Chuck Norris joke:', error)
    return 'joke'
  }
}

export const JokesExtension = Extension.create({
  name: 'jokes',

  addExtensions() {
    return [JokeNode]
  },

  onUpdate() {
    this.editor.replaceJoke = () => {
      const { state, dispatch } = this.editor.view
      const { selection } = state
      const $pos = selection.$from
      
      const isJokeNode = $pos.parent.type.name === 'joke' ? $pos.parent : 
                      $pos.nodeAfter?.type.name === 'joke' ? $pos.nodeAfter :
                      $pos.nodeBefore?.type.name === 'joke' ? $pos.nodeBefore : null
      
      if (!isJokeNode) {
        return false
      }

      fetchJoke().then(jokeText => {
        const jokeStart = $pos.start($pos.depth)
        const jokeEnd = $pos.end($pos.depth)
        const tr = state.tr.replaceWith(jokeStart, jokeEnd, state.schema.text(jokeText))
        dispatch(tr)
      })
      
      return true
    }

    this.editor.insertJoke = () => {
      fetchJoke().then(jokeText => {
        this.editor.commands.insertContent(`<joke>${jokeText}</joke>`)
      })
    }
  },



  addKeyboardShortcuts() {
    return {
      'Mod-j': () => {
        const { state } = this.editor.view
        const { selection } = state
        
        const $pos = selection.$from
        const jokeNode = $pos.parent.type.name === 'joke' ? $pos.parent : 
                        $pos.nodeAfter?.type.name === 'joke' ? $pos.nodeAfter :
                        $pos.nodeBefore?.type.name === 'joke' ? $pos.nodeBefore : null
        const isJokeSelected = jokeNode !== null
        console.log('isJokeSelected', isJokeSelected);
        
        if (isJokeSelected) {
          return this.editor.replaceJoke()
        } else {
          fetchJoke().then(jokeText => {
            this.editor.commands.insertContent(`<joke>${jokeText}</joke>`)
          })
          return true
        }
      },
    }
  },
})