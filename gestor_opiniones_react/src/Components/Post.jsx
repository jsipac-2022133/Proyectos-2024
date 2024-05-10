import { PacmanLoader } from "react-spinners"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useUpdatePost } from "../shared/hooks/useUpdatePost.jsx"
import { useDeletePost } from "../shared/hooks/useDeletePost.jsx"
 
export const Post = ({ posts = [] }) => {
    const {updatedPost, isFetching, updatePost} = useUpdatePost()
    const {deletePost} = useDeletePost()
    const [post, setPost] = useState(
        {
            _id: '',
            title: '',
            category: '',
            content: ''
        }
    )
 
  const noData = (
    <>
      <div className="m-5 d-flex align-items-center justify-content-center">
        No hay Datos :(
      </div>
      <PacmanLoader color="#ffe733" />
    </>
  )
 
  const getPost = (post)=>{
    setPost(post)
  }

  const getPostDeleted = (post)=>{
    deletePost(post._id)
  }

  const handleChange = (e) =>{
    setPost((prevData)=>(
        {
            ...prevData,
            [e.target.name]: e.target.value
        }
    ))
  }

  const update = () =>{
    updatePost(
        post._id,
        post
    )
  }

  return (
    <>
      <div className="row g-0 justify-content-center mt-5">
        <div className="d-flex align-items-center justify-content-center">
          <h2 className="">My posts</h2>
        </div>
        <div className="mb-3 d-flex align-items-center justify-content-center">
          <Link to="/feed/newPost">
            <button className="btn btn-primary">Add Post</button>
          </Link>
        </div>
        {
          posts.length == 0 ? noData : (
            posts.map((post) => (
              <div key={post._id} className="card m-3 row g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
 
                <div className="card-body">
                  <h5 className="card-title">
                    {post.title + ' '}
                    <svg onClick={() => getPost(post)} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                    <svg onClick={()=> getPostDeleted(post)} role="button" aria-controls="offcanvasExample" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </h5>
                  <div className="card-body">
                    {post.content + ' '}
                  </div>
                </div>
              </div>
            ))
          )
        }
      </div>
      {/*SIDEBAR PARA ACTUALIZAR */} 
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div className="m3">
            <div className="m3">
                <label htmlFor="" className="form-label">Title</label>
                <input value={post.title} onChange={handleChange} name="title" type="text" className="form-control" />
            </div>
            <div className="m3">
                <label htmlFor="" className="form-label">Category</label>
                <input value={post.category} onChange={handleChange} name="category" className="form-control" type="text" />
            </div>
            <div className="m3">
                <label htmlFor="" className="form-control">Content</label>
                <textarea value={post.content} onChange={handleChange} name="content" className="form-control" type="text" />
            </div>
            <div className="m-3 justify-content-center d-flex">
                <button onClick={update} name="content" className="btn btn-success">Update</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}