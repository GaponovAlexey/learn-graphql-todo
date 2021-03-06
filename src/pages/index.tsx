import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
export const url = 'https://graphqlzero.almansi.me/api'

const Home: NextPage = () => {
  const [data, setData] = useState()
  console.log(data)

  const getQuery = async (query: any) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
    const data = await res.json()
    setData(data.data.todos.data)
  }

  useEffect(() => {
    getQuery(`query FilterTodos($options: PageQueryOptions) {
      todos(options: $options) {
        data {
          id
          title
          completed
          user {
            id
            name
            address {
              city
            }
          }
        }
      }
    }`)
  }, [])

  return (
    <div>
      <h1 className='text-[42px] text-center pt-10 mb-10'>GraphQl Todos</h1>
      <div className='flex justify-center '>
        <div>
          <h1>add Todo</h1>
          <div>
            <input
              type='text'
              placeholder=' ...crate'
              className='border-2 rounded-md'
            />
            <button className='px-[6px] bg-sky-200 rounded-lg mr-2 hover:bg-blue-400'>
              create
            </button>
          </div>
        </div>
        <div>
          <h1>find Todo</h1>
          <div>
            <input
              type='text'
              placeholder='find'
              className='border-2 rounded-md'
            />
            <button className='px-[6px] bg-sky-200 rounded-lg hover:bg-blue-400'>
              find
            </button>
          </div>
        </div>
      </div>
      <div className='bg-gray-200 text-center mt-5'>
        <h2 className='text-blue-800'>list</h2>
        {data?.map((el: any) => (
          <div className='flex justify-center' key={el.id}>
            <h3>{el.id}</h3>-<h3>{el.title}</h3>-
            <input type='radio' checked={el.completed} value={el.completed} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
