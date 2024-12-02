export async function getClients(url) {
  const response = await fetch(url)
  const data = await response.json()

  return data
}

export async function getMessagesByClientId(id) {
  const response = await fetch(
    `https://sellia-files.s3.us-east-2.amazonaws.com/challenge/${id}.json`,
  )
  const data = await response.json()

  return data
}
