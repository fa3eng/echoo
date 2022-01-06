import inquirer from 'inquirer'

async function createListPrompt (
  questionCollection: inquirer.QuestionCollection<inquirer.Answers>
): Promise<inquirer.Answers> {
  return await new Promise((resolve, reject) => {
    inquirer
      .prompt(questionCollection)
      .then(value => {
        resolve(value)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export { createListPrompt }
