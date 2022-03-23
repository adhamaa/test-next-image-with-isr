import { useRouter } from 'next/router'
import { Key } from 'react'
import useSWR from 'swr'
import { Spinner } from '../../components/Spinner'

const queryAll = `query {
  users {
    data {
      id
      name
      username
      email
    }
  }
}
  `

//* id is the variable name in the query get from useRouter
const queryOne = `
query($id: ID!) { 
  user(id: $id) {
    id
    name
    username
    email
  }
}
  `

export default function Users() {
  const {
    push,
    query: { id },
  } = useRouter()
  const stringifyBody = id
    ? JSON.stringify({ query: queryOne, variables: { id } })
    : JSON.stringify({ query: queryAll })

  const fetcher = async () => {
    const req = await fetch('https://graphqlzero.almansi.me/api', {
      body: stringifyBody,
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
    })
    const res = await req.json()
    return ({
      data: {
        users: { data },
      },
    } = res)
  }

  const { data, error } = useSWR(() => (id ? [queryOne] : [queryAll]), fetcher)

  const view = {
    renderAll: (() => {
      if (error) return <div>failed to load</div>
      if (!data) return <Spinner />
      return data.map(
        (user: { id: Key; name: string; username: string; email: string }) => (
          <div
            key={user.id}
            className="cursor-pointer rounded-lg border border-gray-300 bg-gray-200 p-6 text-zinc-700 shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
            onClick={() => push(`/users?id=${user.id}`)}
          >
            <h1 className="text-2xl font-light">{user?.name}</h1>
            <p className="text-4xl font-semibold ">{user?.username}</p>
            <p className="text-4xl font-normal ">{user?.email}</p>
          </div>
        )
      )
    })(),
    renderOne: (() => {
      if (error) return <div>failed to load</div>
      if (!data) return <Spinner />
      return (
        <div className="rounded-lg border border-gray-300 bg-gray-200 p-6 text-zinc-700 shadow-lg">
          <h1 className="text-2xl font-light">{data?.user?.name}</h1>
          <p className="text-4xl font-semibold ">{data?.user?.username}</p>
          <p className="text-4xl font-normal ">{data?.user?.email}</p>
        </div>
      )
    })(),
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-5 bg-gray-500 p-10 sm:h-screen ${
        !id &&
        'grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  2xl:grid-rows-5'
      }`}
    >
      {!id ? view.renderAll : view.renderOne}
    </div>
  )
}
