import useSWR from 'swr'
import Form from '../components/Form'
import { Spinner } from '../components/Spinner'

const mutation = `mutation($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    username
    email
  }
}`

export default function Mutate() {
  const strigifyBody = JSON.stringify({
    query: mutation,
    variables: {
      input: {
        name: 'adham akmal azmi',
        username: 'adhamaa',
        email: 'adham_92@live.com',
      },
    },
  })
  const fetcher = async () => {
    const req = await fetch('https://graphqlzero.almansi.me/api', {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: strigifyBody,
    })

    const {
      data: {
        createUser: { id, name, username, email },
      },
    } = await req.json()

    return {
      id,
      name,
      username,
      email,
    }
  }

  const { data, error, mutate } = useSWR([mutation], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <Spinner />

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-5 bg-gray-500 p-10 sm:h-screen `}
    >
      <div
        key={data?.id}
        className="rounded-lg border border-gray-300 bg-gray-200 p-6 text-zinc-700 shadow-lg transition-transform duration-200 ease-in-out "
      >
        <h1 className="text-2xl font-light">{data?.name}</h1>
        <p className="text-4xl font-semibold ">{data?.username}</p>
        <p className="text-4xl font-normal ">{data?.email}</p>
      </div>

      <Form />
    </div>
  )
}
