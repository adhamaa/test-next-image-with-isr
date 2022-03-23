import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Spinner } from './Spinner'
import useSWR from 'swr'

interface IFormInputs {
  name: string
  username: string
  email: string
}

// const schema = yup
//   .object({
//     name: yup.string().required(),
//     username: yup.string().required(),
//     email: yup.string().email('must contain valid email').required(),
//   })
//   .required()

const mutation = `mutation($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    username
    email
  }
}`

export default function Form() {
  const [state, setState] = React.useState(null)
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    // resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    mutate(fetcher(), false) // mutate is a function from useSWR
    reset()
  }

  const strigifyBody = JSON.stringify({
    query: mutation,
    variables: {
      input: {
        name: state?.name,
        username: state?.username,
        email: state?.email,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="name"
        {...register('name', { required: 'name required', maxLength: 50 })}
      />
      <p>{errors.name?.message}</p>
      <input
        type="text"
        placeholder="username"
        {...register('username', {
          required: 'username required',
          maxLength: 15,
        })}
      />
      <p>{errors.username?.message}</p>
      <input
        type="email"
        placeholder="Email"
        {...register('email', {
          required: 'email required',
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'need to be valid email address',
          },
        })}
      />
      <p>{errors.email?.message}</p>
      <button
        className="rounded-md bg-green-300 py-1 px-2"
        onClick={() => setState(getValues())}
      >
        Submit
      </button>
    </form>
    // <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
    //   <div className="space-x-4 self-end">
    //     <label htmlFor="Name">Name</label>
    //     <input
    //       className="placeholder:pl-2"
    //       {...register('name')}
    //       placeholder="Name"
    //     />
    //     <p>{errors.name?.message}</p>
    //   </div>
    //   <div className="space-x-4 self-end">
    //     <label htmlFor="Username">Username</label>
    //     <input
    //       className="placeholder:pl-2"
    //       {...register('username')}
    //       placeholder="Username"
    //     />
    //     <p>{errors.username?.message}</p>
    //   </div>
    //   <div className="space-x-4 self-end">
    //     <label htmlFor="Email">Email</label>
    //     <input
    //       className="placeholder:pl-2"
    //       {...register('email')}
    //       placeholder="Email"
    //     />
    //     <p>{errors.email?.message}</p>
    //   </div>

    //   <input type="submit" />
    // </form>
  )
}
