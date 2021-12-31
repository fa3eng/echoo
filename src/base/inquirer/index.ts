import inquirer from 'inquirer'

type TCreateListPrompt = (
  type: string,
  name: string,
  message: string,
  choices: string[]
) => Promise<Record<string, string>>

const createListPrompt: TCreateListPrompt = async function (type, name, message, choices) {
  return (await new Promise(
    (
      resolve: (value: Record<string, string>) => void,
      reject: (error: string) => void
    ) => {
      inquirer
        .prompt([
          {
            type,
            name,
            message,
            choices
          }
        ])
        .then(value => {
          resolve(value)
        })
        .catch(err => {
          reject(err)
        })
    }
  ))
}

export { createListPrompt }
