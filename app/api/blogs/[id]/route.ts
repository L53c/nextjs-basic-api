import { deletePost, getById, updatePost } from '@/app/lib/data'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  try {
    const id = req.url.split('blogs/')[1]
    const post = getById(id)
    if (!post) {
      return NextResponse.json(
        { message: `Error, there is no post with id: ${id}`, post },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: `Get request success with id: ${id}`, post },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'GET REQUEST ERROR', err },
      { status: 500 }
    )
  }
}

export const PUT = async (req: Request) => {
  try {
    const { title, desc } = await req.json()
    const id = req.url.split('blogs/')[1]
    updatePost(id, title, desc)
    return NextResponse.json(
      { message: `Record with id: ${id} updated` },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: `Record could not be updated: ${err}` },
      { status: 500 }
    )
  }
}

export const DELETE = async (req: Request) => {
  try {
    const id = req.url.split('blogs/')[1]
    deletePost(id)
    return NextResponse.json(
      { message: `Record with id: ${id} deleted` },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: `Record could not be deleted: ${err}` },
      { status: 500 }
    )
  }
}
